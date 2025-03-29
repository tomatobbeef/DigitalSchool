/* 2017-9-28 16:04:24 | 修改 */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 650,
                height: 200
            }
        },
    },
    //初始化[仅执行1次]
    create: function () {
        // 标注相对地形高度
        this.labelHight = 200;
        this.locateLabel = null;
        this.locateLine = null;
    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;
    },
    data: null,
    //打开激活
    activate: function () {
        if (this.viewWindow)
            this.viewWindow.setEchartsData(this.config.data,this.config.danwei);
    },
    //内置方法，不重启方式刷新页面
    update: function () {
        if (this.viewWindow)
            this.viewWindow.setEchartsData(this.config.data,this.config.danwei);
    },

    locateSection: function(point,html) {
        var viewer = this.viewer;
        var long = point.x;
        var lat = point.y;
        var height = point.z;
        // 删除label
        if(this.locateLabel!=null){
            viewer.entities.remove(this.locateLabel)
            this.locateLabel = null
        }
        // 添加点
        this.locateLabel = viewer.entities.add({
            name: 'tipText',
            position: mars3d.Cesium.Cartesian3.fromDegrees(long, lat, this.labelHight),
            label: {
                text: html,
                fillColor: mars3d.Cesium.Color.YELLOW,
                font : '18pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth : 3,
                heightReference:mars3d.Cesium.HeightReference.RELATIVE_TO_GROUND,
                horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
                scaleByDistance: new mars3d.Cesium.NearFarScalar(50000, 1.0, 500000, 0.3)
            }
        })

        // 删除line
        if(this.locateLine!=null){
            viewer.entities.remove(this.locateLine)
            this.locateLine = null
        }
        this.locateLine = viewer.entities.add({
            name: "tipLine",
            polyline: {
                positions: mars3d.Cesium.Cartesian3.fromDegreesArrayHeights([
                    long, lat, height,
                    long, lat, height+this.labelHight,
                ]),
                width: 1,
                material: mars3d.Cesium.Color.DODGERBLUE
                // material : new mars3d.Cesium.PolylineGlowMaterialProperty({ //发光线
                //     glowPower : 0.1,
                //     color : mars3d.Cesium.Color.DODGERBLUE
                // })
            }
        });

        // this.viewer.mars.centerAt(point);
    },
    //关闭释放
    disable: function () {
        this.viewWindow = null;
        if(this.locateLabel!=null){
            viewer.entities.remove(this.locateLabel)
            this.locateLabel = null
        }
        if(this.locateLine!=null){
            viewer.entities.remove(this.locateLine)
            this.locateLine = null
        }
    },

}));

