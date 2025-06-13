import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



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
const delta = 0.026;
const speed = 1.85; // 移动速度
let mixer, walkingClip, idleClip, walkAction, idleAction;
let currentCameraMode = 'firstPerson'; // 默认为第三人称模式
let orbitControls; // 用于第一人称浏览的 OrbitControls
// 鼠标相关变量
let isDragging = false; // 是否正在拖动鼠标
let lastMouseX = 0; // 上一次鼠标水平位置
const rotationSpeed = 0.002; // 鼠标旋转速度（可以根据需要调整）
const orbitRotationSpeed = 0.0002;

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
    if (isDragging && player) {
        const deltaX = event.clientX - lastMouseX; // 计算鼠标水平偏移量
        const rotationDelta = deltaX * rotationSpeed; // 计算旋转角度

        // 更新角色的旋转
        player.rotation.y -= rotationDelta; ß


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
function initThreeJS(modelUrl, playerposition, scenePos, sceneRot) {
    console.log('Initializing Three.js...');
    const rootElement = document.getElementById('three');

    const { width: renderWidth, height: renderHeight } = rootElement.getBoundingClientRect();

    renderer = new THREE.WebGLRenderer({
        antialias: false,
    });
    renderer.setSize(renderWidth, renderHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;

    rootElement.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    camera.up.set(0, -1, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    gs_viewer = new GaussianSplats3D.Viewer({
        selfDrivenMode: false,
        renderer: renderer,
        camera: camera,
        useBuiltInControls: false,
        ignoreDevicePixelRatio: false,
        gpuAcceleratedSort: false,
        sharedMemoryForWorkers: false,
        integerBasedSort: true,
        halfPrecisionCovariancesOnGPU: true,
        dynamicScene: false,
        webXRMode: GaussianSplats3D.WebXRMode.None,
        renderMode: GaussianSplats3D.RenderMode.Always,
        antialiased: true,
        alpha: true
    });

    loadGaussianModel(modelUrl, gs_viewer).then(() => {
        gs_viewer.splatMesh.position.set(scenePos.x, scenePos.y, scenePos.z);
        gs_viewer.splatMesh.rotation.set(THREE.MathUtils.degToRad(sceneRot.x), THREE.MathUtils.degToRad(sceneRot.y), THREE.MathUtils.degToRad(sceneRot.z));
        gs_viewer.splatScene.updateMatrixWorld();
    });

    loadFBXModel('public/model/Idle.fbx', playerposition);

    // 初始化 OrbitControls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // 启用阻尼效果
    orbitControls.dampingFactor = 0.25; // 阻尼系数
    orbitControls.screenSpacePanning = false; // 禁用屏幕空间平移
    orbitControls.minDistance = 1; // 最小距离
    orbitControls.maxDistance = 100; // 最大距离
    orbitControls.maxPolarAngle = Math.PI / 2; // 最大极角
    switchCameraMode() 
}

// 封装加载高斯模型的函数
function loadGaussianModel(modelUrl, gs_viewer) {
    return gs_viewer.addSplatScene(modelUrl);
}

//加载人物动画和模型
function loadFBXModel(modelUrl, playerposition) {
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
            walkingClip = walk.animations[0]; // 假设动画文件中只有一个动画剪辑
            walkAction = mixer.clipAction(walkingClip);
            idleClip = player.animations[0]; // 假设动画文件中只有一个动画剪辑
            idleAction = mixer.clipAction(idleClip);
            idleAction.play();
            animate();
        });
        function animate() {
            renderer.clear();
            gs_viewer.update();
            gs_viewer.render();

            if (player) {
                // 玩家移动逻辑
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

                updateCamera(); // 更新相机位置和朝向
            }

            if (mixer) {
                mixer.update(delta);
                if (Moving) {
                    walkAction.play();
                    idleAction.stop();
                } else {
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

function updateCamera() {
    if (player) {
        const playerWorldPos = new THREE.Vector3();
        player.getWorldPosition(playerWorldPos);

        if (currentCameraMode === 'thirdPerson') {
            // 第三人称相机逻辑
            const cameraPos = playerWorldPos.clone()
                .add(cameraOffset.clone().applyQuaternion(player.quaternion));
            const lookAtPos = playerWorldPos.clone().add(cameraLookAtOffset);
            camera.position.copy(cameraPos);
            camera.lookAt(lookAtPos);
        } else if (currentCameraMode === 'orbit') {
            // 围绕中心点旋转的相机逻辑
            const radius = 2; // 相机距离中心点的距离
            const angle = orbitRotationSpeed * Date.now(); // 根据时间计算角度
            const orbitX = radius * Math.sin(angle);
            const orbitZ = radius * Math.cos(angle);

            // 相机位置围绕中心点旋转，并向上移动
            const orbitY = -2; // 相机的垂直位置
            camera.position.set(orbitX, orbitY, orbitZ); // 相机位置

            // 相机俯视中心点，看向中心点下方一点的位置
            const lookAtPos = new THREE.Vector3(0, -1, 0); // 看向中心点下方一点
            camera.lookAt(lookAtPos);
        } else if (currentCameraMode === 'firstPerson') {
            // 第一人称自主浏览模式
            camera.position.copy(playerWorldPos); // 将相机位置设置为人物模型的位置
            camera.rotation.copy(player.rotation); // 将相机的旋转设置为人物模型的旋转
            orbitControls.update(); // 更新 OrbitControls
        }
    }
}

function switchCameraMode(module) {
    currentCameraMode = module || 'thirdPerson'; // 如果传入了模块，则使用传入的模块，否则默认为第三人称模式
    if (currentCameraMode === 'thirdPerson') {
        currentCameraMode = 'orbit';
        console.log('Switched to Orbit Camera Mode');
        if (player) {
            player.visible = false; // 在 Orbit 模式下隐藏人物模型
        }
    } else if (currentCameraMode === 'orbit') {
        currentCameraMode = 'firstPerson';
        console.log('Switched to First Person Camera Mode');
        if (player) {
            player.visible = false; // 在第一人称模式下隐藏人物模型
        }
    } else if (currentCameraMode === 'firstPerson') {
        currentCameraMode = 'thirdPerson';
        console.log('Switched to Third Person Camera Mode');
        if (player) {
            player.visible = true; // 在第三人称模式下显示人物模型
        }
    }
}


// 调用主函数并传入模型地址
// initThreeJS('src/assets/model/earth_center.splat');

window.addEventListener('message', function (event) {
    if (event.data.action === 'initThreeJS') {
        const data = event.data.payload.data;
        initThreeJS(data.gsmodel, data.playerposition, data.scenePos, data.sceneRot);
    }else if (event.data.action === 'autowander') {
        switchCameraMode('orbit'); // 切换到 Orbit 模式
    } else if (event.data.action === 'thirdpersonwander') {
        switchCameraMode('thirdPerson'); // 切换到 Third Person 模式
    }
})

