import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 导入 OrbitControls

const rootElement = document.getElementById('threemap');

// 动态获取容器的宽高
const { width: renderWidth, height: renderHeight } = rootElement.getBoundingClientRect();

const renderer = new THREE.WebGLRenderer({
    antialias: false
});
renderer.setSize(renderWidth, renderHeight);

// 将渲染器的 canvas 添加到已有的 div 中
rootElement.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(65, renderWidth / renderHeight, 0.1, 500);
camera.position.copy(new THREE.Vector3().fromArray([-1, -4, 6]));
camera.up = new THREE.Vector3().fromArray([0, -1, -0.6]).normalize();
camera.lookAt(new THREE.Vector3().fromArray([0, 4, 0]));

const viewer = new GaussianSplats3D.Viewer({
    selfDrivenMode: false,
    renderer: renderer,
    camera: camera,
    useBuiltInControls: false,
    ignoreDevicePixelRatio: false,
    gpuAcceleratedSort: true,
    enableSIMDInSort: true,
    sharedMemoryForWorkers: true,
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
    sharedMemoryForWorkers: false
});

// 添加 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果
controls.dampingFactor = 0.25; // 阻尼系数
controls.enableZoom = true; // 启用缩放
controls.enableRotate = true; // 启用旋转
controls.enablePan = true; // 启用平移

viewer.addSplatScene('http://localhost:5173/src/assets/model/enviroment.splat')
    .then(() => {
        requestAnimationFrame(update);
    });
function update() {
    threeviewer.update();
    threeviewer.render();
    controls.update(); // 更新 OrbitControls
    requestAnimationFrame(update);
}