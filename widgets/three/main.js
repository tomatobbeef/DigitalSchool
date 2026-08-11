import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// 声明一个对象keyStates用来记录键盘事件状态
const keyStates = {
    // 使用W、A、S、D按键来控制前、后、左、右运动
    // false表示没有按下，true表示按下状态
    W: false,
    A: false,
    S: false,
    D: false,
};

//一些变量
let isRendering = false;
let Moving = false;
let scene, camera, renderer, controls, gs_viewer, player;
const delta = 0.046;
const speed = 1.85; // 移动速度
let mixer, walkingClip,idleClip,walkAction,idleAction;
// 鼠标相关变量
let isDragging = false; // 是否正在拖动鼠标
let lastMouseX = 0; // 上一次鼠标水平位置
let sitData;
const rotationSpeed = 0.002; // 鼠标旋转速度（可以根据需要调整）

// 获取信息显示元素
const infoElement = document.getElementById('info');
const infoTitle = document.getElementById('info-title');
const infoDescription = document.getElementById('info-description');
const infoImage = document.querySelector('#info img');
const playButton = document.getElementById('play-button');
const map = document.getElementById('miniMap');
// 创建 Raycaster 和鼠标位置
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const loader = new FontLoader();
let audio = null;

// 键盘事件监听（更新后）
document.addEventListener('keydown', (event) => {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(event.code)) {
        const key = event.code.replace('Key', '');
        if (!keyStates[key]) {  // 只有状态变化时才更新Moving
            keyStates[key] = true;
            Moving = true;
        }
    }
});

document.addEventListener('keyup', (event) => {
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(event.code)) {
        const key = event.code.replace('Key', '');
        keyStates[key] = false;

        // 检查是否所有移动键都已松开
        Moving = keyStates.W || keyStates.A || keyStates.S || keyStates.D;
    }
});
// 监听鼠标按下事件
window.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // 鼠标左键
        isDragging = true;
        lastMouseX = event.clientX; // 记录鼠标按下时的水平位置
    }
});

// 监听鼠标移动事件
window.addEventListener('mousemove', (event) => {
    if (isDragging&&player) {
        const deltaX = event.clientX - lastMouseX; // 计算鼠标水平偏移量
        const rotationDelta = deltaX * rotationSpeed; // 计算旋转角度

        // 更新角色的旋转
        player.rotation.y -= rotationDelta;


        // 更新 lastMouseX 为当前鼠标水平位置
        lastMouseX = event.clientX;
    }
});

// 监听鼠标释放事件
window.addEventListener('mouseup', (event) => {
    if (event.button === 0) { // 鼠标左键
        isDragging = false;
    }
});


