var num=-18

function childopen(ht,ifram,url){
    // if(opening!=null)clearInterval(opening);
    // if(ht==null) var ifa=document.getElementById(ifram);
    // else var ifa=ht.document.getElementById(ifram);
    // ifa.style.display="block";
    // ifa.src=url;
    // num=-18;
    // ifa.style.right=String(num)+"%";
    
    // var opening=setInterval(function(){
    //     ifa.style.right=String(num)+"%";
    //     num+=0.5;
    //     if(num>=0.0)
    //     {
    //         clearInterval(opening);
    //     }
    // },25)
    if (ifram=="newht") window.appk.externalUrl=url;
}


var kds;
//var window.meda['road'];
drawroa= function drawroa(type){
    var kds;
    var polilinelist=[];
    viewer=window.vi;
    console.log("viewer:",viewer)
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    var st=true;
    var kp=-2;
    var drawmo=true;
    handler.setInputAction( function (click) {
        console.log("开始绘制");
       // var pick = viewer.scene.pick(click.position);
        //let ray = viewer.camera.getPickRay(click.position);//获取一条射线
        //let position = viewer.scene.globe.pick(ray, viewer.scene);
        var position = viewer.scene.pickPosition(click.position);
        console.log("position:",position)
        //r=pick.primitive.boundingSphere.radius;
        //c=pick.primitive.boundingSphere.center;
        k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
        k.x=position.x//-14;
        k.y=position.y///+30;
        k.z=position.z//+20;
        console.log("k:",k)
        polilinelist.push(k);
        console.log("polilinelist:",polilinelist);
        kp++;
        var kd=null;
        var kx;
        var cer=new Cesium.Cartesian3(0.0, 0.01, 0.25);
        //
        
        var restring
        //var iframe = document.getElementById('newht')
        //var reshow=iframe.querySelector("btresult")
        var reshow=window.frames['newht'].contentWindow.document.getElementById('btresult')
        //console.log(reshow.innerText)

        if(drawmo)
        {
            kd=viewer.entities.add({
                position:new Cesium.CallbackProperty(()=>{
                    var ans=new Cesium.Cartesian3(0.0, 0.01, 0.25);
                    ans.x=(polilinelist[kp+1].x+cer.x)/2;
                    ans.y=(polilinelist[kp+1].y+cer.y)/2;
                    ans.z=(polilinelist[kp+1].z+cer.z)/2;
                    //[polilinelist[kp+1],cer];
                    return ans;
                }, false),
                label:{
                    text:new Cesium.CallbackProperty(()=>{
                        switch(type){
                            case 0: {
                                restring=String((parseFloat(Cesium.Cartesian3.distance(polilinelist[kp+1],cer))/window.danwei["shuzhi"]).toFixed(2))+window.danwei["mingcheng"]
                                reshow.innerText=restring
                                return restring
                                break;
                            }
                            case 1:{
                                var pol=new Cesium.Cartesian3(0.0, 0.01, 0);
                                pol.x=polilinelist[kp+1].x;
                                pol.y=polilinelist[kp+1].y;
                                var cel=new Cesium.Cartesian3(0.0, 0.01, 0);
                                cel.x=cer.x;
                                cel.y=cer.y;
                                restring=String((parseFloat(Cesium.Cartesian3.distance(pol,cel))/window.danwei["shuzhi"]).toFixed(2))+window.danwei["mingcheng"];
                                reshow.innerText=restring
                                return restring
                                break;
                            }
                            case 2:{
                                var pol=new Cesium.Cartesian3(0.0, 0.0, 0.1);
                                pol.z=polilinelist[kp+1].z;
                                var cel=new Cesium.Cartesian3(0.0, 0.0, 0.1);
                                cel.z=cer.z;
                                restring=String((parseFloat(Cesium.Cartesian3.distance(pol,cel))/window.danwei["shuzhi"]).toFixed(2))+window.danwei["mingcheng"];
                                reshow.innerText=restring
                                return restring
                                break;
                            }
                            case 3:{
                                if(polilinelist.length>1)
                                {
                                    var c1 = Cesium.Cartesian3.subtract(cer, polilinelist[kp+1], new Cesium.Cartesian3());
                                    var c2 = Cesium.Cartesian3.subtract(polilinelist[kp], polilinelist[kp+1], new Cesium.Cartesian3());
                                    var angle = Cesium.Cartesian3.angleBetween(c1, c2);
                                    console.log(angle) 
                                    restring="角度："+String((angle/3.1514926535*180).toFixed(2));
                                    reshow.innerText=restring
                                    return restring
                                    break;
                                }
                            }
                        }
                    }, false),
                    show:true,
                    font: '500 30px Helvetica',// 15pt monospace
                    //disableDepthTestDistance: Number.POSITIVE_INFINITY
                },
                name: "moving",
                polyline:{
                    show: true, // 线是否可见
                    //positions: [polilinelist[kp+1],polilinelist[kp+1]], // 格式为世界坐标的线位置数组
                    positions: new Cesium.CallbackProperty(()=>{
                        //[polilinelist[kp+1],cer];
                        return [polilinelist[kp+1],cer];
                    }, false),
                    width: 3, // 线的宽度
                    material: Cesium.Color.YELLOW, // 线的颜色
                    clampToGround: true, // 线是否固定在地面
                },
            })
            console.log(kd);
            drawmo=false;
            
            handler.setInputAction( function (movement) {
                const cartesian = viewer.scene.pickPosition(movement.endPosition); 
                cer=cartesian;
                //kd.polyline.position=[polilinelist[kp+1],cartesian]
            },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            
            handler.setInputAction( function (click) {
                console.log("清除");
                viewer.entities.remove(kd);
                viewer.entities.remove(kx);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
            },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
        }

        if(polilinelist.length>1)
        {
            viewer.entities.remove(kd);
            if(kx!=null)viewer.entities.remove(kx);
            kx=viewer.entities.add({
                name: String(kp+1),
                polyline:{
                    show: true, // 线是否可见
                    //positions: [polilinelist[kp],polilinelist[kp+1]], // 格式为世界坐标的线位置数组
                    positions: polilinelist,
                    width: 3, // 线的宽度
                    material: Cesium.Color.YELLOW, // 线的颜色
                    //material: Color.WHITE, // 线的颜色
                    clampToGround: true, // 线是否固定在地面
                }
            })
            window.meda["road"].push(kx);
            console.log(window.meda)
        }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
},

delda =function delda(){
    viewer=window.vi;
    viewer.entities.remove(kds);
    window.meda["road"].forEach(element => {
        viewer.entities.remove(element);
    });
    window.meda["area"].forEach(element => {
        viewer.entities.remove(element);
    });
    viewer.entities.remove(window.meda["po"]);
    //viewer.entities.remove(window.meda['road']);
}

areamea = function areamea(){
    var kds;
    var polilinelist=[];
    viewer=window.vi;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    var st=true;
    var kp=-2;
    var drawmo=true;
    var poars=[[]]
    var poar=[0.0,0.0,0.0]
    handler.setInputAction( function (click) {
        console.log("开始绘制");
        var position = viewer.scene.pickPosition(click.position);
        console.log("position:",position)
        k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
        k.x=position.x//-14;
        k.y=position.y//+30;
        k.z=position.z//+20;
        polilinelist.push(k);
        poar[0]=k.x;
        poar[1]=k.y;
        poar[2]=k.z;
        poars.push(poar)
        console.log(polilinelist)
        kp++;
        var kd=null;
        var kx;
        var cer=new Cesium.Cartesian3(0.0, 0.01, 0.25);
        
        var restring
        var reshow=window.frames['newht'].contentWindow.document.getElementById('btresult')

        var v0,v1,cross
        if(polilinelist.length>1)
        {
            if(drawmo)
            {
                kd=viewer.entities.add({
                    name: "面",
                    polygon: {
                        hierarchy: new Cesium.CallbackProperty(()=>{
                            //poar[0]=cer.x;
                            //poar[1]=cer.y;
                            //poar[2]=cer.z;
                            //restring="面积："+String(triangleArea(cer.x,cer.y,cer.z))
                            var le=polilinelist.length;
                            var i=2;
                            var ans=0
                            for(i=1;i<le;i++)
                            {
                                v0=Cesium.Cartesian3.subtract(polilinelist[0],polilinelist[le-1],new Cesium.Cartesian3())
                                v1=Cesium.Cartesian3.subtract(polilinelist[0],cer,new Cesium.Cartesian3())//计算叉积
                                cross=Cesium.Cartesian3.cross(v0,v1,v0)
                                ans+=Cesium.Cartesian3.magnitude(cross)*0.5
                            }
                            restring="面积："+String(((ans+Cesium.Cartesian3.magnitude(cross)*0.5)/window.danwei["shuzhi"]/window.danwei["shuzhi"]/10).toFixed(2))+"平方"+window.danwei["mingcheng"];
                            reshow.innerText=restring;
                            return new Cesium.PolygonHierarchy(polilinelist.concat(cer));
                        }, false),	// 点位置数组
                        material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),
                        // 面颜色
                    },
                })
                window.meda["area"].push(kd);
                drawmo=false;
                
                handler.setInputAction( function (movement) {
                    //console.log("移动");
                    const cartesian = viewer.scene.pickPosition(movement.endPosition); 
                    cer=cartesian;
                },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                
                handler.setInputAction( function (click) {
                    kd.polygon.hierarchy=new Cesium.PolygonHierarchy(polilinelist.concat(cer));
                    //viewer.entities.remove(kd);
                    //viewer.entities.remove(kx);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
                },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
}

positionmea = function positionmea(){
    viewer=window.vi;
    var movp
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction( function (click) {
        var restring
        var reshow=window.frames['newht'].contentWindow.document.getElementById('btresult')
        var position = viewer.scene.pickPosition(click.position);
        k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
        k.x=position.x-14;
        k.y=position.y+30;
        k.z=position.z+20;
        if(window.meda["po"]==null)
        {
            movp=position;
            window.meda["po"]=viewer.entities.add({
                name:"点",
                position:movp,
                point:{
                    show:true,
                    pixelSize :10,
                    color:Cesium.Color.WHITE,
                    outlineColor :Cesium.Color.BLACK,
                    outlineWidth : 2,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                },
            },false)
        }
        else{
            movp=position;
            window.meda["po"].position=movp;
        }
        restring="该点坐标：("+String(movp.x.toFixed(2))+","+String(movp.y.toFixed(2))+","+String(movp.z.toFixed(2))+")";
        reshow.innerText=restring;
        //"该点坐标：("+String(movp.x)+","+String(movp.y)+","+String(movp.z)+")"
        handler.setInputAction( function (click) {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_DOWN);
        },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
}

cha = function cha(na){
    console.log(na)
    switch(na){
        case 0:{
            window.danwei["shuzhi"]=1;
            window.danwei["mingcheng"]="米";
            break
        }
        case 1:{
            window.danwei["shuzhi"]=1;
            window.danwei["mingcheng"]="米";
            break
        }
        case 2:{
            window.danwei["shuzhi"]=100;
            window.danwei["mingcheng"]="百米";
            break
        }
        case 3:{
            window.danwei["shuzhi"]=1000;
            window.danwei["mingcheng"]="千米";
            break
        }
    }
}


function moveOnRoute() {
    var viewer=window.vi;
    var lineEntity=window.parking["roadline"]
    console.log("0")
    console.log(lineEntity)
    if (!lineEntity) return;
    var positions = lineEntity.polyline.positions.getValue();
    console.log('positions',positions);
    if (!positions) return;

    var allDis = 0;
    for (var index = 0; index < positions.length - 1; index++) {
      var dis = Cesium.Cartesian3.distance(positions[index], positions[index + 1]);
      allDis += dis;
    }

    var playTime = 20; //控制速度

    var v = allDis / playTime;
    var startTime = viewer.clock.currentTime;
    var endTime = Cesium.JulianDate.addSeconds(startTime, playTime, new Cesium.JulianDate());
    var property = new Cesium.SampledPositionProperty();
    var t = 0;
    for (var i = 1; i < positions.length; i++) {
      if (i == 1) {
        property.addSample(startTime, positions[0]);
      }
      var dis = Cesium.Cartesian3.distance(positions[i], positions[i - 1]);
      var time = dis / v + t;
      var julianDate = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
      property.addSample(julianDate, positions[i]);
      t += dis / v;
    }

    var kjulianDate = Cesium.JulianDate.addDays(startTime, 1, new Cesium.JulianDate());
    console.log(kjulianDate)
    property.addSample(kjulianDate, positions[positions.length-1]);
    if(window.parking["movingcar"]==null)
    {
        window.parking["movingcar"]=viewer.entities.add({
          //position: property,
          orientation: new Cesium.VelocityOrientationProperty(property),
          model: {
            uri: "./CesiumMilkTruck/CesiumMilkTruck.glb",
            minimumPixelSize: 25,
            maximumScale: 10,
            scale:0.005,
            //scale: 20,
            //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          }
    
        });
        window.parking["movingcar"].position=property;
    }
    else
    {
        console.log(window.parking["movingcar"].position);
        //window.parking["movingcar"].position=positions[0];
        window.parking["movingcar"].position=property;
        window.parking["movingcar"].orientation= new Cesium.VelocityOrientationProperty(property);
    }
    viewer.clock.currentTime = startTime;
    viewer.clock.multiplier = 1;
    viewer.clock.shouldAnimate = true;
    viewer.clock.stopTime = endTime;
  }






/*
var c1 = Cesium.Cartesian3.subtract(p2, p1, new Cesium.Cartesian3());
var c2 = Cesium.Cartesian3.subtract(p3, p1, new Cesium.Cartesian3());
var angle = Cesium.Cartesian3.angleBetween(c1, c2); */


/*框架
areamea = function areamea(){
    var kds;
    var polilinelist=[];
    viewer=window.vi;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    var st=true;
    var kp=-2;
    var drawmo=true;
    handler.setInputAction( function (click) {
        console.log("开始绘制");
        let ray = viewer.camera.getPickRay(click.position);//获取一条射线
        let position = viewer.scene.globe.pick(ray, viewer.scene);
        console.log("position:",position)
        k= new Cesium.Cartesian3(0.0, 0.01, 0.25);
        k.x=position.x-14;
        k.y=position.y+30;
        k.z=position.z+20;
        polilinelist.push(k);
        console.log(polilinelist)
        kp++;
        var kd=null;
        var kx;
        var cer=new Cesium.Cartesian3(0.0, 0.01, 0.25);
        
        var restring
        var reshow=window.frames['newht'].contentWindow.document.getElementById('btresult')

        if(polilinelist.length>2)
        {
            console.log("开始划线")
            if(drawmo)
        {
            console.log("添加模型")
                
            drawmo=false;
            
            handler.setInputAction( function (movement) {
                console.log("移动");
            },Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            
            handler.setInputAction( function (click) {
                console.log("清除");
            },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
        }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
}
*/

function water()
{
    var kni = 100;
    // _polygonArr 为polygon的坐标
    _polygonArr = [new Cesium.Cartesian3(-2291227.19 + 14 * kni, 5002730.34 - 30 * kni, 3214719.60 - 20 * kni), new Cesium.Cartesian3(-2291896.40 + 14 * kni, 5002401.10 - 30 * kni, 3214737.93 - 20 * kni), new Cesium.Cartesian3(-2292056.36 + 14 * kni, 5002621.38 - 30 * kni, 3214288.32 - 20 * kni), new Cesium.Cartesian3(-2291448.98 + 14 * kni, 5002861.67 - 30 * kni, 3214357.03 - 20 * kni)];

    // 获取地形高度
    // var terrainHeight = getTerrainHeight(_polygonArr); // 你需要实现这个函数来获取地形高度

    var terrainHeight = 0
    window.waterPrimitive = new Cesium.Primitive({
        allowPicking: false,
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(_polygonArr),
                vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                height: terrainHeight, // 设置底部高度与地形贴合
                extrudedHeight: terrainHeight - 100 // 设置顶部高度为地形下方20米
            })
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: false,
            material: new Cesium.Material({
                fabric: {
                    type: 'Water',
                    uniforms: { 
                        blendColor: new Cesium.Color(0.0, 0.0, 1.0, 0.3), 
                        normalMap: 'images/waterNormalsSmall.jpg',
                        frequency: 200.0,
                        animationSpeed: 0.01,
                        amplitude: 10.0
                    }
                }
            })
        })
    });
    window.waterPrimitive.show = false;
    viewer = window.vi;
    viewer.scene.primitives.add(window.waterPrimitive);
}
