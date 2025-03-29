var thisWidget;
var thisType = "";

//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;


    if (thisWidget.config && thisWidget.config.style) {
        $("body").addClass(thisWidget.config.style);
    }

    $("#measure_area_danwei").val("auto"); //默认值
    $("#measure_length_danwei").val("auto"); //默认值

    $('#btn_measure_length').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: false,
            addHeight: 1,  //在绘制点基础自动增加高度（单位：米）
            calback: showResult
        });
    });


    $('#btn_measure_length_td').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('贴地需要地形服务支撑，部分区域可能无法贴地！', 'measure_length_tip');


        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: true,
            calback: showResult
        });
    });

    $('#btn_measure_area').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_length_danwei').hide();
        $('#measure_area_danwei').show();

        thisType = "area";
        lastVal = 0;
        thisWidget.drawPolygon({
            unit: $('#measure_area_danwei').val(),
            calback: showResult
        });
    });

    $('#btn_measure_angle').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "angle";
        lastVal = 0;
        thisWidget.measureAngle();
    });

    $('#btn_measure_point').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "point";
        lastVal = 0;
        thisWidget.measurePoint();
    });


    $('#btn_measure_section').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('剖面需要地形服务支撑，部分区域可能无法获取高程值！', 'measure_section_tip');

        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "section";
        lastVal = 0;
        thisWidget.drawSection({
            unit: $('#measure_length_danwei').val(),
            splitNum: 19, //插值次数
            onStart: function () {//开始分析前回调(异步)
                haoutil.loading.show();
            },
            onStop: function () {//分析完成后回调(异步)
                haoutil.loading.hide();
            },
            calback: showSectionResult
        });
    });


    $('#btn_measure_height').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: false,
            calback: showResult
        });
    });

    $('#btn_measure_supHeight').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "super_height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: true,
            calback: showResult
        });
    });

    $('#btn_measure_clear').bind('click', function () {
        $("#lbl_measure_result").html("");

        thisType = "";
        lastVal = 0;
        thisWidget.clearDraw();
    });

    $('#btn_measure_point2').bind('click', function () {
        alert(1);
    });
    

    //更换单位
    $("#measure_length_danwei").change(function (e) {
        var danwei = $('#measure_length_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatLength(lastVal, danwei);
            showResult(valstr);
        }
		if( lastSection != null){
            thisWidget.showSectionChars(lastSection,danwei);
        }
    });
    $("#measure_area_danwei").change(function (e) {
        var danwei = $('#measure_area_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatArea(lastVal, danwei);
            showResult(valstr);
        }
    });
}


    
     //var viewer=window.parent.viewer;
     //let tileset=window.parent.tileset;
   
    var viewer = new Cesium.Viewer('cesiumContainer')
    console.log(Cesium.VERSION);
    let tileset = add3DTiles( '../../Data/3Dtiles/cesiumosgb/tileset.json')

    // let offset = new Cesium.Cartesian3(0.0, 0.0, 500);  //调整数字500调整高度
    // let translationMatrix0 = Cesium.Matrix4.fromTranslation(offset);
    // let modelMatrix0 = Cesium.Matrix4.multiply(tileset.modelMatrix, translationMatrix0, new Cesium.Matrix4());
    // tileset.modelMatrix = modelMatrix0;
    
    
    // 模型变量组
    var models = {
        localHideModel: [],  // 局部隐藏模型数组
        localShowModel: [],   // 局部显示模型数组
        allModels: []         // 所有模型的数组
    };
    
    // 代表坐标点组的变量，这是一个多边形的顶点数组
    var polygonPoints = [
        [117.44834303855897, 34.37801246980093],
        [117.44802117347719, 34.37690560837309],
        [117.4492174386978, 34.37811430031746],
        [117.44834303855897, 34.37801246980093] // 闭合多边形
    ];
        



    function  add3DTiles(url) {
        var primitive = new Cesium.Cesium3DTileset({
            url: url,
        })
        var tileset = viewer.scene.primitives.add(primitive)
        return tileset
    }
    //viewer.zoomTo(tileset);


