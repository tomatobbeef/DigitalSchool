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
let scene, camera, renderer, controls, threeviewer,player;
// 当某个键盘按下设置对应属性设置为true
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') keyStates.W = true;
    if (event.code === 'KeyA') keyStates.A = true;
    if (event.code === 'KeyS') keyStates.S = true;
    if (event.code === 'KeyD') keyStates.D = true;
});
// 当某个键盘抬起设置对应属性设置为false
document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') keyStates.W = false;
    if (event.code === 'KeyA') keyStates.A = false;
    if (event.code === 'KeyS') keyStates.S = false;
    if (event.code === 'KeyD') keyStates.D = false;
});

// 循环执行的函数中测试W键盘状态值
function render() {
    if (keyStates.W) {
        console.log('W键按下');
    } else {
        console.log('W键松开');
    }
    requestAnimationFrame(render);
}
render();

// 初始化 Three.js 环境
function initThreeJS(modelUrl) {
    console.log('Initializing Three.js...');
    const rootElement = document.getElementById('three');

    // 动态获取容器的宽高
    const { width: renderWidth, height: renderHeight } = rootElement.getBoundingClientRect();

    renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(renderWidth, renderHeight);

    // 将渲染器的 canvas 添加到已有的 div 中
    rootElement.appendChild(renderer.domElement);

    scene = new THREE.Scene(); // 创建一个 Three.js 场景

    camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    camera.position.set(0, 0, 5); // 调整相机位置
    camera.up.set(0, -1, 0); // 设置相机的“上”方向为 Y 轴
    camera.lookAt(scene.position); // 相机指向场景中心

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 平行光
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    threeviewer = new GaussianSplats3D.Viewer({
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
        freeIntermediateSplatData: false
    });

    // 添加 OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;

    // 加载高斯模型
    // loadGaussianModel(modelUrl, threeviewer)
    //     .then(() => {
    //         requestAnimationFrame(update);
    //     });

    loadFBXModel('src/assets/model/Walking.fbx');

    function update() {
        threeviewer.update();
        threeviewer.render();
        controls.update();
        requestAnimationFrame(update);
    }
}

// 封装加载高斯模型的函数
function loadGaussianModel(modelUrl, threeviewer) {
    return threeviewer.addSplatScene(modelUrl);
}

//加载人物动画和模型
function loadFBXModel(modelUrl) {
    const loader = new FBXLoader();
    loader.load(modelUrl, (object) => {
        player = object;
        scene.add(player);
    
        // 获取模型的动画
        const animations = object.animations;
        if (animations.length > 0) {
            const walkingClip = animations[0]; // 假设只有一个 walking 动画
            const mixer = new THREE.AnimationMixer(object);
            const walkingAction = mixer.clipAction(walkingClip);
            walkingAction.play(); // 播放 walking 动画
    
            // 更新动画
            function animate() {
                requestAnimationFrame(animate);
                if (mixer) {
                    mixer.update(0.016); // 16ms 的时间步长
                }
                renderer.render(scene, camera);
            }
            animate();
        }
    });
}

// 调用主函数并传入模型地址
initThreeJS('src/assets/model/earth.splat');

window.addEventListener('message', function (event) {
    if (event.data.action === 'initThreeJS') {
        console.log('received message')
        initThreeJS('src/assets/model/museum_lobby.splat');
    }
})