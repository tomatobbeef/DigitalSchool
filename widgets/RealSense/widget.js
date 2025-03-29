

//模块：
var handler 
var positions=[]
var that=this

var pathfly = function pathfly(positions)
    {
        position=positions.shift(),
        //viewer.camera.lookAt(position, new Cesium.Cartesian3(0.0, 0.01, 0.25)),
        position.x-=14,
        position.y+=30,
        position.z+=20,
        console.log(positions.length),
        cartographic = Cesium.Cartographic.fromCartesian(position),
        console.log(cartographic),
        console.log(position),
        console.log(viewer.camera.position),
        dir = new Cesium.Cartesian3(0,0,0.1),
        dir.x=position.x-viewer.camera.position.x,
        dir.y=position.y-viewer.camera.position.y,
        dir.z=position.z-viewer.camera.position.z,
        console.log(dir),
        viewer.camera.flyTo({
            destination : viewer.camera.position,
            orientation : {
                //direction : new Cesium.Cartesian3(0,0.25,0.25),
                direction : dir,
                up : new Cesium.Cartesian3(0,0,0)
            },
            complete : ()=> {
                viewer.camera.flyTo({
                    destination : position,
                    orientation : {
                        //direction : new Cesium.Cartesian3(0,0.25,0.25),
                        direction : dir,
                        up : new Cesium.Cartesian3(0,0,0)
                    },
                    complete : ()=> {
                        if(positions.length>0) {
                            pathfly(positions)
                        }
                    }
                })
            }
        })
    }


mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                maxmin:true,
                width: 300,
                height: 530
            }
        },
    },
    measureControl: null,
    //初始化[仅执行1次]
    create: function () {
        this.measureControl = new mars3d.analysi.Measure({
            viewer: this.viewer
        })
    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
       this.viewWindow = result;
       
       this.config.abc;
    },
    //激活插件
    activate: function () {
        
    },
    //释放插件
    disable: function () {
        this.viewWindow = null;
        //this.clearDraw();
    },

    roamFree: function (options) {
        viewer=this.viewer;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click){
            let ray = viewer.camera.getPickRay(click.position);//获取一条射线
            let position = viewer.scene.globe.pick(ray, viewer.scene);
            console.log("当前拾取的坐标：", position);  
            position.x-=14;
            position.y+=30;
            position.z+=20;
            console.log("改变高度的坐标：", position); 
            viewer.camera.flyTo({
                destination : position,
                orientation : {
                    direction : new Cesium.Cartesian3(0,0,0.25),
                    up : new Cesium.Cartesian3(0,0,0)
                }
            })
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.viewer.mars.keyboardRoam.enable = !0 ;
    },

    roamPath2d: function(){
        viewer=this.viewer;
        console.log("开始路径漫游2d");
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click){
            let ray = viewer.camera.getPickRay(click.position);//获取一条射线
            let position = viewer.scene.globe.pick(ray, viewer.scene);
            console.log("确定一个路径点");
            positions.push(position);
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function(click){
            console.log("开始释放");
            pathfly(positions);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    },

    inspectionBuilding: function(){
        viewer=this.viewer;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function(click){
            var pick = viewer.scene.pick(click.position);
            let ray = viewer.camera.getPickRay(click.position);//获取一条射线
            let position = viewer.scene.globe.pick(ray, viewer.scene);
            //r=pick.primitive.boundingSphere.radius;
            c=pick.primitive.boundingSphere.center;
            k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
            k.x=position.x-14;
            k.y=position.y+30;
            k.z=position.z+20;
            console.log(c);
            console.log(click.position.z);
            console.log(k);
            //c=click.position;
            r=500.0;
            console.log(r);
            console.log(c);
            var entity = viewer.entities.add({ 
                position: k, 
                point: { 
                    color: Cesium.Color.TRANSPARENT, 
                    pixelSize: 1,
                } 
            }); 
            viewer.zoomTo(entity); 
            var heading = 0; // 朝向 
            var offset = new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading), -Cesium.Math.toRadians(60), r/2); 
            viewer.zoomTo(entity, offset);
            function rotate() { 
                heading += 0.1; 
                offset = new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading), -Cesium.Math.toRadians(60), r/2); 
                viewer.zoomTo(entity, offset); 
                viewer.scene.screenSpaceCameraController.enableInputs = false; 
              } 
            viewer.zoomTo(entity, offset).then(function () { 
                viewer.clock.onTick.addEventListener(rotate); 
              }); 
            handler.setInputAction(function(click){
                viewer.clock.onTick.removeEventListener(rotate); 
                viewer.scene.screenSpaceCameraController.enableInputs = true 
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    drawPolyline: function (options) {
        this.measureControl.measuerLength(options);
    },

    test: function(){
        Cesium.Cartesian3;
    },

    clearDraw: function () {
        this.measureControl.clearMeasure();
        mars3d.widget.disable(this.jkWidgetUri);
    },

}));