///zjl/Data/Pointsset/sourcepoints/tileset.json
    // let tileset1 = add3DTiles1( 'http://localhost:9003/model/IGszUAOu/tileset.json')
    // function  add3DTiles1(url1) {
    //     var primitive1 = new Cesium.Cesium3DTileset({
    //         url: url1,
    //         modelMatrix: Cesium.Matrix4.fromArray(
    //                     [0.9998503272726612,-0.013705064737410178,0.01055908392312263,0,
    //                         0.013837537004817352,0.9998251605952196,-0.012576597726820071,0,
    //                         -0.010384874693151969,0.012720827067660478,0.9998651583770293,0,
    //                         -184956.33661949774,1680738.4427380064,-2842750.3556499034,1])
    //     })
    //     var tileset1 = viewer.scene.primitives.add(primitive1)
    //     return tileset1
    // }

    models.allModels.push(tileset);
    models.localHideModel.push(tileset);

    // viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        //     url: '/zjl/Data/Pointsset/sourcepoints/tileset.json',
        //     modelMatrix: Cesium.Matrix4.fromArray(
        //         [0.9998503272726612,-0.013705064737410178,0.01055908392312263,0,
        //             0.013837537004817352,0.9998251605952196,-0.012576597726820071,0,
        //             -0.010384874693151969,0.012720827067660478,0.9998651583770293,0,
        //             -184956.33661949774,1680738.4427380064,-2842750.3556499034,1]),
        //   }));


    let polygonPos = []
    let polygon = undefined



    let isDrawing = false
    let points=[]

    
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

    handler.setInputAction(evt=>{
        const pickpos = viewer.scene.pickPosition(evt.position)
        console.log(pickpos)
        if(isDrawing){
            if(polygonPos.length > 2 && !polygon){
                polygon = viewer.entities.add({
                    polygon:{
                        hierarchy:new Cesium.CallbackProperty(()=>{
                            return new Cesium.PolygonHierarchy(polygonPos)
                        },false),
                        material:Cesium.Color.fromCssColorString('#e36d62').withAlpha(0.5),
                        perPositionHeight :true
                    }
                })
            }
            if(pickpos){
                polygonPos.push(pickpos)
                points.push(viewer.entities.add({
                    position:pickpos,
                    point:{
                        color:Cesium.Color.DEEPPINK,
                        pixelSize:10
                    }
                }))
            }

        }


        
    console.log(polygonPos);
 

    },Cesium.ScreenSpaceEventType.LEFT_DOWN)

   
    handler.setInputAction(evt=>{
        
        if(polygon){
            console.log(polygon)
            polygon.polygon=
                {
                    hierarchy:new Cesium.PolygonHierarchy(polygonPos),
                    material:Cesium.Color.fromCssColorString('#a8e362').withAlpha(0.2),
                    perPositionHeight :true
                }

            polygonPoints=polygonPos;
            
            models.localShowModel.push(models.allModels[1]);

            applyClippingPlanesAndHideOthers();
            

            // let customerShader = new Cesium.CustomShader({
            //     lightingModel:Cesium.LightingModel.UNLIT,
            //     uniforms:{
            //         u1pos:{
            //             type:Cesium.UniformType.VEC3,
            //             value:polygonPos[0]
            //         },
            //         u2pos:{
            //             type:Cesium.UniformType.VEC3,
            //             value:polygonPos[1]
            //         },
            //         u3pos:{
            //             type:Cesium.UniformType.VEC3,
            //             value:polygonPos[2]
            //         },
            //         u4pos:{
            //             type:Cesium.UniformType.VEC3,
            //             value:polygonPos[3]
            //         }
            //     },
            //     vertexShaderText:`
            //     void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            //          vec3 p = vsOutput.positionMC;
            //          float px = p.x;
            //          float pz = p.z;

            //           vec4 u1posMC = czm_inverseModel * vec4(u1pos,1.);
            //           vec4 u2posMC = czm_inverseModel * vec4(u2pos,1.);
            //           vec4 u3posMC = czm_inverseModel * vec4(u3pos,1.);
            //           vec4 u4posMC = czm_inverseModel * vec4(u4pos,1.);

            //          bool flag = false;
            //          vec4 tem1;
            //          vec4 tem2;
            //          for(int i=0;i<4;i++){

            //               if(i == 0) {
            //                tem1 = u1posMC;
            //                tem2 = u4posMC;
            //               }
            //               else if(i == 1){
            //                tem1 = u2posMC;
            //                tem2 = u1posMC;
            //                }
            //               else if(i == 2){
            //                tem1 = u3posMC;
            //                tem2 = u2posMC;
            //                }
            //               else {
            //                tem1 = u4posMC;
            //                tem2 = u3posMC;
            //                }

            //              float sx = tem1.x;
            //              float sz = tem1.z;
            //              float tx = tem2.x;
            //              float tz = tem2.z;

            //              if((sx == px && sz ==pz) ||(tx == px && tz ==pz)){
            //                  // return true;
            //                  // return
            //              }

            //              if((sz < pz && tz >= pz) || (sz >= pz && tz < pz)) {

            //                  float x = sx + (pz - sz) * (tx - sx) / (tz - sz);

            //                  if(x == px) {

            //                      // return true;
            //                      // return
            //                  }

            //                  if(x > px) {
            //                      flag = !flag;
            //                  }
            //                   }

            //                       }//for end

            //                       if(flag){
            //                        vsOutput.positionMC.y = tem1.y ;
            //                       }
            //                  }
            //     `

            // })
            console.log(tileset)
            // tileset.customShader = customerShader
        }


        isDrawing = false


    },Cesium.ScreenSpaceEventType.RIGHT_DOWN)

    function draw(){

        isDrawing = true
       

    }