// 初始化 Three.js 环境
function initThreeJS(modelUrl,playerposition,scenePos,sceneRot) {
    console.log('Initializing Three.js...');
    const rootElement = document.getElementById('three');

    // 动态获取容器的宽高
    const { width: renderWidth, height: renderHeight } = rootElement.getBoundingClientRect();

    // 创建渲染器时添加alpha配置
    renderer = new THREE.WebGLRenderer({
        antialias: false,
        // alpha: true // 启用透明通道
    });
    renderer.setSize(renderWidth, renderHeight);
    // 设置混合模式
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false; // 关闭自动清除

    // 将渲染器的 canvas 添加到已有的 div 中
    rootElement.appendChild(renderer.domElement);

    scene = new THREE.Scene(); // 创建一个 Three.js 场景

    camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    // camera.position.set(0, 0, 5); // 调整相机位置
    camera.up.set(0, -1, 0); // 设置相机的“上”方向为 Y 轴
    // camera.lookAt(scene.position); // 相机指向场景中心

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 平行光
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    gs_viewer = new GaussianSplats3D.Viewer({
        selfDrivenMode: false,
        renderer: renderer,
        camera: camera,
        useBuiltInControls: false,
        ignoreDevicePixelRatio: false,
        gpuAcceleratedSort: false, // 关闭 GPU 加速排序
        sharedMemoryForWorkers: false, // 关闭共享内存
        integerBasedSort: true,
        halfPrecisionCovariancesOnGPU: true,
        dynamicScene: false,
        webXRMode: GaussianSplats3D.WebXRMode.None,
        renderMode: GaussianSplats3D.RenderMode.OnChange,
        sceneRevealMode: GaussianSplats3D.SceneRevealMode.Instant,
        antialiased: false,
        focalAdjustment: 1.0,
        logLevel: GaussianSplats3D.LogLevel.None,
        sphericalHarmonicsDegree: 0,
        enableOptionalEffects: false,
        inMemoryCompressionLevel: 2,
        freeIntermediateSplatData: false,
        // ...其他配置不变...
        renderMode: GaussianSplats3D.RenderMode.Always, // 强制持续渲染
        antialiased: true,
        alpha: true // 启用透明
    });

    // 加载高斯模型
    loadGaussianModel(modelUrl, gs_viewer)
        .then(() => {
            // 修改高斯模型的位置
            gs_viewer.splatMesh.position.set(scenePos.x, scenePos.x, scenePos.x); // 将模型移动到 (10, 0, 0)

            // 修改高斯模型的旋转
            // gs_viewer.splatMesh.rotation.set(THREE.MathUtils.degToRad(sceneRot.x), THREE.MathUtils.degToRad(sceneRot.y), THREE.MathUtils.degToRad(sceneRot.z)); // 绕 Y 轴旋转 45 度
            const quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(new THREE.Euler(
                THREE.MathUtils.degToRad(sceneRot.x), 
                THREE.MathUtils.degToRad(sceneRot.y), 
                THREE.MathUtils.degToRad(sceneRot.z)
            ));
            gs_viewer.splatMesh.quaternion.copy(quaternion);
            gs_viewer.splatScene.updateMatrixWorld(); // 更新矩阵，确保位置和旋转生效
                    });

    loadFBXModel('public/model/Idle.fbx',playerposition);
}

// 封装加载高斯模型的函数
function loadGaussianModel(modelUrl, gs_viewer) {
    return gs_viewer.addSplatScene(modelUrl);
}

