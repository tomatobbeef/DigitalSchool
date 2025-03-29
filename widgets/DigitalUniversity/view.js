
//模块：
var handler 
var positions=[]
var that=this
var swi=false

var list = [[],[]];
var v=[];
var e=[];
var G;

var kis=0;

var kp1=new Cesium.Cartesian3(0,0,0);
var kp2=new Cesium.Cartesian3(0,0,0);

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

var jsondistance = function jsondistance(){
    ele=e.length;
    console.log("ele:",ele);
    var i=0;
    for(i=0;i<ele;i++)
    {
        e[i].p1p=searchid(e[i].p1);
        e[i].p2p=searchid(e[i].p2);
        di=Cesium.Cartesian3.distance(new Cesium.Cartesian3(e[i].p1p[0],e[i].p1p[1],e[i].p1p[2]),new Cesium.Cartesian3(e[i].p2p[0],e[i].p2p[1],e[i].p2p[2]) );
        console.log(di);
        dx=parseFloat(di).toFixed(2);
        e[i].distance=dx;
    };
    console.log(JSON.stringify(e));
    //var blob = new Blob([JSON.stringify(e)],{type: "text/plain;charset=utf-8"});
    //FileSaver.saveAs(blob,'a.json');
    //console.log(new Blob(e.stringify(e), {type: "text/plain;charset=utf-8"}))
    //saveAs(new Blob(json.stringify(e), {type: "text/plain;charset=utf-8"}), "root-org.json");
}

var crpl = function crpl(e)
{
    view=this.view;
    le=e.length;
    var i=kis;
    kis++;
    kis=kis%le;
    {
        console.log(e);
        console.log("e[i]:",e[i]);
        kp1.x=e[i].p1p[0]-1.75;
        kp1.y=e[i].p1p[1]+3.75;
        kp1.z=e[i].p1p[2]+2.5;
        kp2.x=e[i].p2p[0]-1.75;
        kp2.y=e[i].p2p[1]+3.75;
        kp2.z=e[i].p2p[2]+2.5;
        console.log("端点：",kp1,",",kp2);
        /*
        kx=viewer.entities.add({
            name: e.id,
            polyline: {
                show: true, // 线是否可见
                positions: [kp1,kp2], // 格式为世界坐标的线位置数组
                width: 5, // 线的宽度
                //material: Color.WHITE, // 线的颜色
                clampToGround: true, // 线是否固定在地面
            },
        })
        */
        kwx=viewer.entities.add({
            name: e[i].id,
            position: kp1,
            polyline: {
                show: true, // 线是否可见
                positions: [kp1,kp2], // 格式为世界坐标的线位置数组
                width: 5, // 线的宽度
                //material: Color.WHITE, // 线的颜色
                clampToGround: true, // 线是否固定在地面
            },
        })
        //kx.show=false;
        /*
        const lineDataSource = viewer.scene.primitives.add(new Cesium.PolylineCollection());
        lineDataSource.add({
            width: 2,
            positions: [kp1,kp2],
            material: this.Cesium.Material.fromType('Color', {
                color: this.Cesium.Color.fromCssColorString(lineColor),
            }),
        })*/
        console.log(kwx);
        list[1].push(kwx);
        console.log(list[1]);
    }
    if(true||kis!=0)
    {
        //crpl(e)
        setTimeout("crpl(e)",100)
        console.log("制造下一条")
    }else
    {
        list[1].forEach(element => {
            element.show=false;
        });
    }
}

var searchid = function searchid(id){
    ans= new Cesium.Cartesian3(0,0,0);
    le=v.length;
    i=0;
    for(i=0;i<le;i++)
    {
        if(v[i].id==id)
        {
            ans=v[i].position;
            break
        }
    }
    return ans;
}