function applyClippingPlanesAndHideOthers(){
    createClippingPlaneEntities(polygonPoints)
};

// 创建裁剪平面实体的函数
function createClippingPlaneEntities(polygon) {
    // 移除旧的裁剪平面实体
    viewer.entities.removeAll();

    var entities = [];
    polygon.forEach(function(p1, i) {
        var p2 = polygon[(i + 1) % polygon.length];
        var entity = createPlaneEntity(p1, p2, i);
        entities.push(entity);
    });

    return entities;
}

// 创建表示单个裁剪平面的实体
function createPlaneEntity(p1, p2, index) {
    var point1 = Cesium.Cartesian3.fromDegrees(p1[0], p1[1]);
    var point2 = Cesium.Cartesian3.fromDegrees(p2[0], p2[1]);

    // 将点抬升到一定的高度
    point1 = Cesium.Cartesian3.add(point1, new Cesium.Cartesian3(0, 0, 100), new Cesium.Cartesian3());
    point2 = Cesium.Cartesian3.add(point2, new Cesium.Cartesian3(0, 0, 100), new Cesium.Cartesian3());

    // 创建一个垂直于地面的平面
    var normal = new Cesium.Cartesian3(0.0, 0.0, 1.0); // 垂直于地面的法线
    var distance = -Cesium.Cartesian3.dot(normal, point1); // 距离

    // 创建实体并添加到场景中
    var entity = viewer.entities.add({
        id: 'clippingPlane_' + index, // 确保每个实体都有唯一的ID
        polygon : {
            hierarchy : [point1, point2],
            material : Cesium.Color.RED.withAlpha(0.5),
            outline : true,
            outlineColor : Cesium.Color.BLACK
        }
    });

    console.log('Created clipping plane entity:', entity);

    return entity;
}

// 调用代码
polygonPoints = polygonPos;
var clippingPlaneEntities = createClippingPlaneEntities(polygonPoints);

// 强制场景更新
viewer.scene.requestRender();




    
    // 调用函数，应用裁剪平面并隐藏其他模型
    // applyClippingPlanesAndHideOthers();


    function remove(){
        console.log('清除')
        isDrawing = false
        polygonPos =[]
        points.forEach(
            item=>{
                viewer.entities.remove(item)
            }
        )
        points =[]
        viewer.entities.remove(polygon)
        polygon = undefined
    }

    document.getElementById('draw').onclick = function (){
        draw()
    }
    document.getElementById('remove').onclick = function (){
        remove()
    }



//加载模型代码   首先模型转换，然后是加载
//加载之后尝试定位及调试大小代码
//然后设计开关加载和取消模型

//公教二经纬海拔 114.613717   30.461309  30.99

let sourcepoints=null;
let featurepoints=null;
let mesh_1=null;
let polymesh=null;
let texturemesh=null;
let segpoint=null;
var box=[]
var tilesModelObj=[]
var labels=[]