//加载人物动画和模型
function loadFBXModel(modelUrl,playerposition) {
    const loader = new FBXLoader();
    // 创建 GLTFLoader 实例
    // const loader = new THREE.GLTFLoader();
    loader.load(modelUrl, (object) => {
        player = object;
        scene.add(player);
        player.position.set(playerposition.x, playerposition.y, playerposition.z); // 将人物模型移动到高斯点云模型的旁边
        player.scale.set(0.014, 0.014, 0.014)
        player.rotation.x = Math.PI; // 绕 X 轴翻转（上下颠倒修正）
        // 获取模型的动画
        const animations = object.animations;
        loader.load('public/model/Walking.fbx', (walk) => {
            mixer = new THREE.AnimationMixer(player);
            walkingClip= walk.animations[0]; // 假设动画文件中只有一个动画剪辑
            walkAction = mixer.clipAction(walkingClip);
            idleClip= player.animations[0]; // 假设动画文件中只有一个动画剪辑
            idleAction = mixer.clipAction(idleClip);
            idleAction.play();
            
            animate();
          });
          function animate() {
            renderer.clear();
            gs_viewer.update();
            gs_viewer.render();

            if (player) {
                
                const direction = new THREE.Vector3();
                player.getWorldDirection(direction);

                if (keyStates.W) player.position.add(direction.multiplyScalar(speed * delta));
                if (keyStates.S) player.position.add(direction.multiplyScalar(-speed * delta));
                if (keyStates.A) {
                    direction.crossVectors(player.up, direction).normalize();
                    player.position.add(direction.multiplyScalar(-speed * delta));
                }
                if (keyStates.D) {
                    direction.crossVectors(player.up, direction).normalize();
                    player.position.add(direction.multiplyScalar(speed * delta));
                }
                updateMiniMap(player.position.x, player.position.z);
                updateCamera();
            }

            if (mixer) {  // 关键修改：只在移动时播放动画
                mixer.update(delta);
                if(Moving){
                    walkAction.play();
                    idleAction.stop();
                }
                else{
                    idleAction.play();
                    walkAction.stop();
                }
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        
    });
}

// 第三人称相机参数
const cameraOffset = new THREE.Vector3(-0.5, 2.2, -1.8); // (x: 水平偏移, y: 高度, z: 后方距离)
const cameraLookAtOffset = new THREE.Vector3(-0.5, -2.0, 0); // 看向角色身体中心偏上位置

const cameraSmoothFactor = 0.1; // 平滑因子

function updateCamera() {
    if (player) {
        // 1. 获取角色世界位置
        const playerWorldPos = new THREE.Vector3();
        player.getWorldPosition(playerWorldPos);

        // 2. 计算相机目标位置（角色位置 + 偏移）
        const targetCameraPos = playerWorldPos.clone()
            .add(cameraOffset.clone().applyQuaternion(player.quaternion));

        // 3. 计算相机目标看向点（角色位置 + 轻微高度偏移）
        const targetLookAtPos = playerWorldPos.clone().add(cameraLookAtOffset);

        // 4. 使用线性插值平滑相机位置
        camera.position.lerp(targetCameraPos, cameraSmoothFactor);

        // 5. 使用线性插值平滑相机看向点
        const currentLookAtPos = new THREE.Vector3();
        camera.getWorldPosition(currentLookAtPos);
        // currentLookAtPos.add(cameraLookAtOffset);
        currentLookAtPos.lerp(targetLookAtPos, cameraSmoothFactor);

        // 6. 更新相机看向点
        camera.lookAt(currentLookAtPos);

        // 7. 确保相机的“上”方向正确
        camera.updateMatrixWorld(); // 更新相机的世界矩阵
    }
}

function addTagtoScene(sitData)
{
    let markers = [];

    fetch(sitData) // 假设 JSON 文件名为 markers.json
        .then(response => response.json())
        .then(data => {
            markers = data;
            createMarkers(markers); // 创建标记点
        })
        .catch(error => console.error('Error loading markers:', error));
}

function createMarkers(markersData) {
    markersData.forEach(markerData => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('http://localhost:5173/src/assets/img/label.png'); // 替换为你的图片路径

        // 创建 Sprite 材质
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

        // 创建 Sprite 对象
        const marker = new THREE.Sprite(spriteMaterial);

        // 设置 Sprite 的大小（可以根据需要调整）
        marker.scale.set(0.5, 0.5, 1);

        // 设置位置
        marker.position.set(...markerData.position);
        
        // loader.load('http://localhost:5173/src/assets/fonts/helvetiker_regular.typeface.json', (font) => {
        //     const textGeometry = new TextGeometry(markerData.title, {
        //         font:font,
        //         size: 0.2,
        //         height: 0.1
        //     });
        //     console.log(markerData.title)
        //     const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        //     const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        //     // 将文字放置在 Sprite 的上方
        //     textMesh.position.set(markerData.position[0],markerData.position[1]-0.2,markerData.position[2]); // 根据需要调整位置
        //     scene.add(textMesh);
        // })
        

        // 将标题和信息存储在标记对象的自定义属性中
        marker.userData = {
            title: markerData.title,
            info: markerData.info,
            image:markerData.image,
            audio: markerData.audio
        };

        // 添加到场景
        scene.add(marker);
    });

    // 添加点击事件监听器
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        // 阻止点击信息框时关闭信息框
        infoElement.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
        });

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if(!intersectedObject.userData.title){
                return;
            }
            if (intersectedObject.userData) {
                // 显示信息
                infoElement.style.display = 'block';
                infoTitle.textContent = intersectedObject.userData.title;
                infoDescription.textContent = intersectedObject.userData.info;
                console.log(intersectedObject.userData.image)
                infoImage.src = intersectedObject.userData.image; // 动态加载图片
                // 添加播放按钮点击事件
                playButton.addEventListener('click', () => {
                    const audioPath = intersectedObject.userData.audio;
                    if (!audio) {
                        audio = new Audio(audioPath);
                        audio.loop = false; // 设置音频不循环播放
                    } else {
                        audio.src = audioPath; // 如果音频对象已存在，更新音频路径
                    }
                    audio.play();
                });
            } else {
                // 隐藏信息
                infoElement.style.display = 'none';
                audio.pause()
                audio.currentTime = 0;
            }
        } else {
            // 隐藏信息
            infoElement.style.display = 'none';
            audio.pause()
            audio.currentTime = 0;
        }
    });
}

