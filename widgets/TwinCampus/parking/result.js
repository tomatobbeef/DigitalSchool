var pplist;

var vs;
var kni = 0.65; // 您可以根据需要修改这个值
var fpoints=[[-2291550.16 + 14 * kni,5002623.52- 30 * kni,3214649.49- 20 * kni],[-2291532.59 + 14 * kni,5002632.67- 30 * kni,3214648.54- 20 * kni],[-2291514.55+ 14 * kni,5002642.12- 30 * kni,3214647.53- 20 * kni]]
var endpoints=[[-2291496.95 + 14 * kni,5002651.69- 30 * kni,3214646.16- 20 * kni],[-2291505.24 + 14 * kni,5002663.60- 30 * kni,3214621.66- 20 * kni]]
var enterpoint=[[-2291554.57 + 14 * kni,5002643.70- 30 * kni,3214614.54- 20 * kni],[-2291544.57 + 14 * kni,5002629.03- 30 * kni,3214645.14- 20 * kni]]
var car;
var place;

var r=1.0;

//new Cesium.PolygonHierarchy([new Cesium.Cartesian3(newppnum[0][0],newppnum[0][1],newppnum[0][2]),new Cesium.Cartesian3(newppnum[1][0],newppnum[1][1],newppnum[1][2]),new Cesium.Cartesian3(newppnum[2][0],newppnum[2][1],newppnum[2][2]),new Cesium.Cartesian3(newppnum[3][0],newppnum[3][1],newppnum[3][2])]),
      
function transformCoordinates(points, kni) {
    return points.map(function(point) {
        return [
            point[0] + 14 * kni, // 对第一个数字（x坐标）进行修改
            point[1] - 30 * kni, // 对第二个数字（y坐标）进行修改
            point[2] - 20 * kni  // 对第三个数字（z坐标）进行修改
        ];
    });
}