window.onload=function(){
    // window.sourcepoints=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url: '../../sp/sourcepoints/tileset.json',
    //     modelMatrix: Cesium.Matrix4.fromArray(
    //     [0.9998503272726612,-0.013705064737410178,0.01055908392312263,0,
    //     0.013837537004817352,0.9998251605952196,-0.012576597726820071,0,
    //     -0.010384874693151969,0.012720827067660478,0.9998651583770293,0,
    //     -184956.33661949774,1680738.4427380064,-2842750.3556499034,1]),
    // }));
    sourcepoints=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: '../../sp/po/tileset.json',
        modelMatrix: Cesium.Matrix4.fromArray(
            [0.9999435868317672,-0.00868010159007579,0.0061220086904817395,0,
            0.008754220242164823,0.9998874278951718,-0.01218585922816734,0,
            -0.006015545027015484,0.012238765197641277,0.9999070085985322,0,
            -195153.54311457113-12+3.5+0.7,1693979.0284326258+15-7.5-1.5,-2853531.6325311265+16-5-1,1]),
        color:Cesium.Color.c
      }));


      sourcepoints.show=false;
    sourcepoints.color=Cesium.Color.RED
    sourcepoints.outlinecolor=Cesium.Color.RED
    console.log(sourcepoints)
    featurepoints=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: '../../sp/featurepoints/tileset.json',
        modelMatrix: Cesium.Matrix4.fromArray(
            [0.9999435868317672,-0.00868010159007579,0.0061220086904817395,0,
            0.008754220242164823,0.9998874278951718,-0.01218585922816734,0,
            -0.006015545027015484,0.012238765197641277,0.9999070085985322,0,
            -195153.54311457113-16+3.5+0.7,1693979.0284326258+15-7.5-1.5,-2853531.6325311265+16-5-1,1]),
      }));

    segpoint=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: '../../sp/pointseg/tileset.json',
        modelMatrix: Cesium.Matrix4.fromArray([0.9999862353937847,0.001706246357318697,-0.00496162738773831,0,
            -0.001791224004934977,0.9998509240951556,-0.01717326709244532,0,
            0.00493158590422646,0.01718191809526637,0.999840217810344,0,
            -228276.62795425951-3.5-5,1685450.5765842055+7.5,-2860217.1290091104+5+5,1]),
      }));
      segpoint.show=false;

      featurepoints.show=false;
      console.log(featurepoints)



      models.allModels.push(sourcepoints)
      models.allModels.push(featurepoints)
      models.allModels.push(segpoint)


      
    //   texreconroom2=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url: '../../Data/glb/texreconroom2.glb',
    //     modelMatrix: Cesium.Matrix4.fromArray([0.9999862353937847,0.001706246357318697,-0.00496162738773831,0,
    //         -0.001791224004934977,0.9998509240951556,-0.01717326709244532,0,
    //         0.00493158590422646,0.01718191809526637,0.999840217810344,0,
    //         -228276.62795425951-3.5-5,1685450.5765842055+7.5,-2860217.1290091104+5+5,1]),
    //   }));
    //   texreconroom2.show=false;
    //   room2polymest=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //       url: '../../Data/glb/room2polymesh.glb',
    //       modelMatrix: Cesium.Matrix4.fromArray([0.9999862353937847,0.001706246357318697,-0.00496162738773831,0,
    //           -0.001791224004934977,0.9998509240951556,-0.01717326709244532,0,
    //           0.00493158590422646,0.01718191809526637,0.999840217810344,0,
    //           -228276.62795425951-3.5-5,1685450.5765842055+7.5,-2860217.1290091104+5+5,1]),
    //     }));
    //     room2polymest.show=false;
    //     room2mesh=viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //         url: '../../Data/glb/room2mesh.glb',
    //         modelMatrix: Cesium.Matrix4.fromArray([0.9999862353937847,0.001706246357318697,-0.00496162738773831,0,
    //             -0.001791224004934977,0.9998509240951556,-0.01717326709244532,0,
    //             0.00493158590422646,0.01718191809526637,0.999840217810344,0,
    //             -228276.62795425951-3.5-5,1685450.5765842055+7.5,-2860217.1290091104+5+5,1]),
    //       }));
    //       room2mesh.show=false;


    //   models.allModels.push(texreconroom2)
    //   models.allModels.push(room2polymest)
    //   models.allModels.push(room2mesh)

    //   let url="../../Data/glb/texreconroom2.glb";
    //   var point = {lng:'114.614005', lat:'30.46131', alt: '30.0'};
    //   let name="texreconmodel"
    //   models.allModels.push(loadtexturemesh ({url, name, point}))

    //   let url1="../../Data/glb/room2polymesh.glb";
    //   let point = {lng:'114.614007', lat:'30.46131', alt: '30.0'};
    //   let name1="polymesh1"
    //   models.allModels.push(loadpolymesh ({url1, name1, point}))

      
    //   let url2="../../Data/glb/room2mesh.glb";
    //   let point = {lng:'114.613635', lat:'30.461319', alt: '30.0'};
    //   let name2="sourcemesh"
    //   models.allModels.push(loadsourcemesh ({url2, name2, point}))



    //viewer.zoomTo(featurepoints);
    //viewer.flyTo(new Cesium.Cartesian3(-2291846.3187396456, 5002840.426294248, 3214675.4110517525))
    viewer.scene.camera.flyTo({
        destination: new Cesium.Cartesian3(-2291846.3187396456, 5002840.426294248, 3214675.4110517525), // 世界坐标点
    })
    
    // window.parent.vi=viewer;

    var boxposition=[[-2291790.265484999, 5002559.638910333, 3214572.442784249,177,90,80,60],
    [-2291819.9407433993, 5002599.883172784, 3214489.5844062134,177,90,80,60],
    [-2291674.6056600525, 5002616.962399653, 3214568.6215528524,177,90,80,60],
    [-2291698.5366263846, 5002660.735031598, 3214482.763478418,177,90,80,60],
    [-2291653.144798633, 5002596.435373899, 3214667.4124899576,177,90,80,60],
    [-2291779.607604019, 5002513.200587724,3214668.491043824,177,90,80,60],
    [-2291862.183468501, 5002473.656521746, 3214674.56393683,177,90,80,60]]

    var tilesMod=[[90, 80, 58.2],[90, 80, 58.7],[90, 80, 58.7],[90, 80, 58.7],[90, 85, 110],[90, 80, 72],[90, 80, 75]]

    var labeldata=[["宗道楼（公共教学楼二）"],["致知楼（公共教学楼二）"],["崇实楼"],["崇慧楼"],["正心楼（教学服务中心）"],["崇智楼（计算机学院）"],["崇义楼（地理与信息工程学院）"]]
    var i=0;
    for(i=0;i<boxposition.length;i++)
    {
        box[i] = new Cesium.Entity({
            id:i,
            name:"box",
            position: new Cesium.Cartesian3(boxposition[i][0], boxposition[i][1], boxposition[i][2]), //位置
            orientation: Cesium.Transforms.headingPitchRollQuaternion(
                new Cesium.Cartesian3(boxposition[i][0], boxposition[i][1], boxposition[i][2]),
                new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(boxposition[i][3]), Cesium.Math.toRadians(0), Cesium.Math.toRadians(0))),
            box: {
              dimensions: new Cesium.Cartesian3(boxposition[i][4], boxposition[i][5], boxposition[i][6]), //盒子的长宽高
              material: Cesium.Color.WHITE.withAlpha(0.01), //盒子颜色
              outline: false, //边框
              outlineColor: Cesium.Color.WHITE, //边框颜色
            },
          });
        viewer.entities.add(box[i]);
    }

    for(i=0;i<tilesMod.length;i++)
    {
        var center = new Cesium.Cartesian3(boxposition[i][0]-10.5, boxposition[i][1]+22.5, boxposition[i][2]+15)
        var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center)
        tilesModelObj[i] = viewer.scene.primitives.add(
            new Cesium.ClassificationPrimitive({
              geometryInstances: new Cesium.GeometryInstance({
                geometry: Cesium.BoxGeometry.fromDimensions({
                  vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                  // 第一个参数是遮罩的整体横向长度，第二个参数是竖向长度，第三个参数是整体高度
                  dimensions: new Cesium.Cartesian3(Number(tilesMod[i][0]), Number(tilesMod[i][1]), Number(tilesMod[i][2]))
                }),
                modelMatrix: modelMatrix,
                attributes: {
                  color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    Cesium.Color.fromCssColorString('#F26419').withAlpha(0.5)
                  ),
                  show: new Cesium.ShowGeometryInstanceAttribute(true)
                },
                id: 'volume 1'
              }),
              classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
            })
          )
        tilesModelObj[i].show=false;
    }
    console.log(boxposition.length);
    for(i=0;i<boxposition.length;i++)
    {
        labels[i]=viewer.entities.add({
            name: "label",
            position:  new Cesium.Cartesian3(boxposition[i][0], boxposition[i][1], boxposition[i][2]),
            label: { //文字标签
                text: labeldata[i][0],
                font: '500 30px Helvetica',// 15pt monospace
                scale: 0.6,
                show: true,
                style: Cesium.LabelStyle.FILL,
                fillColor: Cesium.Color.WHITE,
                //pixelOffset: new Cesium.Cartesian2(0, -75), //偏移量
                showBackground: true,
                backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
        })
        labels[i].show=false;
    }

}
var cer=null

