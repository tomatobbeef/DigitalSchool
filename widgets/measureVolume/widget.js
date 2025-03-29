/* 2017-9-28 16:04:24 | 修改 */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 340,
                height: 200
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
        var that = this;
        this.measureObj = new mars3d.analysi.MeasureVolume(viewer,{
            heightLabel:true,
            offsetLabel:false,
            onStart:function(){
                haoutil.loading.show({type:"loader-bar"});
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
    //关闭释放
    disable: function () {
        this.viewWindow = null;

        this.measureObj.destroy();
        delete this.measureObj;
    }
}));

