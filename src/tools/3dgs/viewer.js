import * as Cesium from "cesium";

import { ThreeOverlay } from "./three-overlay";
import { GaussianSplatLayer } from "./gaussian-splat-layer";

export class Viewer {
  public cesium!: Cesium.Viewer;

  private threeOverlay!: ThreeOverlay;

  constructor() {
    this.createViewer();
    this.createOverlay();

    // call rendering on our three overlay after Cesium is done rendering
    this.cesium.scene.postRender.addEventListener(() => {
      this.threeOverlay.render();
    });
  }

  private createViewer() {
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
      // @ts-ignore
      imageryProvider: false,
    });

    this.cesium.scene.debugShowFramesPerSecond = true;
    this.addTerrainProvider();
    this.addBaseLayer();
    // this.addBuildingsLayer();
  }

  private async addTerrainProvider(): Promise<void> {
    const provider = await Cesium.CesiumTerrainProvider.fromUrl(
      "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1_0/collections/digitaalterreinmodel/quantized-mesh",
      {
        requestVertexNormals: true,
      }
    );
    this.cesium.terrainProvider = provider;
  }

  private addBaseLayer(): void {
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

  private async addBuildingsLayer(): Promise<void> {
    const buildings = await Cesium.Cesium3DTileset.fromUrl(
      "https://storage.googleapis.com/ahp-research/maquette/bag3d_v20230809/geom/tileset10k.json"
    );

    this.cesium.scene.primitives.add(buildings);
  }

  private createOverlay() {
    this.threeOverlay = new ThreeOverlay(this.cesium!.camera);
  }

  public flyTo(
    x: number,
    y: number,
    z: number,
    heading: number,
    pitch: number,
    duration: number
  ): void {
    this.cesium.camera?.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(x, y, z),
      orientation: {
        heading: Cesium.Math.toRadians(heading),
        pitch: Cesium.Math.toRadians(pitch),
        roll: 0.0,
      },
      duration: duration,
    });
  }

  public addGaussianSplatLayer(layer: GaussianSplatLayer): void {
    this.threeOverlay.addGaussianSplatLayer(layer);
  }
}