const worldSize = 100;              // 场景在 X、Z 方向总长
const halfWorld = worldSize / 2;

function updateMiniMap(x, z){
    if(map.style.display == 'none'){
        return;
    }
    // 把世界坐标 (-halfWorld~+halfWorld) 映射到 0~200px
    const px = THREE.MathUtils.mapLinear(x, -halfWorld, halfWorld, 0, 200);
    const pz = THREE.MathUtils.mapLinear(z, -halfWorld, halfWorld, 0, 200);

    const dot = document.getElementById('playerDot');
    dot.style.left = px + 'px';
    dot.style.top  = pz + 'px';
}


function showmap(tag){
    if(tag){
        map.style.display = 'block';
    }
    else{
        map.style.display = 'none';
    }
}

// 调用主函数并传入模型地址
// initThreeJS('src/assets/model/earth_center.splat');
let mapvisibility = false
window.addEventListener('message', function (event) {
    if (event.data.action === 'initThreeJS') {
        console.log('接收到消息')
        const data = event.data.payload.data;
        // 切换场景前清除之前的测量数据
        try { clearMeasure(); } catch (e) { /* ignore */ }
        initThreeJS(data.gsmodel,data.playerposition,data.scenePos,data.sceneRot);
        sitData = data.sitData;
    }
    else if (event.data.action === 'showSit') {
        addTagtoScene(sitData);
    }
    else if (event.data.action === 'showmap') {
        mapvisibility = !mapvisibility
        showmap(mapvisibility)
    }
    // 室内测量工具相关消息
    else if (event.data.action === 'startMeasure') {
        showMeasureToolbar();
    }
    else if (event.data.action === 'closeMeasure') {
        closeMeasure();
    }
    else if (event.data.action === 'clearMeasure') {
        clearMeasure();
    }
    else if (event.data.action === 'setMeasureMode') {
        // 支持外部直接指定模式
        if (measureActive) {
            setMeasureMode(event.data.payload && event.data.payload.mode);
        } else {
            showMeasureToolbar();
            setMeasureMode(event.data.payload && event.data.payload.mode);
        }
    }
})

// ==================== 3DGS 室内测量工具模块 ====================
// 适配 3D Gaussian Splatting 静态点云场景的测量功能（距离/面积/高度）

let measureMode = null;           // null | 'distance' | 'area' | 'height'
let measurePoints = [];          // 当前正在测量的点集
let measureVisuals = [];          // 所有可视对象（点/线/面）
let measureResults = [];          // 测量结果列表
let measureLabels = [];           // 3D 标签数组 {el, worldPos}
let livePolygon = null;           // 面积测量实时预览多边形
let measureActive = false;        // 测量工具栏是否激活
let hintTimer = null;             // 提示自动消失定时器

// 颜色配置
const COLOR_POINT = 0x00FFE4;     // 节点-青舅
const COLOR_LINE = 0x00FFE4;      // 测线-青舅
const COLOR_POLY = 0xFFAA00;      // 多边形-橙色
const COLOR_HEIGHT = 0x00FF88;    // 高度线-绿色

// 复用的临时对象（避免在循环中创建新对象）
const _tmpVec = new THREE.Vector3();
const _tmpVec2 = new THREE.Vector3();

// DOM 引用辅助
const $measureToolbar = () => document.getElementById('measure-toolbar');
const $measureHint = () => document.getElementById('measure-hint');
const $measureResultPanel = () => document.getElementById('measure-result-panel');
const $measureResultList = () => document.getElementById('result-list');
const $measureResultCount = () => document.getElementById('result-count');

// ---------- 顶部提示 ----------
function showHint(text, duration = 3000) {
    const hint = $measureHint();
    if (!hint) return;
    hint.textContent = text;
    hint.classList.add('show');
    if (hintTimer) clearTimeout(hintTimer);
    if (duration > 0) {
        hintTimer = setTimeout(() => hideHint(), duration);
    }
}
function hideHint() {
    const hint = $measureHint();
    if (hint) hint.classList.remove('show');
}

