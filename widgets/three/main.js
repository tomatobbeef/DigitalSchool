import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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
const speed = 2.05; // 移动速度
let mixer, walkingClip;
// 鼠标相关变量
let isDragging = false; // 是否正在拖动鼠标
let lastMouseX = 0; // 上一次鼠标水平位置
const rotationSpeed = 0.002; // 鼠标旋转速度（可以根据需要调整）

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
function initThreeJS(modelUrl,playerposition) {
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
            // requestAnimationFrame(update);
        });

    loadFBXModel('src/assets/model/character.fbx',playerposition);
}

// 封装加载高斯模型的函数
function loadGaussianModel(modelUrl, gs_viewer) {
    return gs_viewer.addSplatScene(modelUrl);
}

//加载人物动画和模型
function loadFBXModel(modelUrl,playerposition) {
    const loader = new FBXLoader();

    loader.load(modelUrl, (object) => {
        player = object;
        scene.add(player);
        player.position.set(playerposition.x, playerposition.y, playerposition.z); // 将人物模型移动到高斯点云模型的旁边
        player.scale.set(0.014, 0.014, 0.014)
        player.rotation.x = Math.PI; // 绕 X 轴翻转（上下颠倒修正）
        // 获取模型的动画
        const animations = object.animations;
        if (animations.length > 0) {
            walkingClip = animations[0]; // 假设只有一个 walking 动画
            mixer = new THREE.AnimationMixer(object);
            const walkingAction = mixer.clipAction(walkingClip);
            walkingAction.play(); // 播放 walking 动画

            // 更新动画
            // 在FBX加载回调中的动画更新部分
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

                    updateCamera();
                }

                if (mixer && Moving) {  // 关键修改：只在移动时播放动画
                    mixer.update(delta);
                }

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            animate();
        }
    });
}

// 第三人称相机参数
const cameraOffset = new THREE.Vector3(-0.5, 2.2, -1.8); // (x: 水平偏移, y: 高度, z: 后方距离)
const cameraLookAtOffset = new THREE.Vector3(-0.5, -2.0, 0); // 看向角色身体中心偏上位置

function updateCamera() {
    if (player) {
        // 1. 获取角色世界位置
        const playerWorldPos = new THREE.Vector3();
        player.getWorldPosition(playerWorldPos);

        // 2. 计算相机位置（角色位置 + 偏移）
        const cameraPos = playerWorldPos.clone()
            .add(cameraOffset.clone().applyQuaternion(player.quaternion));

        // 3. 计算看向的点（角色位置 + 轻微高度偏移）
        const lookAtPos = playerWorldPos.clone().add(cameraLookAtOffset);

        // 4. 更新相机
        camera.position.copy(cameraPos);
        camera.lookAt(lookAtPos);
    }
}




// 调用主函数并传入模型地址
// initThreeJS('src/assets/model/earth_center.splat');

window.addEventListener('message', function (event) {
    if (event.data.action === 'initThreeJS') {
        const data = event.data.payload.data;
        initThreeJS(data.gsmodel,data.playerposition);
    }
})
