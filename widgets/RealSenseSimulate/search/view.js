var thisWidget;
var thisType = "";
var viewer=this.viewer;

var lastVal = 0;
var lastSection = null;
var list=[];

window.onload=function(){
    console.log("启动");
    var x = document.getElementById("sel");
    $.ajax({
        url: "data.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            v=data.V;
            vle=v.length;
            var i;
            var k=0;
            for(i=0;i<vle;i++){
                if(v[i].hide!=1)
                {
                    list.push(v[i].position)
                    var option = new Option(v[i].name, k);
                    x.appendChild(option);
                    k++;
                }
            }
        }
    })
}

function sear(){
    console.log("开始搜索");
    var x = document.getElementById("sel");
    var index=x.selectedIndex;
    po=list[x.options[index].value];
    console.log(po)
    
    var kp=new Cesium.Cartesian3(0,0,0.1)
    kp.x=po[0]-28;
    kp.y=po[1]+60;
    kp.z=po[2]+40;
    viewer=window.parent.vi;
    
    var x = document.getElementById("sel");
    var index1=x.selectedIndex;
    build=index1;
    console.log("build",build)
    if(build!=0)
    {
        iframeSrc="widgets/RealSenseSimulate/search/result.html?"+String(build);
        window.parent.appk.toggleIframe(iframeSrc);
    }

    viewer.camera.flyTo({
        destination : kp,
        orientation : {
            direction : new Cesium.Cartesian3(14,-30,-20),
            up : new Cesium.Cartesian3(0,0,0)
        }
    })
}

var cer=-1;
var xunjian=false;
var timer=null;
xunjian=function xunjian(){
    var val = document.getElementById("xj").checked;
    if(val)
    {
        le=v.length;
        cer=(cer+1)%le+1;

        var x = document.getElementById("sel");
        var index=cer;
        po=list[x.options[index].value];
        console.log(po)
        
        var kp=new Cesium.Cartesian3(0,0,0.1)
        kp.x=po[0]-28;
        kp.y=po[1]+60;
        kp.z=po[2]+40;
        viewer=window.parent.vi;
        
        var index1=cer;
        build=index1;
        console.log("build",build)
        if(build!=0)
        {
            window.parent.appk.closeIframe();
            iframeSrc="widgets/RealSenseSimulate/search/result.html?"+String(build);
            window.parent.appk.toggleIframe(iframeSrc);
        }

        viewer.camera.flyTo({
            destination : kp,
            orientation : {
                direction : new Cesium.Cartesian3(14,-30,-20),
                up : new Cesium.Cartesian3(0,0,0)
            }
        })

        if(timer!=null){
            clearTimeout(timer);
            timer=null;
        }
        timer=setTimeout(xunjian,5000);
    }
}

//从父页面调用



