

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

    simulateWeather:function(options) {
        mars3d.widget.activate({
            uri: "widgets/RealSenseSimulate/weather/widget.js",
            abc: this.viewer//参数传递
        });
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