window.onload=function (){
    setInterval(function () {
        //如果大于10，  则重新赋值为0
        if (r > 2.5) {
            r = 1.0
        }
        r+=0.5;
    }, 500);
    
    fpointsTransformed = transformCoordinates(fpoints, kni);
    endpointsTransformed = transformCoordinates(endpoints, kni);
    enterpointTransformed = transformCoordinates(enterpoint, kni);
    var viewer=window.parent.vi;
    var vse=[-2291548.46,5002621.06,3214654.43]
    var vss=[-2291543.47,5002623.57,3214654.35]
    vs=subtractVectors(vse, vss)
    console.log(vs)
    if(!window.parent.parking["place"])
    {$.ajax({
        url: "cars.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法

            // 先对 data.PLACE 里的每一行 json 的 position 变量进行修改
            data.PLACE.forEach(function(place) {
                place.position[0] += 14 * kni; // 对第一个数字（x坐标）进行修改
                place.position[1] -= 30 * kni; // 对第二个数字（y坐标）进行修改
                place.position[2] -= 20 * kni; // 对第三个数字（z坐标）进行修改
            });
 
            var kscar=viewer.entities.add({
                id:-1,
                position: new Cesium.Cartesian3(-2291529.52,5002638.64,3214642.53), //模型的位置
                //orientation: orientation_air,
                model: {
                    uri: "CesiumMilkTruck/CesiumMilkTruck.glb",
                    minimumPixelSize: 45,
                    maximumScale: 45,
                    scale:1,
                },/*
                cylinder:{
                    topRadius:new Cesium.CallbackProperty(()=>{
                        //Date().now%8
                        return r;
                    }, false),//顶部半径
                    //topRadius:7,
                    bottomRadius:2,//底部半径
                    length:1,//高度
                    slices:10,//圆柱体周长周围的边数
                    //numberOfVerticalLines:5,//指定沿轮廓周长绘制的垂直线的数量
                    fill:false,
                    //material: Cesium.Color.RED.withAlpha(0.5),
                    heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,//贴地或是其他
                    outline:true,//是否显示轮廓
                    outlineColor:Cesium.Color.RED,
                    outlineWidth:1000,
                },*/
                show:true
            },false);
            var model= new Cesium.Entity;
            //mos.model=model;
            //viewer.trackedEntity = kscar;

            window.parent.parking["place"]=[];
            var vpar=[[-2291515.71,5002627.52,3214668.86],[-2291515.19,5002626.68,3214670.53],[-2291511.28,5002628.72,3214670.22],[-2291511.69,5002629.52,3214668.68]]
            var vparce=[-2291513.46,5002628.15,3214669.56]
            var changeway=[subtractVectors(vpar[0], vparce),subtractVectors(vpar[1], vparce),subtractVectors(vpar[2], vparce),subtractVectors(vpar[3], vparce)]
            
            window.parent.parking["cardata"]=data.CAR;
            window.parent.parking["placedata"]=data.PLACE;
            car=window.parent.parking["cardata"];
            place=window.parent.parking["placedata"];
            ple=place.length;
            var i;
            var kpla;
            console.log(ple);
            console.log(car.length);
            for(i=0;i<ple;i++)
            {
                var ppnum=place[i].position;
                //console.log(ppnum)
                var newppnum=vchan(ppnum,changeway)
                kpla=viewer.entities.add({
                    name:place[i].id,
                    val:"plapoint",
                    position: new Cesium.Cartesian3(ppnum[0],ppnum[1],ppnum[2]),
                    //position:new Cesium.Cartesian3(newppnum[1][0],newppnum[1][1],newppnum[1][2]),
                    point:{
                        show:true,
                        pixelSize :10,
                        color:Cesium.Color.WHITE,
                        outlineColor :Cesium.Color.BLACK,
                        outlineWidth : 2,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 220.0),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    },
                    polygon: {
                        show:false,
                        hierarchy: new Cesium.PolygonHierarchy([new Cesium.Cartesian3(newppnum[0][0],newppnum[0][1],newppnum[0][2]),new Cesium.Cartesian3(newppnum[1][0],newppnum[1][1],newppnum[1][2]),new Cesium.Cartesian3(newppnum[2][0],newppnum[2][1],newppnum[2][2]),new Cesium.Cartesian3(newppnum[3][0],newppnum[3][1],newppnum[3][2])]),
                        fill:true,
                        //material: new Cesium.Color.fromCssColorString("#FFD700").withAlpha(.2),

                        outline: true,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 10.0,
                        //disableDepthTestDistance: Number.POSITIVE_INFINITY
                    },
                    cylinder:{
                        show:false,
                        topRadius:new Cesium.CallbackProperty(()=>{
                            //Date().now%8
                            return r;
                        }, false),//顶部半径
                        //topRadius:7,
                        bottomRadius:2,//底部半径
                        length:1,//高度
                        slices:10,//圆柱体周长周围的边数
                        //numberOfVerticalLines:5,//指定沿轮廓周长绘制的垂直线的数量
                        fill:false,
                        //material: Cesium.Color.RED.withAlpha(0.5),
                        heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,//贴地或是其他
                        outline:true,//是否显示轮廓
                        outlineColor:Cesium.Color.RED,
                        outlineWidth:1000,
                    },
                },false)
                window.parent.parking["place"].push(kpla);
                var model=new Cesium.Model
                model=Cesium.clone(kscar.model)
                var kcar;
                //var entity = new Cesium.Entity; 
                kcar=viewer.entities.add({
                    id:i,
                    position: new Cesium.Cartesian3(place[i].position[0],place[i].position[1],place[i].position[2]), //模型的位置
                    model:model,
                    /*model: {
                        //uri: "widgets/TwinCampus/parking/image/car"+String(i+1)+".glb",
                        uri:"CesiumMilkTruck/CesiumMilkTruck.glb",
                        minimumPixelSize: 25,
                        maximumScale: 10,
                        scale:0.005,
                    },*/
                    show:car[i].exist,
                    point:{
                        show:true,
                        pixelSize :15,
                        color:Cesium.Color.WHITE,
                        outlineColor :Cesium.Color.BLUE,
                        outlineWidth : 2,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 220.0),
                        disableDepthTestDistance: Number.POSITIVE_INFINITY
                    },
                },false);
                //kcar=Cesium.clone(kscar);
                window.parent.parking["car"].push(kcar);
            }
            //kscar.position=new Cesium.Cartesian3(-2291527.02,5002623.37,3214666.63)
            console.log(window.parent.parking["place"])
            console.log(window.parent.parking["car"])
            let cartographic = Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(-2291543.47,5002623.57,3214654.35));
            cartographic=[Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(-2291543.47,5002623.57,3214654.35)),Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(-2291524.60,5002631.88,3214655.65)),Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(-2291513.46,5002628.15,3214669.56))]
            //cartographic=
            console.log(cartographic)
            //window.parent.moveOnRoute(Cesium.Cartesian3.fromDegreesArray([-2291543.47,5002623.57,3214654.35]))
            //window.parent.moveOnRoute(cartographic)

            
            window.parent.parking["roadline"]=viewer.entities.add({
                //id:"road",
                polyline: {
                  positions: [new Cesium.Cartesian3(-2291543.47,5002623.57,3214654.35),new Cesium.Cartesian3(-2291524.60,5002631.88,3214655.65),new Cesium.Cartesian3(-2291513.46,5002628.15,3214669.56)],
                  //position:cartographic,
                  clampToGround: true,
                  material: Cesium.Color.RED.withAlpha(1),
                  width: 2,
                  show:false,
                }
            },false);
            //window.parent.moveOnRoute(kro)

            //window.parent.parking["movingcar"]=window.parent.parking["car"][0]
            //window.parent.moveOnRoute()
            //window.parent.parking["place"]=[];
            pplist=window.parent.parking["place"];
            highline()
            hand()
        }
    })}else{
        //window.parent.moveOnRoute()
        //window.parent.parking["place"]=[];
        pplist=window.parent.parking["place"];
        car=window.parent.parking["cardata"];
        place=window.parent.parking["placedata"];
        highline()
        hand()

    }
}