// ---------- 工具栏显示 / 关闭 ----------
function showMeasureToolbar() {
    measureActive = true;
    const toolbar = $measureToolbar();
    if (toolbar) toolbar.classList.add('active');
    const panel = $measureResultPanel();
    if (panel) panel.classList.add('show');
    updateResultPanel();
    showHint('请选择测量类型：距离 / 面积 / 高度', 4000);
}
function closeMeasure() {
    clearMeasure();
    measureActive = false;
    const toolbar = $measureToolbar();
    if (toolbar) toolbar.classList.remove('active');
    const panel = $measureResultPanel();
    if (panel) panel.classList.remove('show');
    hideHint();
    // 通知父页面（室内模块）隐藏工具栏
    try { window.parent.postMessage({ action: 'measureClosed' }, '*'); } catch (e) { /* ignore */ }
}

// ---------- 切换测量模式 ----------
function setMeasureMode(mode) {
    if (!scene) {
        showHint('请先进入室内场景', 3000);
        return;
    }
    measureMode = mode;
    measurePoints = [];
    removeLivePolygon();

    // 按钮高亮
    ['distance', 'area', 'height'].forEach(m => {
        const btn = document.getElementById(`btn-measure-${m}`);
        if (btn) btn.classList.toggle('active', m === mode);
    });

    // 光标样式
    document.body.classList.remove('measure-mode-distance', 'measure-mode-area', 'measure-mode-height');
    if (mode) document.body.classList.add(`measure-mode-${mode}`);

    // 提示
    if (mode === 'distance') showHint('距离测量：依次点击 2 个点', 0);
    else if (mode === 'area') showHint('面积测量：依次点击多个顶点（双击闭合）', 0);
    else if (mode === 'height') showHint('高度测量：依次点击 2 个点（自动计算垂直距离）', 0);
    else showHint('已取消测量模式', 2000);
}

// ---------- 清除所有测量 ----------
function clearMeasure() {
    measureMode = null;
    measurePoints = [];
    measureResults = [];

    // 移除所有可视对象
    measureVisuals.forEach(obj => {
        if (scene) scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
        }
    });
    measureVisuals = [];
    removeLivePolygon();

    // 移除所有标签
    measureLabels.forEach(l => {
        if (l.el && l.el.parentNode) l.el.parentNode.removeChild(l.el);
    });
    measureLabels = [];

    // 按钮状态
    ['distance', 'area', 'height'].forEach(m => {
        const btn = document.getElementById(`btn-measure-${m}`);
        if (btn) btn.classList.remove('active');
    });

    // 光标
    document.body.classList.remove('measure-mode-distance', 'measure-mode-area', 'measure-mode-height');

    hideHint();
    updateResultPanel();
}

function removeLivePolygon() {
    if (livePolygon) {
        if (scene) scene.remove(livePolygon);
        if (livePolygon.geometry) livePolygon.geometry.dispose();
        if (livePolygon.material) livePolygon.material.dispose();
        livePolygon = null;
    }
}

// ---------- 可视化：点 / 线 / 多边形 ----------
function addPointMarker(point) {
    if (!scene) return;
    const sphereGeom = new THREE.SphereGeometry(0.05, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({ color: COLOR_POINT, depthTest: false });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.copy(point);
    sphere.renderOrder = 999;
    // 使标记始终显示在最前
    sphere.onBeforeRender = function(r) { /* keep depth test disable */ };
    scene.add(sphere);
    measureVisuals.push(sphere);
}

function addLine(p1, p2, color = COLOR_LINE, lineWidth = 2) {
    if (!scene) return;
    const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
    const mat = new THREE.LineBasicMaterial({ color, depthTest: false, linewidth: lineWidth });
    const line = new THREE.Line(geom, mat);
    line.renderOrder = 998;
    scene.add(line);
    measureVisuals.push(line);
}

function addPolygon(points, color = COLOR_POLY) {
    if (!scene || points.length < 3) return;
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].z);
    for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i].x, points[i].z);
    }
    shape.closePath();
    const geom = new THREE.ShapeGeometry(shape);
    const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.35,
        side: THREE.DoubleSide, depthTest: false
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.x = -Math.PI / 2; // XZ 平面
    mesh.position.y = 0.01; // 略微抬高避免 Z-fighting
    mesh.renderOrder = 997;
    scene.add(mesh);
    measureVisuals.push(mesh);

    // 同时画轮廓
    const lineGeom = new THREE.BufferGeometry().setFromPoints([...points, points[0]]);
    const lineMat = new THREE.LineBasicMaterial({ color, depthTest: false });
    const line = new THREE.Line(lineGeom, lineMat);
    line.renderOrder = 998;
    scene.add(line);
    measureVisuals.push(line);
}

