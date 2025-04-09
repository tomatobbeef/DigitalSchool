var thisWidget;
var thisType = "";


var lastVal = 0;
var lastSection = null;

//从父页面调用
function showResult(valstr, val) {
    if (val)
        lastVal = val;
    $("#lbl_measure_result").html(valstr);
}


function showSectionResult(param, val) {
    if (haoutil.isutil.isString(param)) {
        showResult(param, val);
        return;
    }else{
        lastSection = param
	}
    showResult(param.distancestr, param.distance);
    var danwei = $('#measure_length_danwei').val();
    thisWidget.showSectionChars(param,danwei || 'auto');
}

function weatherSimulate(){
    window.parent.childopen(null,"newht","widgets/RealSenseSimulate/weather/weather.html")
}

var inter = null;
var raswitch=false;
function reallight(){
    viewer=window.parent.vi;
    rai=document.getElementById("rainp");
    if(raswitch)
    {
        console.log("关闭");
        viewer.scene.globe.enableLighting = false;
        viewer.shadows = false;
        rai.style.display="none";
        raswitch=false;
        window.parent.ellipse.show=false;
    }
    else
    {
        console.log("开启");
        rai.style.display="block";
        raswitch=true;
        window.parent.ellipse.show=true;
    }
}
var clearOpenLight=function clearOpenLight() {
    viewer.scene.globe.enableLighting = false
    viewer.shadows = false
    viewer.terrainShadows = Cesium.ShadowMode.DISABLED
    if (inter) {
        clearInterval(inter)
        inter = null
    }
}

var changeli=function changeli()
{
    viewer=window.parent.vi;
    rainp=document.getElementById("rainp");
    time = parseInt(rainp.value)*3000 * 60;
    // 改变时间设置光照效果
    let date = new Date().getTime() + time;
    let utc = Cesium.JulianDate.fromDate(new Date(date));
    //北京时间
    viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(utc, 0, new Cesium.JulianDate());
}

window.onload=function (){
    viewer=window.parent.vi;
    /*var bo=viewer.entities.add({
        id: `box`,
        name : `box`,
        position: Cesium.Cartesian3.fromDegrees(114.61321, 30.45914, 32.4),
        box : {
            dimensions : new Cesium.Cartesian3(1000, 1000, 1),
            material : Cesium.Material.fromType('Color', { // 设置外观为材质外观，并设置材质颜色为白色  
                color : Cesium.Color.RED  
            }) ,//转换颜色
            //outline : false,
            //outlineColor : Cesium.Color.BLACK,
            shadows:Cesium.ShadowMode.ENABLED,
        },
    });*/
}

//
var pathfly = function pathfly(positions)
    {
        viewer=window.parent.vi;
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

freeRoam =function freeRoam(){
    roamFree();
}

function pathRoam2d(){
    console.log("pathRoam2d");
    this.roamPath2d();
    //this.drawPolyline();
}

function buildingInspection(){
    console.log("buildingInspection");
    inspectionBuilding();
}

roamFree= function roamFree(options) {
    viewer=window.parent.vi;
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
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
    },Cesium.ScreenSpaceEventType.LEFT_DOWN);
    //this.viewer.mars.keyboardRoam.enable = !0 ;
},


roamPath2d= function roamPath2d(){
    this.drawroad();
    var positions=[];
    viewer=window.parent.vi;
    console.log("开始路径漫游2d");
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(click){
        let ray = viewer.camera.getPickRay(click.position);//获取一条射线
        position = viewer.scene.globe.pick(ray, viewer.scene);
        console.log("确定一个路径点");
        positions.push(position);
    },Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(function(click){
        console.log("开始释放");
        pathfly(positions);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
        window.parent.delda();
    },Cesium.ScreenSpaceEventType.RIGHT_DOWN);
},

inspectionBuilding= function inspectionBuilding(){
    viewer=window.parent.vi;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction( function (click) {
        console.log("点击");
        var pick = viewer.scene.pick(click.position);
        let ray = viewer.camera.getPickRay(click.position);//获取一条射线
        let position = viewer.scene.globe.pick(ray, viewer.scene);
        //r=pick.primitive.boundingSphere.radius;
        c=pick.primitive.boundingSphere.center;
        k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
        k.x=position.x-14;
        k.y=position.y+30;
        k.z=position.z+20;
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
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
        },Cesium.ScreenSpaceEventType.RIGHT_DOWN);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
},

drawPolyline= function drawPolyline(options) {
    this.measureControl.measuerLength(options);
}

drawroad= function drawroad(){
    window.parent.drawroa();
}

delda=function delda(){
    window.parent.delda();
}
function jkxj(){
    window.parent.childopen(null,"newht","widgets/RealSenseSimulate/search/search.html")
}

function indoor(){
    window.parent.childopen(null,"newht","widgets/RealSenseSimulate/indoor/indoor.html")
}

function park()
{
    viewer=window.parent.vi;
    pos=new Cesium.Cartesian3(-2291552.7298009736, 5002697.480840379, 3214700.5792261604)
    viewer.camera.flyTo({
        destination : pos,
        orientation : {
            head:3.037808197114813,
            pitch:-1.5268920873785223,
            roll:0
            
        }
    })
    window.parent.childopen(null,"newht","widgets/TwinCampus/parking/result.html")
}

function waterrepair()
{
    window.parent.waterPrimitive.show=!window.parent.waterPrimitive.show;
}


