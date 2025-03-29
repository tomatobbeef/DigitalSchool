var viewer;

window.onload=function(){
    viewer=window.parent.vi;
    if(window.parent.adva["main"]==null)window.parent.adva["main"] = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: viewer });
},
/**
 * 下雪
 */
addSnow=function addSnow() {
    if(window.parent.adva["snow"]==null)
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["snow"]=window.parent.adva["main"].createSnow({
        //色调调整
            hueShift: 0.7
        });
    }else
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["snow"]=null
    }
},
/**
 * 下雨
 */
addRain=function addRain() {
    //初始化高级分析功能管理类
    if(window.parent.adva["rain"]==null)
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["rain"]=window.parent.adva["main"].createRain({
        //色调调整
            hueShift: 0.7
        });
    }else
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["rain"]=null
    }
},
/**
 * 下雾
 */
addFog=function addFog() {
    if(window.parent.adva["fog"]==null)
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["fog"]=window.parent.adva["main"].createFog({
        //色调调整
            alpha: 0.5
        });
    }else
    {
        window.parent.vi.postProcessStages.removeAll()
        window.parent.adva["fog"]=null
    }
},

/**
 * 消除天气效果
 */
destoryWeather=function destoryWeather() {
    window.parent.vi.postProcessStages.removeAll()
    window.parent.adva["fog"]=null
    window.parent.adva["rain"]=null
    window.parent.adva["snow"]=null
}