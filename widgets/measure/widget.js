/* 2017-11-30 16:56:24 | 修改 */
//模块：
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
    },
    //激活插件
    activate: function () {

    },
    //释放插件
    disable: function () {
        this.viewWindow = null;
        this.clearDraw();
    },
    
    drawPolyline: function (options) {
        this.measureControl.measuerLength(options);
    },
    drawPolygon: function (options) {
        this.measureControl.measureArea(options);
    },
    drawHeight: function (options) {
        this.measureControl.measureHeight(options);
    },
    drawSection: function (options) {
        this.measureControl.measureSection(options);
    },
    measureAngle: function (options) {
        this.measureControl.measureAngle(options);
    },
    measurePoint: function (options) {
        this.measureControl.measurePoint(options); 
    }, 

    updateUnit: function (thisType, danwei) {
        this.measureControl.updateUnit(thisType, danwei);
    },
    clearDraw: function () {
        this.measureControl.clearMeasure();
        mars3d.widget.disable(this.jkWidgetUri);
    },
    formatArea: function (val, unit) {
        return this.measureControl.formatArea(val, unit);
    },
    formatLength: function (val, unit) {
        return this.measureControl.formatLength(val, unit);
    }, 
    jkWidgetUri: 'widgets/measureCharsLabel/widget.js',
    showSectionChars: function (data, danwei) {
        mars3d.widget.activate({
            uri: this.jkWidgetUri,
            danwei: danwei || 'auto',
            data: data
        });
    },

}));