window.onload=function(){
    viewer=window.parent.vi;
    if(!window.parent.staj)
    {$.ajax({
        url: "data.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            v=data.V;
            e=data.E;
            vle=v.length;
            var i;
            for(i=0;i<vle;i++)
            {
                //console.log(v[i].name,v[i].hide)
                //if(v[i].hide==0){
                axx=true;
                if(v[i].hide==1){
                    axx=false;
                }
                if(true){
                    var kni = 0.7;
                    //console.log(v[i]),
                    // position= new Cesium.Cartesian3(v[i].position[0]-1.75,v[i].position[1]+3.75,v[i].position[2]+2.5),
                    position= new Cesium.Cartesian3(v[i].position[0]+17.5*kni,v[i].position[1]-37.5*kni,v[i].position[2]-25*kni),
                    //console.log(position)
                    kx=viewer.entities.add({
                        name: v[i].name,
                        position: position,
                        billboard:{
                            image: 'widgets/DigitalUniversity/image/dibiao.png',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            scale: 0.1,
                            show: axx,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                        label: { //文字标签
                            text: v[i].name,
                            font: '500 30px Helvetica',// 15pt monospace
                            scale: 0.6,
                            show: axx,
                            style: Cesium.LabelStyle.FILL,
                            fillColor: Cesium.Color.WHITE,
                            //pixelOffset: new Cesium.Cartesian2(0, -75), //偏移量
                            showBackground: axx,
                            backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        },
                    })
                    list[0].push(kx);
                }
            }
            console.log(list[0])

            
            ele=e.length;
            console.log("ele1:",ele)
            for(i=0;i<ele;i++)
            {
                kp1= new Cesium.Cartesian3(e[i].p1p[0]-1.75,e[i].p1p[1]+3.75,e[i].p1p[2]+2.5),
                kp2= new Cesium.Cartesian3(e[i].p2p[0]-1.75,e[i].p2p[1]+3.75,e[i].p2p[2]+2.5),
                //console.log("kp:",[kp1,kp2]);
                kx=viewer.entities.add({
                    name: e[i].id,
                    polyline:{
                        show: true, // 线是否可见
                        positions: [kp1,kp2], // 格式为世界坐标的线位置数组
                        width: 5, // 线的宽度
                        //material: Color.WHITE, // 线的颜色
                        clampToGround: true, // 线是否固定在地面
                    }
                })
                list[1].push(kx);
            }
            window.parent.staj=list;
            
            //jsondistance();
        }
    })}else
    {
        list=window.parent.staj;
    }
}

    //初始化[仅执行1次]

onSwitch= function onSwitch() {
        viewer=window.parent.vi;
        /*
        list[0].forEach(x => {
            x.show=!x.show;
        });*/
        
        list[1].forEach(element => {
            console.log(element);
            if(element.show)
            {
                element.show=false;
            }else
            {
                element.show=true;
            }
        });
    },
pointp = function pointp(options) {
    viewer=window.parent.vi;
    list[0].forEach(x => {
        x.show=!x.show;
    });
},

roadp = function roadp(options) {
    viewer=window.parent.vi;
    list[1].forEach(element => {
        if(element.show)
        {
            element.show=false;
        }else
        {
            element.show=true;
        }
    });
},

    Placrsearch= function Placrsearch(options){
        mars3d.widget.activate({
            uri: "widgets/DigitalUniversity/search/widget.js",
            abc: window.parent.vi//参数传递
        });
    },

    Roadsearch = function Roadsearch(options){
        mars3d.widget.activate({
            uri: "widgets/DigitalUniversity/searchroad/widget.js",
            abc: window.parent.vi//参数传递
        });
    },

    inspectionBuilding = function inspectionBuilding(){
        viewer=window.parent.vi;
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
            console.log("终曲");
            viewer.zoomTo(entity, offset).then(function () { 
                viewer.clock.onTick.addEventListener(rotate); 
              }); 
            handler.setInputAction(function(click){
                console.log("终曲了");
                viewer.clock.onTick.removeEventListener(rotate); 
                viewer.scene.screenSpaceCameraController.enableInputs = true 
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

    drawPolyline = function drawPolyline(options) {
        this.measureControl.measuerLength(options);
    },

    test= function test(){
        Cesium.Cartesian3;
    },

    clearDraw= function clearDraw () {
        this.measureControl.clearMeasure();
        mars3d.widget.disable(this.jkWidgetUri);
    },


onSwitch=function onSwitch() {
    viewer=window.parent.vi;
    /*
    list[0].forEach(x => {
        x.show=!x.show;
    });*/
    
    list[1].forEach(element => {
        console.log(element);
        if(element.show)
        {
            element.show=false;
        }else
        {
            element.show=true;
        }
    });
},
pointp= function pointp () {
viewer=window.parent.vi;
list[0].forEach(x => {
    x.show=!x.show;
});
},

roadp= function roadp() {
viewer=window.parent.vi;
list[1].forEach(element => {
    if(element.show)
    {
        element.show=false;
    }else
    {
        element.show=true;
    }
});
},

Placesearch= function Placesearch(){
    window.parent.childopen(null,"newht","widgets/DigitalUniversity/search/search.html")
},

Roadsearch= function Roadsearch(){
    window.parent.childopen(null,"newht","widgets/DigitalUniversity/searchroad/searchroad.html")
},

tc=function tc(){
    window.parent.document.location.href = '../tilescut/view.html'
    //window.open("../tilescut/view.html"); 
    //ifr=window.parent.document.getElementById("newhts");
    //ifr.src="widgets/tilescut/view.html";
    //ifr.style.display="none";
    //window.parent.childopen(null,"newht","widgets/tilescut/view.html")
}

inspectionBuilding= function inspectionBuilding(){
    viewer=window.parent.vi;
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
}