function updateLivePolygon() {
    if (!scene || measurePoints.length < 2) return;
    removeLivePolygon();
    const points = measurePoints;
    const lineGeom = new THREE.BufferGeometry().setFromPoints([...points, points[0]]);
    const lineMat = new THREE.LineBasicMaterial({ color: COLOR_POLY, depthTest: false });
    livePolygon = new THREE.Line(lineGeom, lineMat);
    livePolygon.renderOrder = 998;
    scene.add(livePolygon);
}

// ---------- 计算工具 ----------
function calcDistance(p1, p2) {
    return p1.distanceTo(p2);
}

function calcPolygonAreaOnXZ(points) {
    // 在 XZ 平面上使用 Shoelace 公式
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % n];
        area += p1.x * p2.z - p2.x * p1.z;
    }
    return Math.abs(area) / 2;
}

function calcVerticalHeight(p1, p2) {
    return Math.abs(p2.y - p1.y);
}

function getCentroidXZ(points) {
    const c = new THREE.Vector3();
    points.forEach(p => { c.x += p.x; c.z += p.z; });
    c.x /= points.length;
    c.z /= points.length;
    // 中心点抬升到参与点的最大 Y + 0.3，便于标签显示
    c.y = Math.max(...points.map(p => p.y)) + 0.3;
    return c;
}

function getMidpoint(p1, p2) {
    return new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
}

// ---------- 3D 标签 ----------
function addLabel(worldPos, text) {
    const el = document.createElement('div');
    el.className = 'measure-3d-label';
    el.textContent = text;
    // 放入 threemap 而不是 body，避免相对位置计算错误
    const host = document.getElementById('threemap') || document.body;
    host.appendChild(el);
    measureLabels.push({ el, worldPos: worldPos.clone() });
}

function updateMeasureLabels() {
    if (!measureLabels.length || !camera || !renderer) return;
    const rect = renderer.domElement.getBoundingClientRect();
    const host = document.getElementById('threemap');
    if (!host) return;
    const hostRect = host.getBoundingClientRect();

    measureLabels.forEach(({ el, worldPos }) => {
        _tmpVec.copy(worldPos).project(camera);
        const visible = (_tmpVec.z >= -1 && _tmpVec.z <= 1);
        if (!visible) {
            el.style.display = 'none';
            return;
        }
        el.style.display = 'block';
        // 计算相对于 threemap 容器的位置
        const x = (_tmpVec.x * 0.5 + 0.5) * rect.width + (rect.left - hostRect.left);
        const y = (-_tmpVec.y * 0.5 + 0.5) * rect.height + (rect.top - hostRect.top);
        el.style.left = x + 'px';
        el.style.top = y + 'px';
    });
}

