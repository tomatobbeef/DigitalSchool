import * as Cesium from "cesium";
import * as THREE from "three";
import * as GaussianSplats3D from "@mkkellogg/gaussian-splats-3d";

export class GaussianSplatLayer {
  constructor(model, location, rotation, initialScale = 1) {
    this.ready = false;
    this.model = model;
    this.location = location;
    this.rotation = rotation;
    this.scale = initialScale;

    window.addEventListener("keydown", (event) => {
      this.adjustScene(event);
    });
  }

  adjustScene(event) {
    switch (event.key) {
      case "q":
        this.scene.rotateY(0.005);
        break;
      case "w":
        this.scene.rotateY(-0.005);
        break;
      case "a":
        this.scene.rotateX(0.005);
        break;
      case "s":
        this.scene.rotateX(-0.005);
        break;
      case "z":
        this.scene.rotateZ(0.005);
        break;
      case "x":
        this.scene.rotateZ(-0.005);
        break;
      case "y":
        this.location.lat += 0.0000025;
        this.updatePosition();
        break;
      case "h":
        this.location.lat -= 0.0000025;
        this.updatePosition();
        break;
      case "j":
        this.location.lon += 0.0000025;
        this.updatePosition();
        break;
      case "g":
        this.location.lon -= 0.0000025;
        this.updatePosition();
        break;
      case "o": // Height increment
        this.location.height += 1;
        this.updatePosition();
        break;
      case "l": // Height decrement
        this.location.height -= 1;
        this.updatePosition();
        break;
      case "m":
        this.scale += 0.05;
        this.updateScale();
        break;
      case "n":
        if (this.scale > 0.05) {
          this.scale -= 0.05;
          this.updateScale();
        }
        break;
    }

    console.log(
      "Model:",
      this.model,
      "\nRotation:",
      this.scene.rotation.x,
      this.scene.rotation.y,
      this.scene.rotation.z,
      "\nLoc:",
      `Lon: ${this.location.lon}, Lat: ${this.location.lat}, Height: ${this.location.height}`,
      "\nScale:",
      this.scale
    );
  }

  updatePosition() {
    const position = Cesium.Cartesian3.fromDegrees(
      this.location.lon,
      this.location.lat,
      this.location.height
    );
    this.scene.position.set(position.x, position.y, position.z);
  }

  updateScale() {
    if (this.splatViewer.getSplatMesh()) {
      const mesh = this.splatViewer.getSplatMesh();
      mesh.scale.set(this.scale, this.scale, this.scale);
    }
  }

  setup(camera, renderer) {
    const position = Cesium.Cartesian3.fromDegrees(
      this.location.lon,
      this.location.lat,
      this.location.height
    );

    this.splatViewer = new GaussianSplats3D.Viewer({
      selfDrivenMode: false,
      gpuAcceleratedSort: true,
      sharedMemoryForWorkers: false,
      ignoreDevicePixelRatio: true,
      sceneRevealMode: GaussianSplats3D.SceneRevealMode.Always,
      useBuiltInControls: false,
      camera: camera,
      renderer: renderer,
    });

    this.scene = new THREE.Scene();
    this.scene.position.set(position.x, position.y, position.z);
    this.scene.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

    this.splatViewer
      .addSplatScene(this.model, {
        showLoadingUI: false,
        progressiveLoad: false,
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      })
      .then(() => {
        const mesh = this.splatViewer.getSplatMesh();
        mesh.scale.set(this.scale, this.scale, this.scale);
        this.scene.add(mesh);
        this.ready = true;
      });
  }
}