var handopen=false;

function dantihua()
{
    if(handopen)
    {
        handopen=false;
        handlerk.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
    }else
    {
        handopen=true;
        hand()
    }
}
var handlerk 
hand=function hand(){
    handlerk = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handlerk.setInputAction(function (movement) {
        //console.log(pickedEntity)
        var pick = viewer.scene.pick(movement.position);  //获取的pick对象
        var pickedEntity = Cesium.defined(pick) ? pick.id : undefined; //pick.id即为entity
        if(pickedEntity)
        {
            if(pickedEntity.name=="box")
            {
                if(cer==pickedEntity.id)
                {
                    labels[cer].show=true
                }else
                {
                    if(cer!=null){
                        tilesModelObj[cer].show=false;
                        labels[cer].show=false;
                    } 
                    cer=pickedEntity.id;
                    tilesModelObj[cer].show=true;
                }
            }
        }  
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
}

function yuanshi(){
    console.log(sourcepoints)
    sourcepoints.show=true
    ceralg=1;
}
function tezheng(){
    console.log(featurepoints)
    featurepoints.show=true
    ceralg=2;
}

function sega(){
    segpoint.show=true
    ceralg=6;
}

function back(){
    console.log(document.location)
    //document.location.href = '../../'
    window.history.back(-1);
}

function outmap(){
    viewer.render();
    scene=viewer.scene;
    saveToFile(scene);
}

var ceralg=null
function comparepic(){
     /*var i=0;
     if(sourcepoints.show) i=1;
     if(featurepoints.show) i=2;
     if(mesh_1.model.show) i=3;
     if(polymesh.model.show) i=4;
     if(texturemesh.model.show) i=5;
     if(segpoint.show) i=6;*/
    if(ceralg)
    {
        ifadata=["i","i","i","i","v","i"]
        ifa=window.parent.document.getElementById("cht");
        ifa.src="result.html?"+String(ceralg)+ifadata[ceralg-1];
        ifa.style.display="block"
    }
}

function saveToFile(scene) {
    let canvas = scene.canvas;
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement("a");
    let blob = dataURLtoBlob(image);
    let objurl = URL.createObjectURL(blob);
    link.download = "scene.png";
    link.href = objurl;
    link.click();

}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// //原始点云加载
// function loadpolymesh ({url, name, point}) {
//     let position = Cesium.Cartesian3.fromDegrees(
//         point.lng,
//         point.lat,
//         point.alt
//         );
//          //弧度的航向分量。
//         let heading = Cesium.Math.toRadians(87);
//         //弧度的螺距分量。
//         let pitch = 0;
//         //滚动分量（以弧度为单位）
//         let roll = 0;
//         //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
//         let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
//         let orientation = Cesium.Transforms.headingPitchRollQuaternion(
//             position,
//             hpr
//         );
    
//         polymesh=viewer.entities.add({
//             name,
//             position,
//             orientation: orientation,
//             model: {
//                 scale: 18.5,
//                 uri: url,
//                 //不管缩放如何，模型的最小最小像素大小。
//                 // minimumPixelSize: 226,
//                 // // //模型的最大比例尺大小。 minimumPixelSize的上限。
//                 // maximumScale: 300,
//                 // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
//                 // // color: Cesium.Color.WHITE
//                  minimumPixelSize: 144,
//                  maximumSize: 158,
//                  // 设置模型最大放大大小
//                  maximumScale: 800,
//                  // 模型是否可见
//                  show: true,
//                  // 模型轮廓颜色
//                 silhouetteColor: Cesium.Color.WHITE,
//                 // 模型颜色  ，这里可以设置颜色的变化
//                 // color: color,
//                 // 仅用于调试，显示魔仙绘制时的线框
//                 debugWireframe: false,
//                 // 仅用于调试。显示模型绘制时的边界球。
//                 debugShowBoundingVolume: false,
//              },
//         });
//     }
// //触发dom事件 
//     document.getElementById('polymeshdom').onclick = function (){
          
//         if(polymesh){
//             polymesh.model.show=true;
//         }
//         else{
//             let url="/zjl/Data/glb/room2polymesh.glb";
//             var point = {lng:'114.614007', lat:'30.46131', alt: '30.0'};
//             let name="polymesh1"
//             loadpolymesh ({url, name, point})
//         }
        
//     }   



// //特征点云加载
// function loadpolymesh ({url, name, point}) {
//     let position = Cesium.Cartesian3.fromDegrees(
//         point.lng,
//         point.lat,
//         point.alt
//         );
//          //弧度的航向分量。
//         let heading = Cesium.Math.toRadians(87);
//         //弧度的螺距分量。
//         let pitch = 0;
//         //滚动分量（以弧度为单位）
//         let roll = 0;
//         //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
//         let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
//         let orientation = Cesium.Transforms.headingPitchRollQuaternion(
//             position,
//             hpr
//         );
    
//         polymesh=viewer.entities.add({
//             name,
//             position,
//             orientation: orientation,
//             model: {
//                 scale: 18.5,
//                 uri: url,
//                 //不管缩放如何，模型的最小最小像素大小。
//                 // minimumPixelSize: 226,
//                 // // //模型的最大比例尺大小。 minimumPixelSize的上限。
//                 // maximumScale: 300,
//                 // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
//                 // // color: Cesium.Color.WHITE
//                  minimumPixelSize: 144,
//                  maximumSize: 158,
//                  // 设置模型最大放大大小
//                  maximumScale: 800,
//                  // 模型是否可见
//                  show: true,
//                  // 模型轮廓颜色
//                 silhouetteColor: Cesium.Color.WHITE,
//                 // 模型颜色  ，这里可以设置颜色的变化
//                 // color: color,
//                 // 仅用于调试，显示魔仙绘制时的线框
//                 debugWireframe: false,
//                 // 仅用于调试。显示模型绘制时的边界球。
//                 debugShowBoundingVolume: false,
//              },
//         });
//     }
// //触发dom事件 
//     document.getElementById('polymeshdom').onclick = function (){
          
//         if(polymesh){
//             polymesh.model.show=true;
//         }
//         else{
//             let url="/zjl/Data/glb/room2polymesh.glb";
//             var point = {lng:'114.614007', lat:'30.46131', alt: '30.0'};
//             let name="polymesh1"
//             loadpolymesh ({url, name, point})
//         }
        
//     }   




//重建数据加载
function loadsourcemesh ({url, name, point}) {
    let position = Cesium.Cartesian3.fromDegrees(
        point.lng,
        point.lat,
        point.alt
        );
         //弧度的航向分量。
        let heading = Cesium.Math.toRadians(87);
        //弧度的螺距分量。
        let pitch = 0;
        //滚动分量（以弧度为单位）
        let roll = 0;
        //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
        let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
        );
    
        mesh_1=viewer.entities.add({    
            name,
            position,
            orientation: orientation,
            model: {
                scale: 1,
                uri: url,
                //不管缩放如何，模型的最小最小像素大小。
                // minimumPixelSize: 226,
                // // //模型的最大比例尺大小。 minimumPixelSize的上限。
                // maximumScale: 300,
                // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                // // color: Cesium.Color.WHITE
                 minimumPixelSize: 144,
                 maximumSize: 158,
                 // 设置模型最大放大大小
                 maximumScale: 800,
                 // 模型是否可见
                 show: true,
                 // 模型轮廓颜色
                silhouetteColor: Cesium.Color.WHITE,
                // 模型颜色  ，这里可以设置颜色的变化
                color: Cesium.Color.AQUA,
                // 仅用于调试，显示魔仙绘制时的线框
                debugWireframe: false,
                // 仅用于调试。显示模型绘制时的边界球。
                debugShowBoundingVolume: false,
             },
        });
    }
//触发dom事件 
    document.getElementById('meshdom').onclick = function (){
          
        if(mesh_1){
            mesh_1.model.show=true;
        }
        else{
            let url="../../Data/glb/room2mesh.glb";
            var point = {lng:'114.613635', lat:'30.461319', alt: '30.0'};
            let name="sourcemesh"
            loadsourcemesh ({url, name, point})
        }
        ceralg=3;
        
    }   





//矢量网格加载
    function loadpolymesh ({url, name, point}) {
    let position = Cesium.Cartesian3.fromDegrees(
        point.lng,
        point.lat,
        point.alt
        );
         //弧度的航向分量。
        let heading = Cesium.Math.toRadians(87);
        //弧度的螺距分量。
        let pitch = 0;
        //滚动分量（以弧度为单位）
        let roll = 0;
        //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
        let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
        );
    
        polymesh=viewer.entities.add({
            name,
            position,
            orientation: orientation,
            model: {
                scale: 18.5,
                uri: url,
                //不管缩放如何，模型的最小最小像素大小。
                // minimumPixelSize: 226,
                // // //模型的最大比例尺大小。 minimumPixelSize的上限。
                // maximumScale: 300,
                // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                // // color: Cesium.Color.WHITE
                 minimumPixelSize: 144,
                 maximumSize: 158,
                 // 设置模型最大放大大小
                 maximumScale: 800,
                 // 模型是否可见
                 show: true,
                 // 模型轮廓颜色
                silhouetteColor: Cesium.Color.WHITE,
                // 模型颜色  ，这里可以设置颜色的变化
                 color: Cesium.Color.AQUA,
                // 仅用于调试，显示魔仙绘制时的线框
                debugWireframe: true,
                // 仅用于调试。显示模型绘制时的边界球。
                debugShowBoundingVolume: false
                
             },
        });
        viewer.render();
    }
