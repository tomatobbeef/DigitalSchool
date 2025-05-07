import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 初始化 Three.js 环境
function initThreeJS(modelUrl) {
    console.log('Initializing Three.js...');
    const rootElement = document.getElementById('threemap');

    // 动态获取容器的宽高
    const { width: renderWidth, height: renderHeight } = rootElement.getBoundingClientRect();

    const renderer = new THREE.WebGLRenderer({
        antialias: false
    });
    renderer.setSize(renderWidth, renderHeight);

    // 将渲染器的 canvas 添加到已有的 div 中
    rootElement.appendChild(renderer.domElement);

    const scene = new THREE.Scene(); // 创建一个 Three.js 场景

    const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
    camera.position.set(0, 0, 5); // 调整相机位置
    camera.up.set(0, -1, 0); // 设置相机的“上”方向为 Y 轴
    camera.lookAt(scene.position); // 相机指向场景中心

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 平行光
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const threeviewer = new GaussianSplats3D.Viewer({
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
    loadGaussianModel(modelUrl, threeviewer)
        .then(() => {
            requestAnimationFrame(update);
        });

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

// 调用主函数并传入模型地址
// initThreeJS('http://localhost:5173/src/assets/model/enviroment.splat');

window.addEventListener('message', function (event) {
    if (event.data.action === 'initThreeJS') {
        initThreeJS('http://localhost:5173/src/assets/model/enviroment.splat');
    }
})