var certain=null

hand=function hand(){
    var viewer=window.parent.vi;
    console.log("启动左键")
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        //console.log(pickedEntity)
        var pick = viewer.scene.pick(movement.position);  //获取的pick对象
        var pickedEntity = Cesium.defined(pick) ? pick.id : undefined; //pick.id即为entity
        if(pickedEntity)
        {
            if(pickedEntity.model)
            {
                pickedEntity.model.color=Cesium.Color.RED;
                if(certain!=null)certain.model.color=null;
                certain=pickedEntity;
                id=pickedEntity.id;
                //console.log(pickedEntity.id)
                var nu = document.getElementById("number");
                var ti = document.getElementById("time");
                var outs=document.getElementById("outs");
                var parking=document.getElementById("parking");
                var inpart=document.getElementById("inpart");
                inpart.style.display="none";
                nu.innerHTML="车牌号："+String(car[id].number);
                ti.innerHTML="停留时间："+String(car[id].hour)+"时"+String(car[id].min)+"分";
                outs.style.display="block";
                parking.style.display="none";
            }else if(pickedEntity.val=="plapoint")
            {
                var nu = document.getElementById("number");
                var ti = document.getElementById("time");
                var outs=document.getElementById("outs");
                var parking=document.getElementById("parking");
                var inpart=document.getElementById("inpart");
                inpart.style.display="none";
                nu.innerHTML="";
                ti.innerHTML="";
                outs.style.display="none";
                parking.style.display="block";
                if(certain!=null)certain.model.color=null;
                certain=window.parent.parking["car"][pickedEntity.name]
                certain.model.color=Cesium.Color.RED;
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
}

function vchan(ce,way){
    return [addVectors(ce,way[0]),addVectors(ce,way[1]),addVectors(ce,way[2]),addVectors(ce,way[3])]
}

function addVectors(a, b) {
    if (a.length !== b.length) return null;
    return a.map((n, i) => n + b[i]);
  }

function subtractVectors(a, b) {
if (a.length !== b.length) return null;
return a.map((n, i) => n - b[i]);
}


outpark=function outpark(){
    var val = certain.id;
    car[val].exist=false;
    var lie=parseInt(val/8)
    //certain.children[0].style.display="none";
    var newroad=[]
    var pos =place[certain.id].position
    var cp=new Cesium.Cartesian3(pos[0],pos[1],pos[2])
    newroad.push(cp)
    var po=[0,0,0]
    po[0]=cp.x;
    po[1]=cp.y;
    po[2]=cp.z;
    console.log(po)
    if(lie%2==0)
    {
        var po2= addVectors(po,vs);
        console.log(po2);
        newroad.push(new Cesium.Cartesian3(po2[0],po[1],po[2]));
    }else
    {
        var po2= subtractVectors(po,vs)
        newroad.push(new Cesium.Cartesian3(po2[0],po[1],po[2]));
    }
    newroad.push(new Cesium.Cartesian3(fpoints[parseInt((lie+1)/2)][0],fpoints[parseInt((lie+1)/2)][1],fpoints[parseInt((lie+1)/2)][2]));
    newroad.push(new Cesium.Cartesian3(endpoints[0][0],endpoints[0][1],endpoints[0][2]));
    newroad.push(new Cesium.Cartesian3(endpoints[1][0],endpoints[1][1],endpoints[1][2]));

    newroad.push(new Cesium.Cartesian3(-2291306.34,5002399.78,3214099.63));

    window.parent.parking["roadline"].polyline.positions=newroad;
    console.log(window.parent.parking["roadline"]);
    window.parent.parking["movingcar"]=certain;
    window.parent.moveOnRoute()
    highline()
}

showinp=function showinp(){
    var inpart=document.getElementById("inpart");
    inpart.style.display="block";
}

parki=function parki(){
    var inp=document.getElementById("innum").value;
    var val = certain.id;
    certain.show=true;
    car[val].exist=true;
    car[val].number=inp;
    car[val].hour=0;
    car[val].min=0;
    var lie=parseInt(val/8)
    //certain.children[0].style.display="none";
    var newroad=[]
    newroad.push(new Cesium.Cartesian3(enterpoint[0][0],enterpoint[0][1],enterpoint[0][2]));
    newroad.push(new Cesium.Cartesian3(enterpoint[1][0],enterpoint[1][1],enterpoint[1][2]));

    newroad.push(new Cesium.Cartesian3(fpoints[parseInt((lie+1)/2)][0],fpoints[parseInt((lie+1)/2)][1],fpoints[parseInt((lie+1)/2)][2]));

    var po =place[certain.id].position
    var cp=new Cesium.Cartesian3(po[0],po[1],po[2])

    if(lie%2==0)
    {
        var po2= addVectors(po,vs);
        console.log(po2);
        newroad.push(new Cesium.Cartesian3(po2[0],po[1],po[2]));
    }else
    {
        var po2= subtractVectors(po,vs)
        newroad.push(new Cesium.Cartesian3(po2[0],po[1],po[2]));
    }

    newroad.push(cp)

    window.parent.parking["roadline"].polyline.positions=newroad;
    console.log(window.parent.parking["roadline"]);
    window.parent.parking["movingcar"]=certain;
    window.parent.moveOnRoute()
    
    var id=val;
    //console.log(pickedEntity.id)
    var nu = document.getElementById("number");
    var ti = document.getElementById("time");
    var outs=document.getElementById("outs");
    var parking=document.getElementById("parking");
    var inpart=document.getElementById("inpart");
    nu.innerHTML="车牌号："+String(car[id].number);
    ti.innerHTML="停留时间："+String(car[id].hour)+"时"+String(car[id].min)+"分";
    outs.style.display="block";
    parking.style.display="none";
    highline()
}

highline=function highline(){
    var val = document.getElementById("che").checked;
    var le= car.length;
    var i=0;
    //par = document.getElementById("carzone");
    if(val)
    {
        for(i=0;i<le;i++)
        {
            if(!car[i].exist)
            {
                window.parent.parking["place"][i].cylinder.topRadius=new Cesium.CallbackProperty(()=>{
                    //Date().now%8
                    return r;
                }, false),//顶部半径
                window.parent.parking["place"][i].cylinder.show=true
            }else
            {
                window.parent.parking["place"][i].cylinder.topRadius=1
                window.parent.parking["place"][i].cylinder.show=false
            }
        }
    }else
    {
        for(i=0;i<le;i++)
        {
            window.parent.parking["place"][i].cylinder.topRadius=1
            window.parent.parking["place"][i].cylinder.show=false
        }
    }
}