//触发dom事件 
    document.getElementById('polymeshdom').onclick = function (){
          
        if(polymesh){
            polymesh.model.show=true;
        }
        else{
            let url="../../Data/glb/room2polymesh.glb";
            var point = {lng:'114.614007', lat:'30.46131', alt: '30.0'};
            let name="polymesh1"
            loadpolymesh ({url, name, point})
        }
        ceralg=4;
        
    }   
        



//纹理映射算法模型加载
    function loadtexturemesh ({url, name, point}) {
    let position = Cesium.Cartesian3.fromDegrees(
        point.lng,
        point.lat,
        point.alt
        );
         //弧度的航向分量。
        let heading = Cesium.Math.toRadians(87);
        //弧度的螺距分量。
        let pitch = 0;
        //滚动分量（以弧度为单位）
        let roll = 0;
        //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
        let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        let orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
        );
    
        texturemesh=viewer.entities.add({
            name,
            position,
            orientation: orientation,
            model: {
                scale: 18.5,
                uri: url,
                //不管缩放如何，模型的最小最小像素大小。
                // minimumPixelSize: 226,
                // // //模型的最大比例尺大小。 minimumPixelSize的上限。
                // maximumScale: 300,
                // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                // // color: Cesium.Color.WHITE
                 minimumPixelSize: 144,
                 maximumSize: 158,
                 // 设置模型最大放大大小
                 maximumScale: 800,
                 // 模型是否可见
                 show: true,
                 // 模型轮廓颜色
                silhouetteColor: Cesium.Color.WHITE,
                // 模型颜色  ，这里可以设置颜色的变化
                // color: color,
                // 仅用于调试，显示魔仙绘制时的线框
                debugWireframe: false,
                // 仅用于调试。显示模型绘制时的边界球。
                debugShowBoundingVolume: false,
             },
        });
        return texturemesh
    }