// 启动独立的标签更新循环
function startMeasureLabelLoop() {
    function loop() {
        updateMeasureLabels();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}
startMeasureLabelLoop();

// ---------- 结果面板 ----------
function addResult(type, label, value) {
    measureResults.push({ type, label, value });
    updateResultPanel();
}

function updateResultPanel() {
    const list = $measureResultList();
    const count = $measureResultCount();
    if (!list || !count) return;
    count.textContent = measureResults.length;
    if (measureResults.length === 0) {
        list.innerHTML = '<div style="color:#888;text-align:center;padding:12px 0;">暂无测量数据</div>';
        return;
    }
    list.innerHTML = measureResults.map((r, i) => `
        <div class="result-row">
            <span class="label">${r.label}</span>
            <span class="value">${r.value}</span>
        </div>
    `).join('');
}

// ---------- 测量点击处理 ----------
function handleMeasureClick(event) {
    if (!measureMode || !scene || !camera || !renderer) return;
    // 工具栏内点击不处理
    if (event.target && event.target.closest && event.target.closest('#measure-toolbar')) return;
    if (event.target && event.target.closest && event.target.closest('#measure-result-panel')) return;

    // 阻止冒泡，避免触发原有的 marker 点击
    event.stopPropagation();

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length === 0) {
        showHint('未命中 3D 目标，请对准场景内的物体点击', 2500);
        return;
    }

    // 跳过已被标记为 sprite/marker 的对象，避免误把标记点当测量点
    let hit = null;
    for (const i of intersects) {
        if (i.object && i.object.userData && i.object.userData.title) continue;
        hit = i;
        break;
    }
    if (!hit) {
        showHint('请点击 3D 场景物体（而非标记点）', 2500);
        return;
    }

    const point = hit.point.clone();

    if (measureMode === 'distance') {
        measurePoints.push(point);
        addPointMarker(point);
        if (measurePoints.length === 2) {
            const d = calcDistance(measurePoints[0], measurePoints[1]);
            addLine(measurePoints[0], measurePoints[1]);
            const mid = getMidpoint(measurePoints[0], measurePoints[1]);
            addLabel(mid, `📏 ${d.toFixed(2)} 米`);
            addResult('distance', `距离 #${measureResults.length}`, `${d.toFixed(2)} 米`);
            measurePoints = [];
            showHint('距离测量完成！', 2000);
        } else {
            showHint('点击第二个点', 0);
        }
    } else if (measureMode === 'area') {
        measurePoints.push(point);
        addPointMarker(point);
        if (measurePoints.length >= 2) updateLivePolygon();
        showHint(`已选 ${measurePoints.length} 个点（双击闭合多边形）`, 0);
    } else if (measureMode === 'height') {
        measurePoints.push(point);
        addPointMarker(point);
        if (measurePoints.length === 2) {
            const h = calcVerticalHeight(measurePoints[0], measurePoints[1]);
            const x0 = measurePoints[0].x, z0 = measurePoints[0].z, y1 = measurePoints[1].y;
            const corner = new THREE.Vector3(x0, y1, z0);
            addLine(measurePoints[0], corner, COLOR_HEIGHT);
            addLine(corner, measurePoints[1], COLOR_HEIGHT);
            addLabel(corner, `📐 ${h.toFixed(2)} 米`);
            addResult('height', `高度 #${measureResults.length}`, `${h.toFixed(2)} 米`);
            measurePoints = [];
            showHint('高度测量完成！', 2000);
        } else {
            showHint('点击第二个点（垂直高度自动计算）', 0);
        }
    }
}

function handleMeasureDoubleClick(event) {
    if (measureMode !== 'area' || measurePoints.length < 3 || !scene) return;
    // 工具栏内点击不处理
    if (event.target && event.target.closest && event.target.closest('#measure-toolbar')) return;
    event.stopPropagation();
    event.preventDefault();

    const area = calcPolygonAreaOnXZ(measurePoints);
    addPolygon(measurePoints);
    const centroid = getCentroidXZ(measurePoints);
    addLabel(centroid, `⬛ ${area.toFixed(2)} m²`);
    addResult('area', `面积 #${measureResults.length}`, `${area.toFixed(2)} m²`);
    removeLivePolygon();
    measurePoints = [];
    showHint('面积测量完成！', 2000);
}

// 使用捕获阶段，确保先于原有 marker 点击监听
window.addEventListener('click', handleMeasureClick, true);
window.addEventListener('dblclick', handleMeasureDoubleClick, true);

// 暴露到 window 供 HTML onclick 使用
window.setMeasureMode = setMeasureMode;
window.clearMeasure = clearMeasure;
window.closeMeasure = closeMeasure;
window.showMeasureToolbar = showMeasureToolbar;
