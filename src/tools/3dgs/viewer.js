import * as Cesium from "cesium";
import { ThreeOverlay } from "./three-overlay";
import { GaussianSplatLayer } from "./gaussian-splat-layer";

export class Viewer {
  constructor() {
    this.createViewer();
    this.createOverlay();

    // Call rendering on our Three overlay after Cesium is done rendering
    this.cesium.scene.postRender.addEventListener(() => {
      this.threeOverlay.render();
    });
  }

  createViewer() {
    this.cesium = new Cesium.Viewer("cesium", {
      skyBox: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      animation: false,
      timeline: false,
      navigationHelpButton: false,
      infoBox: false,
      imageryProvider: false,
    });

    this.cesium.scene.debugShowFramesPerSecond = true;
    this.addTerrainProvider();
    this.addBaseLayer();
    // this.addBuildingsLayer();
  }

  async addTerrainProvider() {
    const provider = await Cesium.CesiumTerrainProvider.fromUrl(
      "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1_0/collections/digitaalterreinmodel/quantized-mesh",
      {
        requestVertexNormals: true,
      }
    );
    this.cesium.terrainProvider = provider;
  }

  addBaseLayer() {
    var wmtsLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
      layer: "Actueel_orthoHR",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "EPSG:3857",
      maximumLevel: 20,
    });

    this.cesium.imageryLayers.addImageryProvider(wmtsLayer);
  }

  async addBuildingsLayer() {
    const buildings = await Cesium.Cesium3DTileset.fromUrl(
      "https://storage.googleapis.com/ahp-research/maquette/bag3d_v20230809/geom/tileset10k.json"
    );

    this.cesium.scene.primitives.add(buildings);
  }

  createOverlay() {
    this.threeOverlay = new ThreeOverlay(this.cesium.camera);
  }

  flyTo(x, y, z, heading, pitch, duration) {
    this.cesium.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(x, y, z),
      orientation: {
        heading: Cesium.Math.toRadians(heading),
        pitch: Cesium.Math.toRadians(pitch),
        roll: 0.0,
      },
      duration: duration,
    });
  }

  addGaussianSplatLayer(layer) {
    this.threeOverlay.addGaussianSplatLayer(layer);
  }
}