//触发dom事件 
    document.getElementById('texturemeshdom').onclick = function (){
         
            if(texturemesh){
                texturemesh.model.show=true;
            }
            else{
                let url="../../Data/glb/texreconroom2.glb";
                var point = {lng:'114.614005', lat:'30.46131', alt: '30.0'};
                let name="texreconmodel"
                loadtexturemesh ({url, name, point})
            }
            ceralg=5
    } 




    //模型消除功能
    document.getElementById('modelfalse').onclick = function (){
            
         
            if(sourcepoints)
            sourcepoints.show=false;

            if(featurepoints)
            featurepoints.show=false;

            if(mesh_1)
            mesh_1.model.show=false;

            if(polymesh)
            polymesh.model.show=false;

            if(texturemesh)
            texturemesh.model.show=false;

            if(segpoint)
            segpoint.show=false;

            if(cer!=null){
                tilesModelObj[cer].show=false;
                labels[cer].show=false;
            } 
    } 
            


//测试代码  测试位置114.61288  30.461704  30.75
//114.613654,30.461316,30.5  建筑地理中心位置

            //测试glb模型代码
            // let position = Cesium.Cartesian3.fromDegrees(
            //     114.61288,
            //     30.461704,
            //     30.75
            //     );
                
            //      //弧度的航向分量。Z
            //     let heading = Cesium.Math.toRadians(0);
            //     //弧度的螺距分量。Y
            //     let pitch = 0;
            //     //滚动分量（以弧度为单位）X
            //     let roll = 0;
            //     //HeadingPitchRoll旋转表示为航向，俯仰和滚动。围绕Z轴。节距是绕负y轴的旋转。滚动是关于正x轴。
            //     let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            //     let orientation = Cesium.Transforms.headingPitchRollQuaternion(
            //         position,
            //         hpr
            //     );

            //     let name='room2';

            //     viewer.entities.add({
            //         name,
            //         position,
            //         orientation: orientation,
            //         model: {
            //             scale: 10.0,
            //             uri: '/zjl/Data/glb/feature.glb',
            //             //不管缩放如何，模型的最小最小像素大小。
            //             // minimumPixelSize: 226,
            //             // // //模型的最大比例尺大小。 minimumPixelSize的上限。
            //             // maximumScale: 300,
            //             // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            //             // // color: Cesium.Color.WHITE
            //              minimumPixelSize: 144,
            //              maximumSize: 158,
            //              // 设置模型最大放大大小
            //              maximumScale: 800,
            //              // 模型是否可见
            //              show: true,
            //              // 模型轮廓颜色
            //             silhouetteColor: Cesium.Color.WHITE,
            //             // 模型颜色  ，这里可以设置颜色的变化
            //            // color: red,
            //             // 仅用于调试，显示魔仙绘制时的线框
            //             debugWireframe: false,
            //             // 仅用于调试。显示模型绘制时的边界球。
            //             debugShowBoundingVolume: false,
            //          },
            //     });


            // let tileset2 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            //     url: '/zjl/Data/Pointsset/sourcepoints/tileset.json'
            // }));

            //cesium点云代码加载
            // viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            //     url: '/zjl/Data/Pointsset/sourcepoints/tileset.json',
            //     modelMatrix: Cesium.Matrix4.fromArray(
            //         [0.9999435868317672,-0.00868010159007579,0.0061220086904817395,0,
            //             0.008754220242164823,0.9998874278951718,-0.01218585922816734,0,
            //             -0.006015545027015484,0.012238765197641277,0.9999070085985322,0,
            //             -195153.54311457113,1693979.0284326258,-2853531.6325311265,1]),
            //   }));
        


               
             





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