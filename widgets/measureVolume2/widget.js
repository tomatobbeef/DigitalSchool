/* 2017-9-28 16:04:24 | 修改 */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        resources:['./widgets/measureVolume2/MeasureVolume2.js'],
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                maxmin:true,
                width: 450,
                height: 150
            }
        },
    },
    //初始化[仅执行1次]
    create: function () {

    },
    viewWindow:null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result; 
        this.digEffect = false;
        var that = this;
        this.measureObj = new mars3d.analysi.MeasureVolume2(viewer,{
            heightLabel:true,
            offsetLabel:false,
            onStart:function(positions){
                haoutil.loading.show({type:"loader-bar"});
                // 是否有开挖效果
                if(that.digEffect == true){
                    that.TerrainClip = new mars3d.analysi.TerrainClipPlan(viewer, {
                        positions: positions,
                        height: 0,
                        splitNum: 50, //wall边界插值数
			            wallImg: that.path + 'img/excavationregion_top.jpg',
			            bottomImg: that.path + 'img/excavationregion_side.jpg'
                    });
                }
            },
            onStop:function(){
                haoutil.loading.hide();
                that.viewWindow.showHeightRg(that.measureObj);
            }
        });
    },
    //打开激活
    activate: function () {

    },

    // 切换开挖效果
    showDigEffect: function (val) {
        if(val == true){
            this.digEffect = true;
            if(this.TerrainClip == null && this.measureObj != null){
                var fillHeight = this.measureObj.height - this.measureObj.minHeight - 1
                this.TerrainClip = new mars3d.analysi.TerrainClipPlan(viewer, {
                    positions: this.measureObj.originPositions,
                    height: -fillHeight,
                    splitNum: 50, //wall边界插值数
			        wallImg: this.path + 'img/excavationregion_top.jpg',
			        bottomImg: this.path + 'img/excavationregion_side.jpg'
                }); 
            }
        }else{
            this.digEffect = false;
            if(this.TerrainClip != null){
                this.TerrainClip.destroy();
                delete this.TerrainClip;
            }
        }
    },
    //关闭释放
    disable: function () {
        this.viewWindow = null;

        this.measureObj.destroy();
        delete this.measureObj;

        if (this.TerrainClip) {
            this.TerrainClip.destroy();
        }
        delete this.TerrainClip;
    }
}));

