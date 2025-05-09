//import { vehicleColumns, peopleColumns } from './core/data.js'    // 车辆&人员管理表格列配置

// const { type } = require("os")
// const { types } = require("util")

// const { Cesium3DTile } = require("./mapgis/cdn/cesium/Cesium")

var viewer               // [ Object, 地图对象 ]
var viewer2d               // [ Object, 地图对象 ]
let nowI = Date.now()               // [ Number, 当前时间戳-毫秒级 ]
var canvas = null                   // [ Object, canvas对象 ]
var ctx = null                      // [ Object, canvas上下文 ]
var videoElement = null
var pnum = 0
var nt;
var pnumel = 0;
var moveRate = 5;
var camera;
var scene;
var zizhuan;
var fixedHeight = 500;
let cameraPointEntity = null;
var layer;

function peo() {
    pnumel = document.getElementById("people");
    pnum += Math.floor(Math.random() * 11) - 5;
    pnumel.innerHTML = String(pnum) + "人";
    nt = (Math.floor(Math.random() * 7) + 1) * 1000;
    setTimeout(peo, nt);
}
let SQLk;
let map, sceneView;
window.txdjs = 0;


//按键事件
function kpr(event) {
    console.log("按下按键");
    console.log(event);
}

//穿透室内
function toindoor() {

}


//加载3DTile数据
function add3DTile() {
    console.log("开始载入模型")
    /*let url = "Data/3Dtiles/class1/Production_11.json";
    let Cesium3DTilesCacheLayer = new CesiumZondy.Layer.M3DLayer({
        url: url
    });
    console.log(Cesium3DTilesCacheLayer);
    console.log(map);
    map.add([Cesium3DTilesCacheLayer]);*/
}

function initViewer() {
    //初始化图层管理容器
    //map = new Zondy.Map();
    map = new CesiumZondy.Manager.CommonDataManager;
    //初始化地图视图对象
    console.log(Zondy);
    /*sceneView = new Zondy.SceneView({
      //视图id
      viewId: "mapgis-3d-viewer",
      //图层管理容器
      map: map
    });*/
}

//地图初始化函数
function init() {
    //初始化球体
    initViewer();
    // 加载3DTile数据
    add3DTile();
    console.log(viewer);
    console.log("载入模型");
    /*let tileset1 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: '/zjl/12/tileset.json',
    }))

    let tileset2 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: '/zjl/Data/3Dtiles/cesiumosgb/tileset.json',
    }))*/

    console.log('t1:', tileset1);
    console.log('t2:', tileset2);
    //var translation=Cesium.Cartesian3.fromArray([0, 0, -58]);
    //var m= Cesium.Matrix4.fromTranslation(translation);

    //生效
    //tileset2._modelMatrix = m;
}

// 在需要使用的页面中导入该 Vue 实例

//_________________________________________________________________________
let app = new Vue({
    el: '#app',
    data: {
        initBool: true,             // [ Bool ,  初始化弹层-显示隐藏 ]

        swiperImgBool: false,       // [ Bool ,  图片预览box-显示隐藏 ]
        swiperImgArr: [],           // [ Array,  图片预览临时数组 ]

        headBool: false,            // [ Bool ,  head头部显示隐藏 ]

        selInp: '',                 // [ String, 导航搜索内容 ]
        selBool: false,             // [ Bool ,  导航搜索-显示隐藏 ]
        selClearBool: false,        // [ Bool ,  清空搜索输入图标-显示隐藏 ]
        navBool: false,             // [ Bool ,  nav导航 显示隐藏 ]

        alertboxBool: false,        // [ Bool ,  搜索弹框-显示隐藏 ]

        noBoxBool: false,           // [ Bool ,  未识别弹框-显示隐藏 ]

        tooltipBool: false,          // [ Bool ,  tooltip工具按钮 ]
        tooltipAlertBool: false,     // [ Bool ,  tooltip弹框显示隐藏 ]
        canvasImages: '',             // [ String, tooltip弹层canvas转base64字符串 ]
        tipsboxBool: false,         // [ Bool ,  搜索弹框-默认弹框-显示隐藏-tips ]
        navNewBool: false,            // [ Bool ,  下侧导航显示隐藏 ]
        initEchartsBool: false,       // [ Bool ,  初始化图表块显示隐藏 ]
        navState: '',                // [ String, nav选中状态 ]

        mapSwitch: false,             // [ Bool , 地图切换 false-3D true-2Ddark ]

        dateYear: '',
        dateMonth: '',
        dateDate: '',
        dateHour: '',
        dateMinu: '',
        dateSec: '',
        dateWeek: '',

        moveTimer: null,              // [ Object , move引导动画 ]
        hisTimer: null,
        moveTimerOut: [null, null, null, null],

        moveMarker1: null,
        moveMarker2: null,
        moveMarker3: null,
        moveMarker4: null,
        moveMarker5: null,
        moveMarker6: null,
        mapAuto: true,                 // [ Bool , 自动播放 ] 

        //
        videoFusionFlag: true,
        videoEntity: null,

        // new
        isOpen: false,
        externalUrl: 'external.html', // 替换为您要加载的 HTML 文件的路径
        iframeVisible: false,
        iframeSrc: '',
        isMapVisible: false,
        heatmapDataSource: null,
        // mapSwitch: true,
        leftWidth: '50%',
        rightWidth: '50%',
        openlayersMap: null,
        viewer: null,
        ttsw: 1,
        switchstatues: 1,
        heatmapLayer: null,
        layer: null,
        showvectorSource: null,
        showvectorLayer: null,
        wallEntities: [],
        modelEntity: null,
        placepoint: null, // 存放显示的点和文字的实体集合
        zIndex: 2,



        // newturl:'widgets/tilescut/view.html',
        // therightWidth:"50%"
    },
    watch: {
        mapAuto(n, o) {
            this.moveAnimation(n)
        },
        // nav搜索内容监听
        selInp(n, o) {
            // nav搜索栏内容状态处理方法
            this.selNavState(n)
        },
        // 监听工具弹框显示隐藏
        tooltipAlertBool(n, o) {
            if (n) {
                this.checkboxChange()
            }
            this.scaleFun(n)
        },
        // 左侧弹框
        alertboxBool(n, o) {
            !this.alertboxBool && !this.vehicleBool ? this.initEchartsBool = true : this.initEchartsBool = false
        },
        // 右侧车辆&人员弹框
        vehicleBool(n, o) {
            !this.alertboxBool && !this.vehicleBool ? this.initEchartsBool = true : this.initEchartsBool = false
        },
        // 初始化图表块
        initEchartsBool(n, o) {
            if (n) {
                this.allCheck()
                this.navState = ''
                this.$nextTick(() => {
                    this.drawEcharts()
                })
            }
        }
    },
    filters: {
        // 去除str中html标签
        removeHTML(value) {
            return value.replace(/<[^>]+>/g, "")
        },
        // 秒级时间戳转日期格式
        formatDate(value) {
            value *= 1000
            let now = new Date(value)
            let year = now.getFullYear()
            let month = now.getMonth() + 1
            let date = now.getDate()
            // let hour=now.getHours()
            // let minute=now.getMinutes()
            // let second=now.getSeconds()
            return year + "年" + month + "月" + date + "日"
        },
    },
    computed: {
        // 搜索弹框-默认弹框-历史数据 操作-翻转
        tipsHistoryDataCom: function () {
            return this.tipsHistoryData.reverse()
        },
        // 搜索弹框-硬件设备 操作 selectState=0->全部数据 12...->索引-1
        hardwareDataFun: function () {
            if (this.selectState == 0) {
                let arr = []
                for (let i = 0; i < this.hardwareData.length; i++) {
                    arr = arr.concat(this.hardwareData[i].children)
                }

                viewer.entities.removeAll()


                arr.map((item, i) => {
                    imageCanvasBase64(item.icon, (image) => {
                        item.icon = image
                        let options = {
                            name: item.name,
                            position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
                            billboard: { image: item.icon, width: 35, height: 35 },
                        }
                        Object.assign(options, item)
                        let markerObj = viewer.entities.add(options)
                        item.entities_id = markerObj.id
                    })
                })

                ////this.access()


                return arr
            } else {
                this.addMarkers(this.hardwareData[this.selectState - 1].children, { image: this.hardwareData[this.selectState - 1].cate_image, width: 35, height: 35 })
                return this.hardwareData[this.selectState - 1].children
            }
        },
        // 搜索弹框-硬件设备 总数 操作 selectState=0->全部数据 12...->索引-1 return数量
        hardwareDataNum: function () {
            if (this.selectState == 0) {
                let arr = []
                for (let i = 0; i < this.hardwareData.length; i++) {
                    arr = arr.concat(this.hardwareData[i].children)
                }


                return arr.length
            } else {
                this.addMarkers(this.hardwareData[this.selectState - 1].children, { image: this.hardwareData[this.selectState - 1].cate_image, width: 35, height: 35 })
                return this.hardwareData[this.selectState - 1].children.length
            }
        },
        // 搜索弹框-楼栋数据
        buildDataFun: function () {
            let street_id = this.street_id, dataList = this.buildData, arr = []
            if (street_id == 0) {
                return dataList
            }
            dataList.map((item, i) => {
                if (item.street_id == street_id) {
                    arr.push(item)
                }
            })
            viewer.entities.removeAll()
            arr.map((item, i) => {
                item.describe_content = item.build_brief_content
                let options = {
                    name: item.name,
                    position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
                    billboard: { image: './images/redmarker.png', width: 20, height: 30 },
                }
                Object.assign(options, item)
                let markerObj = viewer.entities.add(options)
                item.entities_id = markerObj.id
            })
            //this.access()
            return arr
        },
        // 文字展开收起-去除str中html标签
        textOpenClose() {
            return function (value, bool) {
                let val = value
                val = val.replace(/&nbsp;/g, "")
                val = val.replace(/<[^>]+>/g, "")
                if (!bool) {
                    if (val.length > 80) {
                        val = val.substring(0, 80) + '...'
                    }
                    bool = !bool
                    return val
                } else {
                    bool = !bool
                    return val
                }
            }
        },
        // 文字截取加点方法
        textSubstr() {
            return function (value, length) {
                let val = value
                if (value == '' || value == undefined) {
                    return ''
                }
                if (val.length > length) {
                    val = val.substring(0, length) + '...'
                }
                return val
            }
        },
        // 单元住户详情-数组对象中是否有该值 返回bool
        dataListIsValue() {
            return function (j, i) {
                let dataList = this.houseUnitData

                for (let idx = 0; idx < dataList.length; idx++) {
                    if (dataList[idx].name == `${j}单元`) {
                        for (let idxChild = 0; idxChild < dataList[idx].children.length; idxChild++) {
                            if (dataList[idx].children[idxChild].name == `${i}楼层`) {
                                return true
                            }
                        }
                    }
                }
                return false
            }
        },
        // 图片格式转换->字符串转数组 return数组第一项
        imageTitleOne() {
            return function (str) {
                let arr = imagesFun(str)
                if (arr.length > 0) {
                    return arr[0]
                }
                return ''
            }
        }
    },
    mounted() {
        this.openlayersMap = new ol.Map({
            target: 'openlayersMap',
            layers: [
                //天地图影像
                new ol.layer.Tile({
                    title: "天地图影像",
                    source: new ol.source.XYZ({
                        url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=efaed16e0051bf968bbbe8144bdcf97e",
                    }),
                    name: '天地图影像'
                }),
                //ArcGIS影像图层
                new ol.layer.Tile({
                    title: "ArcGIS影像图层",
                    source: new ol.source.XYZ({
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    }),
                    name: 'ArcGIS影像图层'
                }),
                //天地图影像注记
                new ol.layer.Tile({
                    title: "天地图影像注记",
                    source: new ol.source.XYZ({
                        url: "http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=efaed16e0051bf968bbbe8144bdcf97e",
                    }),
                    name: '天地图影像注记'
                }),
                //校园地图
                new ol.layer.Tile({
                    title: "校园矢量",
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:6163/igs/rest/mrms/tile/地大新校区/{level}/{row}/{col}',
                    }),
                    name: '校园矢量'
                }),
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([0, 0]),
                zoom: 2,
                constrainResolution: true
            })
        });
        this.kaishi();

        // 在Vue的nextTick中初始化Cesium地图
        this.$nextTick(() => {
            var cesiumMap = new Cesium.Viewer('cesiumContainer');
        });

        // 获取 OpenLayers 地图对象
        var openlayersMap = this.openlayersMap;

        var viewer = this.viewer;

        this.initialheatmap();

        // 创建一个图层用于显示摄像头位置和方向
        var cameraLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: function (feature) {
                // 获取摄像头位置和方向
                var position = feature.getGeometry().getCoordinates();
                var direction = feature.get('direction') || 0;

                // 将摄像头方向角度调整为与 OpenLayers 中一致的表示方式
                direction = Math.PI / 2 - direction;

                // 计算箭头的终点坐标
                var arrowLength = 20; // 箭头长度
                var arrowEndX = position[0] + Math.cos(direction) * arrowLength;
                var arrowEndY = position[1] + Math.sin(direction) * arrowLength;
                var arrowEnd = [arrowEndX, arrowEndY];

                // 创建箭头的几何图形
                var arrowGeometry = new ol.geom.LineString([position, arrowEnd]);

                // 创建箭头的样式
                var arrowStyle = new ol.style.Style({
                    geometry: arrowGeometry,
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 2
                    })
                });

                // 创建红点的样式
                var pointStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: 'red'
                        })
                    })
                });

                return [arrowStyle, pointStyle];
            },
            name: '3D位置图层'
        });

        // 将图层添加到地图中
        openlayersMap.addLayer(cameraLayer);

        // 指定中心点附近的范围
        // const centerLon = 12758512.453339145;
        // const centerLat = 3563131.9789896077;
        const centerLon = 114.612575735569;
        const centerLat = 30.45962560168263;

        const range = 0.005; // 在中心点周围生成的点的范围

        // 生成随机数据
        const heatmapData = [];
        const pointCount = 10000;
        for (let i = 0; i < pointCount; i++) {
            const lon = centerLon + (Math.random() - 0.5) * range * 2; // 通过在中心点周围生成随机偏移量来确定经度
            const lat = centerLat + (Math.random() - 0.5) * range * 2; // 通过在中心点周围生成随机偏移量来确定纬度
            heatmapData.push([lon, lat]);
        }
        console.log(heatmapData)
        // 创建热力图图层
        const heatLayer = new ol.layer.Heatmap({
            source: new ol.source.Vector({
                features: heatmapData.map(point => {
                    return new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat(point)) // 将经纬度转换为地图坐标系
                    });
                })
            }),
            blur: 15,
            radius: 7,
            opacity: 0.8,
            name: '热力图',
            maxOpacity: 0.81, // 最大不透明度
            minOpacity: 0.16,  //最小不透明度
        });
        heatLayer.setVisible(false);
        // 将热力图图层添加到地图中
        openlayersMap.addLayer(heatLayer);



        // 定义一个变量来记录最后一次更新的时间戳
        var lastUpdate = 0;

        // 在 Cesium 中监听摄像头位置和方向的变化，并更新在 OpenLayers 中显示的红点和箭头
        viewer.camera.changed.addEventListener(function () {
            // 请求动画帧，确保在下一帧之后执行更新操作
            requestAnimationFrame(function () {
                // 获取当前时间戳
                var now = Date.now();

                // 如果距离上次更新的时间小于16ms（大约60帧每秒），则不执行更新操作
                if (now - lastUpdate < 16) {
                    return;
                }

                // 更新最后一次更新的时间戳
                lastUpdate = now;

                // 获取摄像头位置
                var position = viewer.camera.positionCartographic;

                // 将摄像头位置转换为经纬度坐标
                var cameraPosition = [Cesium.Math.toDegrees(position.longitude), Cesium.Math.toDegrees(position.latitude)];

                // 获取摄像头方向
                var direction = viewer.camera.heading;

                // 将摄像头位置和方向更新到 OpenLayers 中显示的图层上
                var pointFeature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(cameraPosition)),
                    direction: direction
                });
                // console.log(new ol.geom.Point(ol.proj.fromLonLat(cameraPosition)),)
                var source = cameraLayer.getSource();
                source.clear();
                source.addFeature(pointFeature);

                // 获取 Cesium 地图相机的位置
                var cesiumCameraPosition = viewer.camera.positionCartographic;

                // 将 Cesium 地图相机的位置转换为经纬度坐标
                var cesiumCameraLongitude = Cesium.Math.toDegrees(cesiumCameraPosition.longitude);
                var cesiumCameraLatitude = Cesium.Math.toDegrees(cesiumCameraPosition.latitude);

                // 将经纬度坐标转换为 OpenLayers 地图的视图坐标
                var openlayersViewCoordinate = ol.proj.fromLonLat([cesiumCameraLongitude, cesiumCameraLatitude]);

                // 将 OpenLayers 地图的视图坐标应用到地图中心
                openlayersMap.getView().setCenter(openlayersViewCoordinate);
                openlayersMap.getView().setZoom(18);
            });
        });
        // this.erdrefresh();

        // window.parent.appk.sandrefresh();

    },
    methods: {
        moveAndZoomMap() {
            // 修改为你想要的经纬度和高度
            const destination = Cesium.Cartesian3.fromDegrees(-106.0, 40.0, 20000000.0);

            // 将地图移动到指定位置并放大
            viewer.camera.flyTo({
                destination: destination,
                duration: 2, // 移动过程持续时间（秒）
                complete: function () {
                    console.log('地图已移动到目标位置并放大。');
                },
                cancel: function () {
                    console.log('地图移动被取消。');
                }
            });
        },

        openMapWindow() {
            this.showMapWindow = true;
            // 将地图移动到屏幕中央并放大
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(-106.0, 40.0, 20000000.0) // 修改为你想要的经纬度和高度
            });
        },
        closeMapWindow() {
            this.showMapWindow = false;
        },
        toggleIframe(e) {
            this.iframeVisible = !this.iframeVisible;
            console.log(e)
            if (this.iframeVisible) {
                // 设置 iframe 的 src
                this.iframeSrc = e; // 设置默认页面
            }
        },
        closeIframe() {
            this.iframeVisible = false;
        },
        openPopup(e) {
            console.log("open");
            console.log(e);
            this.externalUrl = e;
            this.isOpen = true;
        },
        closePopup() {
            this.isOpen = false;
        },
        // 设置时间
        dataSet() {
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth();//得到月份
            var date = now.getDate();//得到日期
            var day = now.getDay();//得到周几
            var hour = now.getHours();//得到小时
            var minu = now.getMinutes();//得到分钟
            var sec = now.getSeconds();//得到秒
            var MS = now.getMilliseconds();//获取毫秒
            var week;
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
            if (MS < 100) MS = "0" + MS;
            var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
            week = arr_week[day]
            var time = "";
            time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week
            this.dateYear = year
            this.dateMonth = month
            this.dateDate = date
            this.dateHour = hour
            this.dateMinu = minu
            this.dateSec = sec
            this.dateWeek = week
            var timer = setTimeout(() => {
                this.dataSet()
            }, 1000)
        },
        // 绘制echarts
        drawEcharts() {
            // 游览路径矩阵
            this.juzhenCharts = echarts.init(this.$refs.juzhen)
            var profitOption = {
                /*grid: {
                    right: '10%',
                    left: '10%',
                    bottom: '10%',
                    top: '25%'
                },*/
                //pqk 0906
                grid: {
                    right: '11%',
                    left: '10%',
                    bottom: '13%',
                    top: '18%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                        shadowStyle: {
                            color: 'rgba(0,46, 115, 0.3)'
                        }
                    },
                    formatter: function (params) {
                        // console.log(params)
                        var str = params[0].name + "<br>";
                        /*params.forEach(function(v, i) {
                            str += v.seriesName + ": " + v.value + "" + "<br>";
                        });*/
                        //debugger;
                        str += params[0].seriesName + ": " + params[0].value + "人" + "<br>";
                        str += params[1].seriesName + ": " + params[1].value + "%" + "";
                        return str;

                    }
                },
                legend: {
                    data: ['入住人数', '入住率'],
                    //pqk 0906 right: '0', top: '0'
                    left: 'center',
                    top: '5%',
                    textStyle: {
                        color: '#00FFE4',
                        fontSize: 10
                    },
                    itemGap: 20,
                    itemHeight: 15,
                    itemWidth: 15
                },
                calculable: true,
                xAxis: {
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#00FFE4'
                        }
                    },
                    axisTick: {
                        show: false,
                        interval: 0,
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: '0',
                        textStyle: {
                            fontSize: 10,
                            color: '#00FFE4'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: ['#2f46a1']
                        }
                    },
                    data: ['2007', "2008", "2009", "2010", "2011"]
                },
                yAxis: [{
                    type: 'value',
                    name: '',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: ['#2f46a1']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        fontSize: 10,
                        color: '#00FFE4'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 10,
                            color: '#00FFE4'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#00FFE4',
                            fontSize: 10
                        }
                    }
                }, {
                    type: 'value',
                    name: '',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: ['#2f46a1']
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        fontSize: 10,
                        color: '#00FFE4'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize: 10,
                            color: '#00FFE4'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#00FFE4',
                            fontSize: 10
                        }
                    }
                }],
                series: [{
                    name: '入住人数',
                    type: 'bar',
                    barWidth: 'auto',
                    barMaxWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00b8fe'
                                }, {
                                    offset: 1,
                                    color: '#1846a3'
                                }]
                            ),
                            opacity: 0.6,
                            barBorderRadius: 30,
                            barBorderColor: '#00b6fc'
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: [100, 80, 60, 90, 120],
                    zlevel: 9
                }, {
                    name: '入住率',
                    type: 'line',
                    yAxisIndex: 1,
                    symbolSize: 0,
                    itemStyle: {
                        normal: {
                            color: '#ff9c31',
                            borderWidth: 2,
                            backgroundColor: 'red'
                        },
                        emphasis: {
                            borderColor: '#ff9c31'
                        }
                    },
                    smooth: true,
                    data: [500, 100, 400, 300, 900],
                    zlevel: 9
                }]
            };

            var newOption = {
                xAxis: {
                    data: ['经纬民宿', "青岚民宿", "木素民宿", "青年旅社", "创客公寓"]
                },
                series: [{
                    name: '入住人数',
                    data: [28, 48, 118, 206, 188],
                }, {
                    name: '入住率',
                    data: [48.38, 54.77, 61.91, 92.30, 79.36],
                }]
            }
            $.extend(true, profitOption, newOption);
            this.juzhenCharts.setOption(profitOption)

            // 游客基本信息
            // 性别占比
            this.xingbiezhanbiCharts = echarts.init(this.$refs.xingbiezhanbi)
            this.xingbiezhanbiCharts.setOption({
                title: {
                    text: '游客性别占比',
                    x: '5%',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                grid: {
                    top: '4%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['rgba(0, 255, 255, .6)', 'rgba(104,102,251, .6)'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'rect ',
                    itemWidth: 8,
                    itemHeight: 8,
                    top: 20, right: 10,
                    textStyle: { color: '#05F7DC', fontSize: 10 }
                },
                series: [
                    {
                        name: '男女占比',
                        type: 'pie',
                        radius: ['23%', '40%'],
                        center: ['50%', '55%'],
                        data: [
                            { value: 41, name: '男', label: { formatter: "{d}%" } },
                            { value: 58, name: '女', label: { formatter: "{d}%" } },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 20,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: "{d}% ",
                                textStyle: {
                                    fontSize: 10
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 4,
                                length2: 6,
                            }
                        },
                    }
                ]
            })

            // 年龄占比
            this.nianlingzhanbiCharts = echarts.init(this.$refs.nianlingzhanbi)
            this.nianlingzhanbiCharts.setOption({
                title: {
                    text: '游客年龄占比',
                    x: '5%',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                grid: {
                    top: '25%',
                    left: '3%',
                    right: '3%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['0-20', '21-40', '42-60', '61-80', '81-100'],
                    splitLine: { show: false },    //去除网格线
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#5E729F',   //左边线的颜色
                            width: '1'           //坐标线的宽度
                        }
                    },
                    axisLabel: { textStyle: { color: '#05F7DC' } } //坐标值的具体颜色
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    splitLine: { show: false },    //去除网格线
                    gridIndex: 0,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#5E729F',
                            width: '1'
                        }
                    },
                    axisLabel: { textStyle: { color: '#05F7DC' } }
                },
                series: [{
                    data: [18, 43, 11, 9, 1],
                    type: 'bar',
                    barWidth: 15,    // 柱宽
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(86, 255, 255, .8)'
                            }, {
                                offset: 1,
                                color: 'rgba(104,102,251, .4)'
                            }])
                        }
                    }
                }]
            })

            // 共享车总营收
            // 共享车营收
            this.gongxaingyingshouCharts = echarts.init(this.$refs.gongxaingyingshou)
            var cropRightOption = {
                // backgroundColor: '#1B2971',
                title: {
                    text: '停车场容纳量',
                    x: '5%',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                grid: {
                    left: 10,
                    right: '25%',
                    top: 25,
                    bottom: 5,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                        shadowStyle: {
                            color: 'rgba(0,46, 115, 0.3)'
                        }
                    },
                    formatter: function (params) {
                        var str = params[0].name + "<br>";
                        params.forEach(function (v, i) {
                            str += v.value + "个" + "";
                        });
                        return str
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 10,
                        align: 'left',
                        color: function (value, index) {
                            return index >= 7 ? '#EDDE32' : '#6797D2';
                        }
                    }
                },
                yAxis: [{
                    data: ['景区大门', '景区中门', '景区后门'],
                    offset: 0,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 10,
                            color: '#00FFE4'
                        }
                    }
                }],
                xAxis: {
                    max: 'auto',
                    show: false,
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: "{c}",
                            textStyle: {
                                fontSize: 10,
                                color: '#00FFE4'
                            }
                        }
                    },
                    data: [3889, 3900, 4308],
                    barWidth: 'auto',
                    barMaxWidth: '10',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00b8fe'
                                }, {
                                    offset: 1,
                                    color: '#1846a3'
                                }]
                            ),
                            opacity: 0.6,
                            barBorderRadius: 30,
                            barBorderColor: '#00b6fc'
                        },
                        emphasis: {
                            opacity: 1
                        }
                    }
                }]
            };
            var newOption = {
                yAxis: [{
                    data: ['景区大门', '景区中门', '景区后门']
                }],
                series: [{
                    data: [388, 388, 388]
                }]
            }
            $.extend(true, cropRightOption, newOption);
            this.gongxaingyingshouCharts.setOption(cropRightOption)
            // 共享车状态
            this.gongxaingzhaungtaiCharts = echarts.init(this.$refs.gongxaingzhaungtai)
            this.gongxaingzhaungtaiCharts.setOption({
                title: {
                    text: '占用与空置情况',
                    x: '5%',
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                grid: {
                    top: '4%',
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['rgba(0, 255, 255, .6)', 'rgba(123, 104, 238, .6)'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'rect ',
                    itemWidth: 8,
                    itemHeight: 8,
                    top: 20, right: 10,
                    textStyle: { color: '#05F7DC', fontSize: 10 }
                },
                series: [
                    {
                        name: '状态',
                        type: 'pie',
                        radius: ['20%', '40%'],
                        center: ['50%', '60%'],
                        roseType: 'radius',
                        data: [
                            { value: 41, name: '闲置中', label: { formatter: "{d}%" } },
                            { value: 58, name: '占用中', label: { formatter: "{d}%" } },
                        ],
                        label: {
                            normal: {
                                show: true,
                                formatter: "{d}% ",
                                textStyle: {
                                    fontSize: 10
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 4,
                                length2: 6,
                            }
                        },
                    }
                ]
            })
        },
        // 车辆&人员管理 tab点击事件
        tipsClickVehicle(bool) {
            bool ? this.navState = '车辆管理' : this.navState = '人员管理'
            this.vePeBool = bool

            // 车辆 & 人员 列表数据清空
            this.vehicleForm = {
                selVal: '',
                selectVal: ''
            }
            this.vehicleItemBool = false
            this.vehicleCut = 1
            // 车辆 & 人员 列表查询
            this.vePeListSel(this.vePeBool)

            this.vehicleBool = true
        },
        // 车辆&人员管理列表项搜索事件
        handleClickSel() {
            // 车辆 & 人员 列表page数据初始化
            this.vehicleItemBool = false
            this.vehicleCut = 1
            // 车辆 & 人员 列表查询
            this.vePeListSel(this.vePeBool)
        },
        // 车辆&人员 列表页数change
        pageChange(val) {
            this.vehicleCut = val
            // 车辆 & 人员 列表查询
            this.vePeListSel(this.vePeBool)
        },
        // 车辆&人员管理 弹框关闭事件
        vehicleClose() {
            this.vehicleBigBool = false
            this.vehicleBool = false

            this.vehicleItemBool = false
        },
        // 车辆&人员管理 弹框放大缩小
        vehicleBigClick() {
            this.vehicleBigBool ? this.vehicleBigBool = false : this.vehicleBigBool = true
        },
        // 车辆&人员 列表row点击事件
        currentRowTable(currentRow, oldCurrentRow) {

        },
        // 车辆&人员管理-列表点击弹出框关闭事件
        vehicleItemClose() {
            this.vehicleItemBool = false
        },
        // 车辆&人员管理-详情进入事件
        vehicleInfoBtn() {

            // 车辆&人员详情-周概况接口数据
            this.vePeListInfo(this.vePeBool)

            // 获取前七天数据轨迹
            this.trajectoryDate = [new Date(), new Date(new Date().getTime() - 24 * 7 * 60 * 60 * 1000)]
            this.trajectoryDataList = []
            // 车辆&人员 - 轨迹查询方法
            this.trajectoryFun(this.vePeBool)

            this.vehicleItemBool = false
            this.vehicleInfoBool = true
        },
        // 车辆&人员详情-周概况接口数据
        async vePeListInfo(bool) {
            let res
            if (bool) {
                res = await fetchAPI.post('./visual/car/carStatus', {})
            }
            if (!bool) {
                res = await fetchAPI.post('./visual/event/eventStatus', {})
            }
            if (res.code == 200) {
                console.groupCollapsed(`${bool ? '车辆详情' : '人员详情'}-周概况接口数据`)
                console.log(res)
                console.groupEnd()
                this.vePeWeekInfo = res.data
            } else {
                this.$Message.error(res.msg)
            }
        },
        // 车辆&人员 - 轨迹记录查询
        trajectoryClick() {
            // 车辆&人员 - 轨迹查询方法
            this.trajectoryFun(this.vePeBool)
        },
        // 车辆&人员 - 轨迹查询方法
        async trajectoryFun(bool) {
            let arr = [...[new Date(this.trajectoryDate[0]).Format('yyyy-MM-dd hh:mm:ss'), new Date(this.trajectoryDate[1]).Format('yyyy-MM-dd hh:mm:ss')]]
            let id = this.vehicleItemObj.id
            let res

            if (new Date(arr[0]).getTime() > new Date(arr[1]).getTime()) {
                arr.reverse()
            }
            if (bool) {
                res = await fetchAPI.post('./visual/car/history', { time: arr, id: id })
            }
            if (!bool) {
                res = await fetchAPI.post('./visual/event/history', { time: arr, id: id })
            }
            if (res.code == 200) {
                console.groupCollapsed(`${bool ? '车辆' : '人员'}-轨迹接口数据`)
                console.log(res)
                console.groupEnd()
                this.trajectoryDataList = res.data
            } else {
                this.$Message.error(res.msg)
            }
        },
        // 车辆&人员管理-按钮派发事件
        vehicleDistribute() {
            // 派发弹框数据清空
            this.formValidate = {
                object: '',
                date: '',
                level: '',
                fast: '0',
            }

            // 车辆&人员-派发对象
            this.vePeDistribute(this.vePeBool)

            this.vehicleInfoBool = false
            this.vehicleDistributeBool = true
        },
        // 车辆&人员-派发对象接口
        async vePeDistribute(bool) {
            let res = await fetchAPI.post('./visual/car/people', {})
            if (res.code == 200) {
                console.groupCollapsed(`${bool ? '车辆' : '人员'}-派发对象接口`)
                console.log(res)
                console.groupEnd()
                this.vePeDistributeList = res.data
            } else {
                this.$Message.error(res.msg)
            }
        },
        // 车辆&人员管理-详情关闭事件
        vehicleInfoClose() {
            this.vehicleInfoBool = false
            this.vehicleDistributeBool = false
        },
        // 车辆&人员管理-派发提交方法
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.formValidate)
                    this.handleSubmitFun(this.vePeBool)
                } else {
                    console.log(this.formValidate)
                    this.$Message.error('提交失败!')
                }
            })
        },
        // 车辆&人员接口提交方法
        async handleSubmitFun(bool) {
            let c_e_id = this.vehicleItemObj.id
            let user_id = this.formValidate.object
            let end_time = new Date(this.formValidate.date).Format('yyyy-MM-dd')
            let important = this.formValidate.level
            let fast_select = this.formValidate.fast
            let location = this.vehicleItemObj.address
            let res
            if (bool) {
                res = await fetchAPI.post('./visual/car/getCarData', {
                    car_id: c_e_id,
                    user_id: user_id,
                    end_time: end_time,
                    important: important,
                    fast_select: fast_select,
                    location: location,
                    image: ''
                })

            }
            if (!bool) {
                res = await fetchAPI.post('./visual/event/getEventData', {
                    event_id: c_e_id,
                    user_id: user_id,
                    end_time: end_time,
                    important: important,
                    fast_select: fast_select,
                    location: location,
                    image: ''
                })
            }
            if (res.code == 200) {
                console.groupCollapsed(`${bool ? '车辆' : '人员'}-提交方法`)
                console.log(res)
                console.groupEnd()
                this.$Message.success('提交成功!')
                // 关闭弹框
                this.vehicleInfoClose()
                // 车辆 & 人员 列表查询
                this.vePeListSel(this.vePeBool)
            } else {
                this.$Message.error(res.msg)
            }
        },
        kaishi() {
            window.db = null;
            viewer = new Cesium.Viewer('cesiumMap');
            this.viewer = viewer;
            // var webGlobe = new Cesium3DTile.WebSceneControl('GlobeView',{showInfo:true});
            viewer.shouldAnimate = true,               // [ Bool, 是否开启动画 ]
                viewer.requestRenderMode = true,            // [ Bool, 启用请求渲染模式 ]
                viewer.scene3DOnly = false,                 // [ Bool, 每个几何实例将只能以3D渲染以节省GPU内存 ]
                viewer.sceneMode = 3,                       // [ Number,初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode ]
                viewer.fullscreenElement = document.body,   // [ Object, 全屏时渲染的HTML元素 ]
                viewer.scene.globe.depthTestAgainstTerrain = true;
            window.vi = viewer;
            viewer.scene.undergroundMode = false;                                  // [ Bool , 设置开启地下场景 ]
            viewer.scene.terrainProvider.isCreateSkirt = false;                    // [ Bool , 关闭裙边 ]
            viewer.scene.globe.enableLighting = true;                             // [ Bool , 是否添加全球光照，scene(场景)中的光照将会随着每天时间的变化而变化 ]
            viewer.scene.globe.showGroundAtmosphere = true;                        // [ Bool , 是否关闭大气效果 ]
            viewer.scene.globe.depthTestAgainstTerrain = true;                  // [ Bool , 地面以下不可见（高程遮挡） ]
            viewer._cesiumWidget._creditContainer.style.display = "none";          // [ String , 隐藏logo ]
            viewer.scene.globe.depthTestAgainstTerrain = false;
            viewer.terrainShadows = Cesium.ShadowMode.ENABLED;
            viewer.scene.shadowMap.enabled = true;
            viewer.scene.light.intensity = 1.0;
            // viewer.scene.shadowMap.softShadows = true;
            viewer.scene.shadowMap.darkness = 0.5;


            viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                name: "img_arcgis",
                url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
            }));

            scene = viewer.scene;
            camera = viewer.camera;
            console.log(viewer);


            zizhuan = setInterval(function () {
                camera.rotateLeft();
            }, 25)

            //var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            let tiles = new Cesium.Cesium3DTileset({
                //url: "Data/3Dtiles/terra_b3dms/tileset.json",
                url: "Data/3Dtiles/cesiumosgb/tileset.json",
                shadows: Cesium.ShadowMode.ENABLED,
            })
            //console.log(tiles.shadows)
            //console.log(tiles)
            // 创建3D Tiles模型

            // 添加到场景中
            let tileset = viewer.scene.primitives.add(tiles);

            tileset.primitive = new Cesium.Primitive({
                appearance: new Cesium.EllipsoidSurfaceAppearance({
                    material: new Cesium.Material({
                        fabric: {
                            type: 'Cesium3DTileMaterial',
                            uniforms: {
                                // 定义材质的属性
                                diffuse: 'white',
                                specular: 'black',
                                emissive: 'black'
                            }
                        }
                    })
                })
            });

            // 等待模型加载完成
            tileset.readyPromise.then(function (tileset) {
                // 获取模型的变换矩阵
                let modelMatrix = tileset.root.transform.clone();

                // 设置向下平移的距离（例如，向下平移10米）
                let heightOffset = -25.0;

                // 创建一个平移矩阵
                let translation = Cesium.Cartesian3.fromElements(0, 0, heightOffset);
                let translationMatrix = Cesium.Matrix4.fromTranslation(translation);

                // 应用平移矩阵
                Cesium.Matrix4.multiply(modelMatrix, translationMatrix, modelMatrix);
                tileset.root.transform = modelMatrix;
            }).otherwise(function (error) {
                console.log(error);
            });

            //console.log(tileset.shadows)
            window.tileset = tileset;

            document.addEventListener('keydown', function (e) {
                console.log(e);
                switch (e.key) {
                    case "w": camera.moveForward(moveRate); break
                    case "s": camera.moveBackward(moveRate); break
                    //case "a":camera.moveLeft(moveRate);break
                    //case "d":camera.moveRight(moveRate);break
                    case "z": camera.moveUp(moveRate); break
                    case "x": camera.moveDown(moveRate); break
                    case "a": camera.lookLeft(); break
                    case "d": camera.lookRight(); break
                    case "m": moveRate++; break
                    case "n": moveRate--; break
                    case "ArrowDown": camera.moveDown(moveRate); break
                    case "ArrowLeft": camera.moveLeft(moveRate); break
                    case "ArrowUp": camera.moveUp(moveRate); break
                    case "ArrowRight": camera.moveRight(moveRate); break
                    case "p": {
                        window.appk.createModel();
                        // window.appk.moveModelAlongPath();
                        break
                    }
                    case "q": {
                        console.log("当前相机位置：", camera.position);
                        break
                    }
                    case "k": {
                        var head = camera.heading;
                        var pitch = camera.pitch;
                        var roll = camera.roll;
                        console.log("position:" + camera.position + "\nhead:" + head + "\npitch:" + pitch + "\nroll:" + roll);
                        break
                    }
                    case "j": {
                        // 在保存更改时执行的函数
                        // 导出数据库中的数据
                        const data = window.db.export();
                        const blob = new Blob([data], { type: 'application/octet-stream' });

                        // 创建 FormData 对象，用于上传文件
                        const formData = new FormData();
                        formData.append('database', blob, 'mydatabase.db');

                        // 使用 Fetch API 将数据库文件上传到服务器
                        fetch('http://localhost:3000/upload', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Database file uploaded successfully');
                                } else {
                                    console.error('Failed to upload database file');
                                }
                            })
                            .catch(error => {
                                console.error('Error uploading database file:', error);
                            });

                    }
                    case "Escape": {

                        viewer.scene.camera.flyTo({
                            destination: new Cesium.Cartesian3.fromDegrees(114.61321, 30.45914, 300.4), // 世界坐标点
                        })
                    }; break
                    case "l": {
                        // console.log(cameraPointEntity.position);
                        addDrawElement()
                    }; break
                }
            }, false);



            initSqlJs().then(SQL => {
                SQLk = SQL;
                // 通过 Fetch API 加载数据库文件
                fetch('mydatabase.db')
                    .then(response => response.arrayBuffer())
                    .then(buffer => {
                        // 创建一个新的 SQLite 数据库实例
                        window.db = new SQL.Database(new Uint8Array(buffer));

                        // 将 highlight 列的所有值设为 0
                        window.db.exec("UPDATE dormitories SET highlight = 0");

                        // 执行其他操作，如添加图层等
                        this.showvectorSource = new ol.source.Vector();
                        this.showvectorLayer = new ol.layer.Vector({
                            source: this.showvectorSource,
                            style: new ol.style.Style({
                                fill: new ol.style.Fill({
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ffcc33',
                                    width: 2
                                }),
                                image: new ol.style.Circle({
                                    radius: 7,
                                    fill: new ol.style.Fill({
                                        color: '#ffcc33'
                                    })
                                })
                            }),
                            name: '建筑图层'
                        });
                        this.openlayersMap.addLayer(this.showvectorLayer);
                        this.erdrefresh();

                    })
                    .catch(error => {
                        console.error("Error reading database file:", error);
                    });
            }).catch(error => {
                console.error("Error initializing SQL.js:", error);
            });


            layui.use(['layer'], function () {
                layer = layui.layer; // 获取 layer 对象
                console.log("layer 对象是否获取成功：", layer);

                // 将 layer 对象赋值给全局变量
                // this.layer = layer;
                // console.log("全局变量 layer 是否被赋值：", this.layer);

                // 在这里可以使用 layer 对象来显示提示消息和弹出框
                // layer.msg('初始化成功');

                // 后续代码...
                // 配置自定义主题
                layui.config({
                    base: './' // 定义主题目录，这里是根目录
                }).extend({
                    theme: 'new' // new.css 文件名，无需扩展名
                }).use(['theme'], function () {
                    // 添加调试信息
                    console.log('自定义主题已应用');
                });
            });

            // 监听来自 iframe 的消息
            window.addEventListener('message', function (event) {
                // 检查来源是否安全（可选）
                // if (event.origin !== 'http://example.com') return;

                // 获取消息内容
                const data = event.data;
                const position = data.payload.data.position
                // 根据消息内容调用 Vue 实例中的方法
                if (data.action === 'indoor') {
                    if(data.payload.data.bInCampus == 0){
                        viewer.scene.camera.flyTo({
                            destination: new Cesium.Cartesian3(position[0], position[1], position[2]), // 世界坐标点
                            orientation: {
                                heading: 4.6784159152452865,
                                pitch: -0.2199005710200699,
                                roll: 6.278964574356454
                            },
                            duration: 3 // 飞行持续时间
                        }) 
                        setTimeout(function() {
                            document.getElementById("cesiumMap").style.display = "none";
                            const three = document.getElementById("three");
                            three.style.display = "block";
                            window.postMessage({
                                action: 'initThreeJS',
                                payload: {
                                    data: data.payload.data,
                                }
                            }, '*');
                            console.log('post message')
                            
                        }, 3500); // 延迟 3000 毫秒（3 秒）
                    }else{
                        document.getElementById("cesiumMap").style.display = "none";
                            const three = document.getElementById("three");
                            three.style.display = "block";
                            window.postMessage({
                                action: 'initThreeJS',
                                payload: {
                                    data: data.payload.data,
                                }
                            }, '*');
                            console.log('post message')
                    }

                }
            });

        },
        // 进入地图方法
        access() {
            viewer.scene.camera.flyTo({
                // destination: new Cesium.Cartesian3(-2451201.5046990025, 4571284.980416953, 3701213.225177628), // 世界坐标点
                destination: new Cesium.Cartesian3.fromDegrees(114.61321, 30.45914, 300.4), // 世界坐标点
                // orientation: {
                //     heading: 353.33,
                //     pitch: -24.97,
                //     roll: 0.00
                // }
            })
            clearInterval(zizhuan);

        },

        // 进入地图事件
        clickAccess() {
            console.log(viewer);
            window.vi = viewer;
            console.log("启动");
            var pnumel = document.getElementById("people");
            pnum = Math.floor(Math.random() * 2000) + 6000;
            pnumel.innerHTML = String(pnum) + "人";
            peo();


            this.dataSet()
            setTimeout(() => {
                // 地球自转结束
                this.earthRotate(false)
                // 关闭初始化弹层
                this.initBool = false
                // map飞入定位
                //this.access()
                // 显示nav
                setTimeout(() => {
                    this.headBool = true
                    this.navBool = true
                    this.tooltipBool = true
                }, 1500)
                setTimeout(() => {
                    this.selBool = true
                }, 3000)
                setTimeout(() => {
                    this.navNewBool = true
                    this.initEchartsBool = true
                }, 4000)
                // 调用引导
                setTimeout(() => {
                    //this.guide();
                    this.allCheck();
                    this.moveAnimation(true)
                    this.realTimeCar()
                }, 6000)
                this.access()
                setTimeout(() => {

                    var cartesian = new Cesium.Cartesian3(-2291819.48, 5002687.60, 3214334.39);

                    // 将笛卡尔坐标转换为地理坐标（经纬度和高程）
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    var height = cartographic.height;


                    window.ellipse = viewer.entities.add(new Cesium.Entity({
                        // position: Cesium.Cartesian3.fromDegrees(114.61321, 30.44964,32.4),
                        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                        ellipse: {
                            semiMinorAxis: 1000, //椭圆的短半轴
                            semiMajorAxis: 1000, //椭圆的长半轴
                            extrudedHeight: 9.0, //拉伸高度
                            material: Cesium.Color.WHITE.withAlpha(0.2), //椭圆颜色
                            outline: false, //是否显示边框
                            outlineColor: Cesium.Color.BLUE, //边框颜色
                            rotation: Cesium.Math.toRadians(45), //旋转角度,从正北方向开始顺时针旋转
                            shadows: Cesium.ShadowMode.ENABLED,
                        },
                    }));



                    window.ellipse.show = false;


                }, 6000)
                window.adva = {};
                window.meda = {};
                window.parking = {};
                window.parking["place"] = null;
                window.parking["movingcar"] = null;
                window.parking["roadline"] = null;
                window.parking["car"] = [];
                window.parking["cardata"] = null;
                window.parking["placedata"] = null;
                window.meda["road"] = [];
                window.meda["roadtd"] = [];
                window.meda["area"] = [];
                window.meda["po"] = null;
                window.danwei = {};
                window.danwei["shuzhi"] = 1.0;
                window.danwei["mingcheng"] = "米";
                window.waterPrimitive = null;
                window.polygonFeatures = [];
                window.isPolygonClickEnabled = true;
                window.zuiduan = [];
                window.zuimei = []
                water();
                //viewer.flyTo(x);
            }, 500)
        },

        // swiper组件初始化
        swiperInit() {
            let swiper = new Swiper('.gallery-top', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
                spaceBetween: 10,
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // }
            })
        },
        // 图片预览model层关闭
        closeSwiperBox() {
            this.swiperImgBool = false
        },

        // 访问引导方法
        guide() {
            let options = {
                /* 下一步按钮的显示名称 */
                nextLabel: 'Next',
                /* 上一步按钮的显示名称 */
                prevLabel: 'Back',
                /* 跳过按钮的显示名称 */
                skipLabel: 'Skip',
                /* 结束按钮的显示名称 */
                doneLabel: 'Done',
                /* 引导说明框相对高亮说明区域的位置 */
                tooltipPosition: 'bottom',
                /* 引导说明文本框的样式 */
                tooltipClass: '',
                /* 说明高亮区域的样式 */
                highlightClass: '',
                /* 是否使用键盘Esc退出 */
                exitOnEsc: true,
                /* 是否允许点击空白处退出 */
                exitOnOverlayClick: false,
                /* 是否显示说明的数据步骤*/
                showStepNumbers: true,
                /* 是否允许键盘来操作 */
                keyboardNavigation: true,
                /* 是否按键来操作 */
                showButtons: true,
                /* 是否使用点点点显示进度 */
                showBullets: true,
                /* 是否显示进度条 */
                showProgress: false,
                /* 是否滑动到高亮的区域 */
                scrollToElement: true,
                /* 遮罩层的透明度 */
                overlayOpacity: 0.8,
                /* 当位置选择自动的时候，位置排列的优先级 */
                positionPrecedence: ["bottom", "top", "right", "left"],
                /* 是否禁止与元素的相互关联 */
                disableInteraction: false,
                /* 默认提示位置 */
                hintPosition: 'top-middle',
                /* 默认提示内容 */
                hintButtonLabel: 'Got it'
            }
            introJs().setOptions(options).oncomplete(function () {
                //点击跳过按钮后执行的事件
                // console.log('跳过引导')
            }).onexit(function () {
                //点击结束按钮后， 执行的事件
                // console.log('引导结束')
            }).start();
        },

        // nav搜索弹框初始化 关闭所有
        selNavBoxClose() {
            this.noBoxBool = false
            this.tipsboxBool = false
            this.streeBool = false
            this.buildBool = false
            this.houseBool = false
            this.houseInfoBool = false
            this.spotBool = false
            this.spotIdx = 0
            this.publicAreaBool = false
            this.publicAreaIdx = 0
            this.hardwareBool = false

            this.vehicleBigBool = false
            this.vehicleBool = false
            this.vehicleItemBool = false

            this.vehicleInfoBool = false
        },
        // nav搜索栏内容状态处理方法
        selNavState(info) {
            awakenMove(this)
            removeDynamicLayer(viewer, { element: '#one' })
            // 关闭所有弹框
            this.selNavBoxClose()

            // 处理弹框展示
            if (info == '') {
                this.street_id = 0

                this.selClearBool = false
                this.tipsboxBool = true
                // 获取历史数据
                this.tipsHistoryData = this.historyCom('get')
                return
            } else {
                this.selClearBool = true
            }

            if (new RegExp('住户详情', 'g').test(info)) {
                this.houseInfoBool = true
                return
            }
            if (new RegExp('住户', 'g').test(info) || fuzzyQuery(this.houseData, info).arr.length > 0) {
                this.houseData = fuzzyQuery(this.houseData, info).tem
                this.houseBool = true
                return
            }
            if (new RegExp('楼栋', 'g').test(info) || fuzzyQuery(this.buildData, info).arr.length > 0) {
                this.buildData = fuzzyQuery(this.buildData, info).tem
                this.buildBool = true
                return
            }
            if (new RegExp('街道', 'g').test(info) || fuzzyQuery(this.streeData, info).arr.length > 0) {
                this.streeData = fuzzyQuery(this.streeData, info).tem
                this.streeBool = true

                this.street_id = 0

                this.PolyLinePrimitives(this.streeData)
                return
            }
            if (new RegExp('附近景点', 'g').test(info) || new RegExp('景点', 'g').test(info) || new RegExp('附近', 'g').test(info) || fuzzyQuery(this.spotData, info).arr.length > 0) {
                this.spotData = fuzzyQuery(this.spotData, info).tem

                this.spotBool = true
                this.spotInfoBool = false

                if (this.spotData.length > 0 && this.spotData[this.spotIdx].children) {
                    this.addMarkers(this.spotData[this.spotIdx].children, { image: this.spotData[this.spotIdx].cate_image, width: 35, height: 35 })
                }

                return
            }
            if (new RegExp('公共区域', 'g').test(info) || new RegExp('公共', 'g').test(info) || fuzzyQuery(this.publicAreaData, info).arr.length > 0) {
                this.publicAreaData = fuzzyQuery(this.publicAreaData, info).tem

                this.publicAreaBool = true

                if (this.publicAreaData.length > 0 && this.publicAreaData[this.publicAreaIdx].children) {
                    this.addMarkers(this.publicAreaData[this.publicAreaIdx].children, { image: this.publicAreaData[this.publicAreaIdx].cate_image, width: 35, height: 35 })
                }

                return
            }
            if (new RegExp('硬件', 'g').test(info) || new RegExp('硬件设备', 'g').test(info) || fuzzyQuery(this.hardwareData, info).arr.length > 0) {
                this.hardwareData = fuzzyQuery(this.hardwareData, info).tem
                this.hardwareBool = true

                if (this.selectState == 0) {
                    let arr = []
                    for (let i = 0; i < this.hardwareData.length; i++) {
                        arr = arr.concat(this.hardwareData[i].children)
                    }

                    viewer.entities.removeAll()


                    arr.map((item, i) => {
                        imageCanvasBase64(item.icon, (image) => {
                            item.icon = image
                            let options = {
                                name: item.name,
                                position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
                                billboard: { image: item.icon, width: 35, height: 35 },
                            }
                            Object.assign(options, item)
                            let markerObj = viewer.entities.add(options)
                            item.entities_id = markerObj.id
                        })
                    })

                    //this.access()

                } else {
                    this.addMarkers(this.hardwareData[this.selectState - 1].children, { image: this.hardwareData[this.selectState - 1].cate_image, width: 35, height: 35 })
                }

                return
            }
            if (new RegExp('地图量测', 'g').test(info) || fuzzyQuery(this.streeData, info).arr.length > 0) {
                this.streeData = fuzzyQuery(this.streeData, info).tem
                //this.streeBool = true
                //this.street_id = 0
                //this.PolyLinePrimitives(this.streeData)
                mars3d.widget.activate({
                    uri: "widgets/measure/widget.js",
                    filename: "filename"
                });

                return
            }
            if (new RegExp('校园实景', 'g').test(info) || fuzzyQuery(this.streeData, info).arr.length > 0) {
                //this.streeData = fuzzyQuery(this.streeData, info).tem
                //this.streeBool = true
                //this.street_id = 0
                //this.PolyLinePrimitives(this.streeData)
                mars3d.widget.activate({
                    uri: "widgets/_example/widget.js",
                    filename: "filename2"
                });

                return
            }
            if (new RegExp('XXXX', 'g').test(info) || fuzzyQuery(this.streeData, info).arr.length > 0) {
                //this.streeData = fuzzyQuery(this.streeData, info).tem
                //this.streeBool = true
                //this.street_id = 0
                //this.PolyLinePrimitives(this.streeData)
                mars3d.widget.activate({
                    uri: "widgets/_example/widget.js",
                    filename: "filename2"
                });

                return
            }

            // 未识别弹框
            this.noBoxBool = true
        },
        // nav搜索栏获取焦点方法
        searchFocus() {
            // console.log('seach聚焦')
            //debugger;
            this.alertboxBool = true
            this.navBool = false
            this.tooltipBool = false
            this.tooltipAlertBool = false
            this.selNavState(this.selInp)
        },
        // nav搜索栏失去焦点方法
        searchBlur() {
            // console.log('seach失焦')
            // this.alertboxBool = false
            // this.navBool = true
        },
        // nav搜索栏清空方法
        searchClear() {
            this.selInp = ''
            this.alertboxBool = false

            this.tooltipBool = true

            this.navBool = true
            this.tooltipBool = true
            this.tooltipAlertBool = false
            //this.access()
        },
        // nav搜索栏点击搜索-处理事件:保存历史
        searchClick() {
            // 判断是否为可用数据-添加历史
            if (/^([\u4e00-\u9fa5a-z]|[0-9])+$/gi.test(this.selInp)) {
                this.tipsHistoryData.push({
                    name: this.selInp
                })
                this.historyCom('set', this.tipsHistoryData)
            }
        },

        // 默认弹框-历史记录点击&模块点击
        tipsClickItem(name) {
            this.navState = name
            this.selInp = name
            this.searchFocus()
        },
        //新添加的功能位置，代码定位点
        add_classrooms(feature1) {
            var that = this;
            layer.open({
                title: "添加教室",
                content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name" required  lay-verify="required" placeholder="请输入教室名称" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">活跃情况</label>
                        <div class="layui-input-block">
                            <input type="text" name="situations" required  lay-verify="required" placeholder="请输入活跃情况" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">管理员姓名</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminName" required  lay-verify="required" placeholder="请输入管理员姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">管理员电话</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminPhone" required  lay-verify="required" placeholder="请输入管理员电话" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">所属学院</label>
                        <div class="layui-input-block">
                        <input type="text" name="college" required  lay-verify="required" placeholder="请输入所属学院" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    </form>`,
                yes: function (index, layero) {
                    // 获取表单数据
                    var formData = layero.find("form").serializeArray();

                    // 构造数据库记录
                    var record = {
                        name: formData[0].value,
                        situations: formData[1].value,
                        adminname: formData[2].value,
                        adminPhone: formData[3].value,
                        college: formData[4].value,
                        // 此处需要根据实际情况获取绘制的图形位置数据并保存
                        // 例如，假设绘制的图形为多边形，可以通过 feature.getGeometry().getCoordinates() 获取坐标数组
                        geom: JSON.stringify(feature1.getGeometry().getCoordinates()),
                    };

                    // var db=this.db
                    // 保存数据到 SQLite 数据库
                    var sql = `INSERT INTO classrooms (name, situations, adminName, adminPhone, college, geom) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
                    console.log("geom:", record.geom);
                    window.db.run(sql, [record.name, record.situations, record.adminname, record.adminPhone, record.college, record.geom], function (err) {
                        if (err) {
                            console.error("Error inserting record:", err);
                        } else {
                            console.log("Record inserted successfully.");
                        }
                    });

                    layer.close(index);

                    // 延迟一段时间再检索数据
                    setTimeout(() => {
                        that.erdrefresh();
                    }, 1000); // 1秒延迟
                }
            });
        },
        add_office(feature1) {
            var that = this;
            layer.open({
                title: "添加教学楼",
                content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name" required  lay-verify="required" placeholder="请输入教学楼名称" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">楼层高度</label>
                        <div class="layui-input-block">
                            <input type="number" name="height" required  lay-verify="required" placeholder="楼层高度" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">所属学院</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminName" required  lay-verify="required" placeholder="学院名称" autocomplete="off" class="layui-input">
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">教师团队人数</label>
                        <div class="layui-input-block">
                        <input type="number" name="teacherNum" required  lay-verify="required" placeholder="请输入教师人数" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    
                    </form>`,
                yes: function (index, layero) {
                    // 获取表单数据
                    var formData = layero.find("form").serializeArray();

                    // 构造数据库记录
                    var record = {
                        name: formData[0].value,
                        height: formData[1].value,
                        adminName: formData[2].value,
                        teacherNum: formData[3].value,
                        // 此处需要根据实际情况获取绘制的图形位置数据并保存
                        // 例如，假设绘制的图形为多边形，可以通过 feature.getGeometry().getCoordinates() 获取坐标数组
                        geom: JSON.stringify(feature1.getGeometry().getCoordinates()),
                    };

                    // var db=this.db
                    // 保存数据到 SQLite 数据库
                    var sql = `INSERT INTO offices (name, height, adminName, teacherNum, geom) 
                    VALUES (?, ?, ?, ?, ?)`;
                    console.log("geom:", record.geom);
                    window.db.run(sql, [record.name, record.height, record.adminName, record.teacherNum, record.geom], function (err) {
                        if (err) {
                            console.error("Error inserting record:", err);
                        } else {
                            console.log("Record inserted successfully.");
                        }
                    });

                    layer.close(index);
                    // 延迟一段时间再检索数据
                    setTimeout(() => {
                        that.erdrefresh();
                    }, 1000); // 1秒延迟

                }
            });
        },

        add_canting(feature1) {
            var that = this;
            layer.open({
                title: "添加餐厅",
                content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name" required  lay-verify="required" placeholder="请输入餐厅名称" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">餐厅层数</label>
                        <div class="layui-input-block">
                            <input type="number" name="height" required  lay-verify="required" placeholder="餐厅层数" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">管理员姓名</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminName" required  lay-verify="required" placeholder="请输入管理员姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">管理员电话</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminPhone" required  lay-verify="required" placeholder="请输入管理员电话" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    
                    </form>`,
                yes: function (index, layero) {
                    // 获取表单数据
                    var formData = layero.find("form").serializeArray();

                    // 构造数据库记录
                    var record = {
                        name: formData[0].value,
                        height: formData[1].value,
                        adminName: formData[2].value,
                        adminPhone: formData[3].value,
                        // 此处需要根据实际情况获取绘制的图形位置数据并保存
                        // 例如，假设绘制的图形为多边形，可以通过 feature.getGeometry().getCoordinates() 获取坐标数组
                        geom: JSON.stringify(feature1.getGeometry().getCoordinates()),
                    };

                    // var db=this.db
                    // 保存数据到 SQLite 数据库
                    var sql = `INSERT INTO cantings (name, height, adminName, adminPhone, geom) 
                    VALUES (?, ?, ?, ?, ?)`;
                    console.log("geom:", record.geom);
                    window.db.run(sql, [record.name, record.height, record.adminName, record.adminPhone, record.geom], function (err) {
                        if (err) {
                            console.error("Error inserting record:", err);
                        } else {
                            console.log("Record inserted successfully.");
                        }
                    });

                    layer.close(index);

                    // 延迟一段时间再检索数据
                    setTimeout(() => {
                        that.erdrefresh();
                    }, 1000); // 1秒延迟
                }
            });
        },
        add_dorm(feature1) {
            var that = this;
            console.log("执行add—dorm函数啦！");
            layer.open({
                title: "添加宿舍",
                content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">名称</label>
                        <div class="layui-input-block">
                        <input type="text" name="name" required  lay-verify="required" placeholder="请输入宿舍名称" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">宿舍数量</label>
                        <div class="layui-input-block">
                            <input type="number" name="dormitoryNum" required  lay-verify="required" placeholder="请输入宿舍数量" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">4人间数量</label>
                        <div class="layui-input-block">
                            <input type="number" name="fourPeopleRoomNum" required  lay-verify="required" placeholder="请输入4人间数量" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">6人间数量</label>
                        <div class="layui-input-block">
                            <input type="number" name="sixPeopleRoomNum" required  lay-verify="required" placeholder="请输入6人间数量" autocomplete="off" class="layui-input">
                        </div>
                        </div>
                        <div class="layui-form-item">
                        <label class="layui-form-label">管理员姓名</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminName" required  lay-verify="required" placeholder="请输入管理员姓名" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">管理员电话</label>
                        <div class="layui-input-block">
                        <input type="text" name="adminPhone" required  lay-verify="required" placeholder="请输入管理员电话" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">所属学院</label>
                        <div class="layui-input-block">
                        <input type="text" name="college" required  lay-verify="required" placeholder="请输入所属学院" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    </form>`,
                yes: function (index, layero) {
                    // 获取表单数据
                    var formData = layero.find("form").serializeArray();

                    // 构造数据库记录
                    var record = {
                        name: formData[0].value,
                        dormitoryNum: formData[1].value,
                        fourPeopleRoomNum: formData[2].value,
                        sixPeopleRoomNum: formData[3].value,
                        adminName: formData[4].value,
                        adminPhone: formData[5].value,
                        college: formData[6].value,
                        // 此处需要根据实际情况获取绘制的图形位置数据并保存
                        // 例如，假设绘制的图形为多边形，可以通过 feature.getGeometry().getCoordinates() 获取坐标数组
                        geom: JSON.stringify(feature1.getGeometry().getCoordinates()),
                    };

                    // var db=this.db
                    // 保存数据到 SQLite 数据库
                    var sql = `INSERT INTO dormitories (name, dormitoryNum, fourPeopleRoomNum, sixPeopleRoomNum, adminName, adminPhone, college, geom) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                    console.log("geom:", record.geom);
                    window.db.run(sql, [record.name, record.dormitoryNum, record.fourPeopleRoomNum, record.sixPeopleRoomNum, record.adminName, record.adminPhone, record.college, record.geom], function (err) {
                        if (err) {
                            console.error("Error inserting record:", err);
                        } else {
                            console.log("Record inserted successfully.");
                        }
                    });

                    layer.close(index);

                    // 延迟一段时间再检索数据
                    setTimeout(() => {
                        that.erdrefresh();
                    }, 1000); // 1秒延迟
                }
            });
        },
        sltj(sec = 0) {
            var that = this;
            var map = this.openlayersMap;
            var vectorSource2 = new ol.source.Vector();
            // var layer=this.layer;
            console.log(layer);
            console.log(window.parent.appk);
            // console.log("map:",map)
            //关闭点击事件
            // map.removeInteraction(selecti);
            //提示：请在地图上绘制建筑物的轮廓
            layer.msg("请在地图上绘制建筑物的轮廓");

            var draw = new ol.interaction.Draw({
                source: vectorSource2,
                type: "Polygon",
            });
            map.addInteraction(draw);
            draw.on("drawend", function (e) {
                var feature = e.feature;
                console.log(feature);
                //将feature的坐标转换为经纬度
                var coordinates = feature.getGeometry().getCoordinates();
                console.log(coordinates);
                for (let i in coordinates[0]) {
                    coordinates[0][i] = ol.proj.transform(
                        coordinates[0][i],
                        "EPSG:3857",
                        "EPSG:4326"
                    );
                }
                feature.getGeometry().setCoordinates(coordinates);
                var projection = map.getView().getProjection();
                console.log("Projection:", projection.getCode());
                //移除绘制
                map.removeInteraction(draw);
                //添加属性
                if (sec == 1) {
                    that.add_classrooms(feature);
                }
                else if (sec == 2) {
                    that.add_dorm(feature);
                }
                else if (sec == 3) {
                    that.add_office(feature);
                }
                else if (sec == 4) {
                    that.add_canting(feature);
                }
                console.log("fff.");

            }
            );
        },
        draw_classrooms() {
            var stmt = `SELECT id, name, geom ,highlight FROM classrooms`;
            var rows = window.db.exec(stmt);
            console.log("rows:", rows);

            // 创建一个数组来存储所有的多边形要素
            var polygonFeatures = [];

            // window.polygonFeatures=polygonFeatures;

            // 定义普通样式
            var normalStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0, 128, 0, 0.6)' // 绿色的填充颜色
                }),
                stroke: new ol.style.Stroke({
                    color: '#008000', // 绿色的边界颜色
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#008000' // 绿色的圆形颜色
                    })
                })
            });

            // 定义高亮样式
            var highlightStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ff0000'
                    })
                })
            });

            rows[0].values.forEach(row => {
                // 解析 geom 字段中的坐标数组
                var coordinates = JSON.parse(row[2]);

                // 将坐标转换为 EPSG:3857 坐标系
                var transformedCoordinates = coordinates[0].map(coordinate => {
                    return ol.proj.transform(coordinate, "EPSG:4326", "EPSG:3857");
                });

                // 创建多边形的几何对象
                var polygonGeometry = new ol.geom.Polygon([transformedCoordinates]);

                // 获取 highlight 变量的值
                var highlight = row[3];

                // 根据 highlight 的值应用不同的样式
                var style;
                if (highlight === 0) {
                    console.log("使用样式0")
                    style = normalStyle; // 使用一种样式
                } else if (highlight === 1) {
                    console.log("使用样式1")
                    style = highlightStyle; // 使用另一种样式
                }


                // 创建多边形要素，并设置样式
                var polygonFeature = new ol.Feature({
                    geometry: polygonGeometry,
                    name: row[1],
                    id: row[0], // 将数据库中的 ID 作为要素的唯一标识符
                    buildingtypes: "classrooms"
                });
                polygonFeature.setStyle(style); // 设置样式

                // 创建文本标签来显示名称
                var textLabel = new ol.Feature({
                    geometry: new ol.geom.Point(polygonGeometry.getInteriorPoint().getCoordinates()), // 在多边形内部的中心点
                    name: row[1] // 名称
                });

                // 将文本标签添加到要素上
                textLabel.setStyle(new ol.style.Style({
                    text: new ol.style.Text({
                        text: row[1], // 名称
                        font: '18px Arial', // 设置字体大小为18px
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 139, 0.5)' // 设置半透明的深蓝色背景
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#FFFFFF',
                            width: 2
                        })
                    })
                }));

                // 添加多边形要素和文本标签到数组中
                polygonFeatures.push(polygonFeature);
                polygonFeatures.push(textLabel);
            });

            return polygonFeatures
        },
        draw_cantings() {
            var stmt = `SELECT id, name, geom,highlight FROM cantings`;
            var rows = window.db.exec(stmt);

            // 创建一个数组来存储所有的多边形要素
            var polygonFeatures = [];

            // window.polygonFeatures=polygonFeatures;

            // 定义普通样式
            var normalStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(66, 80, 120, 0.7)' // 修改为灰色
                }),
                stroke: new ol.style.Stroke({
                    color: '#3366ff', // 修改为蓝色
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#3366ff' // 修改为蓝色
                    })
                })
            });
            // 定义高亮样式
            var highlightStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ff0000'
                    })
                })
            });
            rows[0].values.forEach(row => {
                // 解析 geom 字段中的坐标数组
                var coordinates = JSON.parse(row[2]);

                // 将坐标转换为 EPSG:3857 坐标系
                var transformedCoordinates = coordinates[0].map(coordinate => {
                    return ol.proj.transform(coordinate, "EPSG:4326", "EPSG:3857");
                });

                // 创建多边形的几何对象
                var polygonGeometry = new ol.geom.Polygon([transformedCoordinates]);


                // 获取 highlight 变量的值
                var highlight = row[3];

                // 根据 highlight 的值应用不同的样式
                var style;
                if (highlight === 0) {
                    console.log("使用样式0")
                    style = normalStyle; // 使用一种样式
                } else if (highlight === 1) {
                    console.log("使用样式1")
                    style = highlightStyle; // 使用另一种样式
                }


                // 创建多边形要素，并设置样式
                var polygonFeature = new ol.Feature({
                    geometry: polygonGeometry,
                    name: row[1],
                    id: row[0], // 将数据库中的 ID 作为要素的唯一标识符
                    buildingtypes: "cantings"
                });
                polygonFeature.setStyle(style); // 设置样式

                // 创建文本标签来显示名称
                var textLabel = new ol.Feature({
                    geometry: new ol.geom.Point(polygonGeometry.getInteriorPoint().getCoordinates()), // 在多边形内部的中心点
                    name: row[1] // 名称
                });

                // 将文本标签添加到要素上
                textLabel.setStyle(new ol.style.Style({
                    text: new ol.style.Text({
                        text: row[1], // 名称
                        font: '18px Arial', // 设置字体大小为18px
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 139, 0.5)' // 设置半透明的深蓝色背景
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#FFFFFF',
                            width: 2
                        })
                    })
                }));

                // 添加多边形要素和文本标签到数组中
                polygonFeatures.push(polygonFeature);
                polygonFeatures.push(textLabel);
            });

            return polygonFeatures
        },
        draw_offices() {
            var stmt = `SELECT id, name, geom,highlight FROM offices`;
            var rows = window.db.exec(stmt);

            // 创建一个数组来存储所有的多边形要素
            var polygonFeatures = [];

            // window.polygonFeatures=polygonFeatures;
            // 定义高亮样式
            var normalStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(128, 0, 128, 0.6)' // 紫色的填充颜色
                }),
                stroke: new ol.style.Stroke({
                    color: '#800080', // 紫色的边界颜色
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#800080' // 紫色的圆形颜色
                    })
                })
            });
            // 定义高亮样式
            var highlightStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ff0000'
                    })
                })
            });

            rows[0].values.forEach(row => {
                // 解析 geom 字段中的坐标数组
                var coordinates = JSON.parse(row[2]);

                // 将坐标转换为 EPSG:3857 坐标系
                var transformedCoordinates = coordinates[0].map(coordinate => {
                    return ol.proj.transform(coordinate, "EPSG:4326", "EPSG:3857");
                });

                // 创建多边形的几何对象
                var polygonGeometry = new ol.geom.Polygon([transformedCoordinates]);


                // 获取 highlight 变量的值
                var highlight = row[3];

                // 根据 highlight 的值应用不同的样式
                var style;
                if (highlight === 0) {
                    console.log("使用样式0")
                    style = normalStyle; // 使用一种样式
                } else if (highlight === 1) {
                    console.log("使用样式1")
                    style = highlightStyle; // 使用另一种样式
                }


                // 创建多边形要素，并设置样式
                var polygonFeature = new ol.Feature({
                    geometry: polygonGeometry,
                    name: row[1],
                    id: row[0], // 将数据库中的 ID 作为要素的唯一标识符
                    buildingtypes: "offices"
                });
                polygonFeature.setStyle(style); // 设置样式

                // 创建文本标签来显示名称
                var textLabel = new ol.Feature({
                    geometry: new ol.geom.Point(polygonGeometry.getInteriorPoint().getCoordinates()), // 在多边形内部的中心点
                    name: row[1] // 名称
                });

                // 将文本标签添加到要素上
                textLabel.setStyle(new ol.style.Style({
                    text: new ol.style.Text({
                        text: row[1], // 名称
                        font: '18px Arial', // 设置字体大小为18px
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 139, 0.5)' // 设置半透明的深蓝色背景
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#FFFFFF',
                            width: 2
                        })
                    })
                }));

                // 添加多边形要素和文本标签到数组中
                polygonFeatures.push(polygonFeature);
                polygonFeatures.push(textLabel);
            });

            return polygonFeatures
        },
        test_app() {
            console.log("wwwwwwaaak!");
        },
        showData() {
            console.log("wwwwwwaaak5.0!");
            this.toggleIframe("widgets/two-dimension/chaxun/xinxi.html");
        },

        erdrefresh() {

            console.log("erdrefresh6.0");
            var classroomsFeature = this.draw_classrooms();
            var cantingFeature = this.draw_cantings();
            var officeFeature = this.draw_offices();
            // 清空之前绘制的图形
            this.showvectorSource.clear(); // 清空之前的要素

            // 执行查询获取数据
            var stmt = `SELECT id, name, geom, highlight FROM dormitories`;
            var rows = window.db.exec(stmt);
            console.log("rows:", rows);

            // 创建一个数组来存储所有的多边形要素
            var polygonFeatures = [];

            // window.polygonFeatures=polygonFeatures;

            // 定义普通样式
            var normalStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(128,100 , 50, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            });
            var highlightStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 0, 0, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ff0000'
                    })
                })
            });
            // 处理查询结果
            rows[0].values.forEach(row => {
                // 解析 geom 字段中的坐标数组
                var coordinates = JSON.parse(row[2]);

                // 将坐标转换为 EPSG:3857 坐标系
                var transformedCoordinates = coordinates[0].map(coordinate => {
                    return ol.proj.transform(coordinate, "EPSG:4326", "EPSG:3857");
                });

                // 创建多边形的几何对象
                var polygonGeometry = new ol.geom.Polygon([transformedCoordinates]);

                // 获取 highlight 变量的值
                var highlight = row[3];

                // 根据 highlight 的值应用不同的样式
                var style;
                if (highlight === 0) {
                    console.log("使用样式0")
                    style = normalStyle; // 使用一种样式
                } else if (highlight === 1) {
                    console.log("使用样式1")
                    style = highlightStyle; // 使用另一种样式
                }

                // 创建多边形要素，并设置样式
                var polygonFeature = new ol.Feature({
                    geometry: polygonGeometry,
                    name: row[1],
                    id: row[0], // 将数据库中的 ID 作为要素的唯一标识符
                    buildingtypes: "dormitories"
                });
                polygonFeature.setStyle(style); // 设置样式

                // 创建文本标签来显示名称
                var textLabel = new ol.Feature({
                    geometry: new ol.geom.Point(polygonGeometry.getInteriorPoint().getCoordinates()), // 在多边形内部的中心点
                    name: row[1] // 名称
                });

                // 将文本标签添加到要素上
                textLabel.setStyle(new ol.style.Style({
                    text: new ol.style.Text({
                        text: row[1], // 名称
                        font: '18px Arial', // 设置字体大小为18px
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 139, 0.5)' // 设置半透明的深蓝色背景
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#FFFFFF',
                            width: 2
                        })
                    })
                }));

                // 添加多边形要素和文本标签到数组中
                polygonFeatures.push(polygonFeature);
                polygonFeatures.push(textLabel);
            });
            console.log(polygonFeatures);
            polygonFeatures = polygonFeatures.concat(classroomsFeature)
            polygonFeatures = polygonFeatures.concat(cantingFeature)
            polygonFeatures = polygonFeatures.concat(officeFeature)


            // 创建矢量源并将所有多边形要素添加到其中
            this.showvectorSource = new ol.source.Vector({
                features: polygonFeatures,
            });

            // 将矢量源设置为图层的数据源
            this.showvectorLayer.setSource(this.showvectorSource);

            this.updateMap();


            // 在 Cesium 场景中生成多边形墙壁
            // this.loadPolygonWalls();

            // 点击事件处理函数
            this.openlayersMap.on('click', (event) => {
                if (typeof window.txdjs === 'undefined') return; // 如果变量未定义，则不执行任何操作

                if (window.txdjs === 0) {
                    // txdjs 为 0 时点击无任何作用
                    return;
                }

                if (window.txdjs === 1) {
                    // txdjs 为 1 时执行原代码
                    this.openlayersMap.forEachFeatureAtPixel(event.pixel, (feature) => {
                        // 获取点击的多边形要素的唯一标识符
                        var id = feature.get('id');
                        var buildingtypes = feature.get('buildingtypes');
                        if (buildingtypes == 'dormitories') {
                            this.openPopup('widgets/two-dimension/sushe/sushe.html?id=' + id);
                        }
                        if (buildingtypes == 'classrooms') {
                            console.log('教学楼' + id + '号');
                        }
                        if (buildingtypes == 'cantings') {
                            console.log('食堂' + id + '号');
                        }
                        if (buildingtypes == 'offices') {
                            console.log('学院楼' + id + '号');
                        }
                        // // 根据标识符从数据库中检索信息并打印
                        // var stmt = `SELECT * FROM dormitories WHERE id = ${id}`;
                        // var row = window.db.exec(stmt);
                        // console.log("Info for feature with id", id, ":", row[0].values);
                    });
                }

                if (window.txdjs === 2) {
                    // txdjs 为 2 时获取 ID 并直接删除对应行的数据
                    this.openlayersMap.forEachFeatureAtPixel(event.pixel, (feature) => {
                        // 获取点击的多边形要素的唯一标识符
                        var id = feature.get('id');
                        var buildingtypes = feature.get('buildingtypes');
                        // 删除数据库中对应 ID 的数据
                        var stmt = `DELETE FROM ${buildingtypes} WHERE id = ${id}`;
                        window.db.exec(stmt);
                        console.log("Deleted feature with id", id);
                        // 可选择刷新地图或移除该要素
                        window.parent.appk.erdrefresh(); // 这里假设有一个刷新地图的方法
                    });
                }
            });


            this.updateMap();
        },


        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async sandrefresh() {
            // 检查SQLite数据库是否已经加载
            if (!window.db) {
                console.error('SQLite数据库未加载');
                return;
            }

            let viewer = window.vi;

            // 设置相机位置和方向
            let defaultPosition = Cesium.Cartesian3.fromDegrees(0, 0, 10000000); // 初始位置在经纬度原点上方10,000 km
            let heading = Cesium.Math.toRadians(0); // 设置相机的方向
            let pitch = Cesium.Math.toRadians(-30); // 设置相机的俯视角度
            let range = 10000000; // 设置相机到目标点的距离

            viewer.camera.lookAt(defaultPosition, new Cesium.HeadingPitchRange(heading, pitch, range));

            // 查询数据库中的数据
            try {
                let stmt = window.db.prepare("SELECT * FROM Places WHERE hide = 0");
                while (stmt.step()) {
                    let row = stmt.getAsObject();
                    let position = JSON.parse(row.position);  // 假设position存储为JSON字符串
                    let name = row.name;

                    // 将经纬度坐标转换为世界坐标系
                    let worldPosition = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height || 0);

                    // 创建点和标签实体，使用世界坐标系
                    viewer.entities.add({
                        position: worldPosition,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.RED,
                        },
                        label: {
                            text: name,
                            font: '14pt monospace',
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset: new Cesium.Cartesian2(0, -20), // 偏移量，使标签位于点的上方
                        },
                    });
                }
                stmt.free();  // 释放资源
            } catch (error) {
                console.error('数据库读取错误: ', error);
            }
        },

        async convertAndAddPolylines() {
            var anps = window.zuiduan;
            // 检查是否有三维坐标数组
            if (!anps || anps.length === 0 || !window.zuimei || window.zuimei.length === 0) {
                console.error('没有找到有效的三维坐标组或黄色折线数据组');
                return;
            }

            // 检查是否已经存在红色和黄色折线图层
            let redLayer = this.openlayersMap.getLayers().getArray().find(layer => layer.get('name') === '红色路径');
            let yellowLayer = this.openlayersMap.getLayers().getArray().find(layer => layer.get('name') === '黄色路径');

            // 如果存在，先移除这两个图层
            if (redLayer || yellowLayer) {
                if (redLayer) {
                    this.openlayersMap.removeLayer(redLayer);
                    console.log('移除了红色折线图层');
                }
                if (yellowLayer) {
                    this.openlayersMap.removeLayer(yellowLayer);
                    console.log('移除了黄色折线图层');
                }
                return; // 移除后不再执行任何操作
            }

            // 创建红色折线的二维坐标组
            let redCoordinates = [];
            for (let i = 0; i < anps.length; i++) {
                let cartesian3 = anps[i];

                // 将笛卡尔坐标转换为经纬度坐标
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
                let longitude = Cesium.Math.toDegrees(cartographic.longitude);
                let latitude = Cesium.Math.toDegrees(cartographic.latitude);

                // 将经纬度坐标转换为二维坐标（OpenLayers中的经纬度格式）
                let coordinate = [longitude, latitude];
                redCoordinates.push(coordinate);
            }

            // 创建黄色折线的二维坐标组
            let yellowCoordinates = [];
            for (let i = 0; i < window.zuimei.length; i++) {
                let cartesian3 = window.zuimei[i];

                // 将笛卡尔坐标转换为经纬度坐标
                let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
                let longitude = Cesium.Math.toDegrees(cartographic.longitude);
                let latitude = Cesium.Math.toDegrees(cartographic.latitude);

                // 将经纬度坐标转换为二维坐标（OpenLayers中的经纬度格式）
                let coordinate = [longitude, latitude];
                yellowCoordinates.push(coordinate);
            }

            // 在OpenLayers地图上分别添加红色折线和黄色折线
            if (this.openlayersMap && this.openlayersMap.addLayer) {
                // 创建红色折线图层
                let redLineString = new ol.geom.LineString(redCoordinates).transform('EPSG:4326', this.openlayersMap.getView().getProjection());
                let redFeature = new ol.Feature({
                    geometry: redLineString,
                    name: 'Red Line'
                });

                let redVectorSource = new ol.source.Vector({
                    features: [redFeature]
                });

                let redVectorLayer = new ol.layer.Vector({
                    source: redVectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 4
                        })
                    }),
                    name: '红色路径'
                });

                this.openlayersMap.addLayer(redVectorLayer);

                // 创建黄色折线图层
                let yellowLineString = new ol.geom.LineString(yellowCoordinates).transform('EPSG:4326', this.openlayersMap.getView().getProjection());
                let yellowFeature = new ol.Feature({
                    geometry: yellowLineString,
                    name: 'Yellow Line'
                });

                let yellowVectorSource = new ol.source.Vector({
                    features: [yellowFeature]
                });

                let yellowVectorLayer = new ol.layer.Vector({
                    source: yellowVectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'yellow',
                            width: 4
                        })
                    }),
                    name: '黄色路径'
                });

                this.openlayersMap.addLayer(yellowVectorLayer);

                console.log('红色折线图层和黄色折线图层已添加到地图');
            } else {
                console.error('OpenLayers地图未初始化或不可用');
            }
        },


        // Fetch geom data from database and convert to Cesium coordinates
        async fetchAndConvertGeoms() {
            const tables = ['dormitories', 'classrooms', 'offices', 'cantings'];

            // 检查是否已经存在模型
            if (this.wallEntities.length > 0) {
                // 如果存在，删除已存在的模型
                this.wallEntities.forEach(entity => {
                    this.viewer.entities.remove(entity);
                });
                this.wallEntities = [];
                console.log('已存在的模型已删除');
                return; // 删除后不再执行任何操作
            }

            tables.forEach(table => {
                // 查询每个表的数据
                const result = window.db.exec(`SELECT id, geom FROM ${table}`);

                if (result[0] && result[0].values) {
                    result[0].values.forEach(row => {
                        const id = row[0];
                        const geom = JSON.parse(row[1]); // 假设 geom 是存储为 JSON 字符串
                        const cartesianCoordinates = this.convertToCesiumCoordinates(geom);
                        if (cartesianCoordinates.length > 0) {
                            this.addWall(cartesianCoordinates, id, table);
                        }
                    });
                }
            });
        },

        // Convert array of [longitude, latitude] to Cesium Cartesian3
        convertToCesiumCoordinates(geom) {
            return geom.map(coordSet => {
                if (Array.isArray(coordSet)) {
                    return coordSet.map(coords => {
                        if (Array.isArray(coords) && coords.length === 2) {
                            const [longitude, latitude] = coords;
                            if (!isNaN(longitude) && !isNaN(latitude)) {
                                return Cesium.Cartesian3.fromDegrees(longitude, latitude, 0); // Set height to 0
                            } else {
                                console.error('Invalid coordinates:', coords);
                                return null;
                            }
                        } else {
                            console.error('Invalid coordinate pair:', coords);
                            return null;
                        }
                    }).filter(coord => coord !== null);
                } else {
                    console.error('Invalid coordinate set:', coordSet);
                    return null;
                }
            }).filter(coordSet => coordSet !== null);
        },

        // Convert Cartesian coordinates to Cesium Cartesian3
        convertToCesiumCartesian(x, y, z) {
            return new Cesium.Cartesian3(x, y, z);
        },

        // Add wall to Cesium viewer
        addWall(cartesianCoordinates, id, buildingType) {
            // Flatten the nested arrays to create a single array of coordinates
            const flattenedCoordinates = cartesianCoordinates.flat();

            // Ensure the wall forms a loop by adding the first point at the end
            flattenedCoordinates.push(flattenedCoordinates[0]);

            // Convert Cartesian coordinates to Cartographic (lon, lat, height)
            const cartographicCoordinates = flattenedCoordinates.map(cartesian => {
                return Cesium.Cartographic.fromCartesian(cartesian);
            });

            // Convert Cartographic coordinates to Cesium Cartesian3
            const positions = cartographicCoordinates.map(cartographic => {
                return Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
            });

            // Set wall color based on buildingType
            let wallColor;
            switch (buildingType) {
                case 'dormitories':
                    wallColor = Cesium.Color.fromCssColorString('#ffcc33').withAlpha(0.5);
                    break;
                case 'cantings':
                    wallColor = Cesium.Color.fromCssColorString('#3366ff').withAlpha(0.5);
                    break;
                case 'classrooms':
                    wallColor = Cesium.Color.fromCssColorString('#098207').withAlpha(0.5);
                    break;
                case 'offices':
                    wallColor = Cesium.Color.fromCssColorString('#872083').withAlpha(0.5);
                    break;
                default:
                    wallColor = Cesium.Color.RED.withAlpha(0.5);
                    break;
            }

            // Create and add the wall
            const wallEntity = this.viewer.entities.add({
                name: 'Generated Wall',
                wall: {
                    positions: positions,
                    maximumHeights: positions.map(() => 100), // 设置墙壁的最大高度
                    minimumHeights: positions.map(() => 10), // 设置墙壁的最小高度
                    material: wallColor
                },
                properties: {
                    id: id, // Bind the database id to the entity
                    buildingType: buildingType // Add the building type to the entity properties
                }
            });

            // Store the generated wall entity
            this.wallEntities.push(wallEntity);

            // Adjust the camera view
            const firstPosition = cartographicCoordinates[0];
            this.viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromRadians(firstPosition.longitude, firstPosition.latitude, 1000),
                duration: 2
            });
        },

        // Clear existing walls and load new ones
        loadAndRenderWalls() {
            // Remove existing wall entities
            this.wallEntities.forEach(entity => {
                this.viewer.entities.remove(entity);
            });
            this.wallEntities = [];

            // Fetch and render new walls
            this.fetchAndConvertGeoms();
        },

        // Initialize Cesium viewer
        initializeCesium() {
            this.fetchAndConvertGeoms();
        },

        createModel() {
            const position = new Cesium.Cartesian3(-2291618.70, 5002790.58, 3214336.61);

            // 创建实体
            this.modelEntity = this.viewer.entities.add({
                name: 'Vehicle',
                position: position,
                model: {
                    uri: 'CesiumMilkTruck/CesiumMilkTruck.glb',
                    scale: 1.0,
                    minimumPixelSize: 64
                }
            });
        },
        moveModelAlongPath() {
            const path = [
                new Cesium.Cartesian3(-2291618.70, 5002790.58, 3214336.61),
                new Cesium.Cartesian3(-2291676.42, 5002773.76, 3214322.16),
                new Cesium.Cartesian3(-2291747.34, 5002739.69, 3214324.21),
                new Cesium.Cartesian3(-2291729.21, 5002707.23, 3214387.39),
                new Cesium.Cartesian3(-2291780.90, 5002669.82, 3214408.62),
                new Cesium.Cartesian3(-2291767.45, 5002649.09, 3214449.59),
                new Cesium.Cartesian3(-2291646.96, 5002709.38, 3214443.00)
            ];

            let currentIndex = 0;
            let time = Cesium.JulianDate.now();
            const speed = 10; // 设置移动速度

            const positionProperty = new Cesium.SampledPositionProperty();

            this.modelEntity.position = positionProperty;

            const updatePosition = () => {
                const currentPosition = path[currentIndex];
                const nextIndex = (currentIndex + 1) % path.length;
                const nextPosition = path[nextIndex];

                const distance = Cesium.Cartesian3.distance(currentPosition, nextPosition);
                const timeInterval = distance / speed;

                time = Cesium.JulianDate.addSeconds(time, timeInterval, new Cesium.JulianDate());

                positionProperty.addSample(time, nextPosition);

                currentIndex = nextIndex;

                // 递归调用以持续移动模型
                setTimeout(updatePosition, timeInterval * 1000);
            };

            // 开始移动
            updatePosition();
        },
        expandLeft() {
            this.closePopup()
            this.leftWidth = (parseFloat(this.leftWidth) - 50).toFixed(2) + "%";
            this.rightWidth = (parseFloat(this.rightWidth) + 50).toFixed(2) + "%";
            this.updateMap();

        },
        expandRight() {
            this.closePopup()
            this.leftWidth = (parseFloat(this.leftWidth) + 50).toFixed(2) + "%";
            this.rightWidth = (parseFloat(this.rightWidth) - 50).toFixed(2) + "%";
            this.updateMap();
        },
        realtime() {
            this.rightWidth = "0%";
            this.therightWidth = "0%";
            this.updateMap();
        },
        updateMap() {
            this.switchstatues = (parseInt(this.leftWidth) / 50);
            console.log(this.switchstatues);

            // 获取地图对象
            var openlayersMap = this.openlayersMap;

            // 更新地图大小
            setTimeout(() => { // 添加一个延迟以确保DOM更新
                openlayersMap.updateSize();
            }, 1000);
        },
        roadpath() {
            window.parent.document.location.href = 'widgets/tilescut/view.html'
        },
        xdtxs() {
            this.isMapVisible = !this.isMapVisible;
        },
        heatmapcon() {
            console.log("heatmap显隐")
            // this.heatmapDataSource.show=!this.heatmapDataSource.show
            this.heatmapLayer.setVisible(!this.heatmapLayer.getVisible());
        },
        initialheatmap() {
            // 创建一个热力图数据源
            var heatmapSource = new ol.source.Vector();

            // 添加热力图数据
            var minX = 114.61073854534085;
            var minY = 30.45780955332316;
            var maxX = 114.61675247242924;
            var maxY = 30.462376679452;

            // 生成随机点
            for (var i = 0; i < 5000; i++) {
                var randomLon = Math.random() * (maxX - minX) + minX;
                var randomLat = Math.random() * (maxY - minY) + minY;
                var weight = Math.random() * (1 - 0.1) + 0.1; // 随机权重值
                var feature = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([randomLon, randomLat])),
                    weight: weight
                });
                heatmapSource.addFeature(feature);
            }

            // 创建一个热力图图层
            var heatmapLayer = new ol.layer.Heatmap({
                source: heatmapSource,
                blur: 15, // 模糊程度
                radius: 8, // 热力图半径
                maxOpacity: 0.85, // 最大不透明度
                minOpacity: 0.16,  //最小不透明度
                weight: function (feature) {
                    return feature.get('weight');
                },
                name: "热力图1"
            });
            this.heatmapLayer = heatmapLayer;
            // 添加热力图图层到地图中
            this.openlayersMap.addLayer(heatmapLayer);
            this.heatmapLayer.setVisible(!this.heatmapLayer.getVisible());
        },
        CamflyTo(x, y, z, heading, pitch, roll) {
            viewer.scene.camera.flyTo({
                destination: new Cesium.Cartesian3(x, y, z),
                orientation: {
                    heading: heading,
                    pitch: pitch,
                    roll: roll
                }
            })
        },
        // 左下角工具按钮点击事件
        tooltipBoxClick() {
            this.tooltipAlertBool ? this.tooltipAlertBool = false : this.tooltipAlertBool = true
        },
        // 仿max缩放方法调用方法
        scaleFun(bool) {
            let win = document.getElementById("w0_window")
            let w0 = document.getElementById("w0")
            canvas = document.querySelector("#canvas-box")

            if (w0.getAttribute("lock") === "false") {
                w0.setAttribute("lock", "true");
                canvas.width = document.body.offsetWidth;
                canvas.height = w0.offsetTop - win.offsetTop;
                canvas.style.top = win.offsetTop + "px";
                canvas.style.zIndex = 1;
                win.style.visibility = "hidden";
                let s1 = win.offsetLeft;
                let s2 = win.offsetLeft + win.offsetWidth;
                let p1 = w0.offsetLeft;
                let p2 = w0.offsetLeft + w0.offsetWidth;
                let cname = w0.className;
                if (!bool) {
                    scale(s1, s2, p1, p2, "zoomout", function () {
                        canvas.style.zIndex = -1;
                        w0.setAttribute("lock", "false");
                    });
                    w0.className = cname + " folded";
                } else {
                    scale(s1, s2, p1, p2, "zoomin", function () {
                        canvas.style.zIndex = -1;
                        win.style.visibility = "visible";
                        w0.setAttribute("lock", "false");
                    });
                    w0.className = cname.replace(" folded", "");
                }
            }
        },
        // 多选框组change事件
        checkboxChange() {
            let spotCheckbox = this.spotCheckbox
            let hardwareCheckbox = this.hardwareCheckbox
            let publicCheckbox = this.publicCheckbox
            spotCheckbox.map((item, i) => {
                // console.log(this.spotData[item])
                this.addMarkers(this.spotData[item].children, { image: this.spotData[item].cate_image, width: 35, height: 35 })
            })
            hardwareCheckbox.map((item, i) => {
                // console.log(this.hardwareData[item])
                this.addMarkers(this.hardwareData[item].children, { image: this.hardwareData[item].cate_image, width: 35, height: 35 })
            })
            publicCheckbox.map((item, i) => {
                // console.log(this.publicAreaData[item])
                this.addMarkers(this.publicAreaData[item].children, { image: this.publicAreaData[item].cate_image, width: 35, height: 35 })
            })
        },
        // 多选框全选方法
        allCheck() {
            let arr1 = [], arr2 = [], arr3 = []
            for (let i = 0; i < this.spotData.length; i++) {
                arr1.push(i)
            }
            for (let i = 0; i < this.hardwareData.length; i++) {
                arr2.push(i)
            }
            for (let i = 0; i < this.publicAreaData.length; i++) {
                arr3.push(i)
            }

            this.spotCheckbox = arr1
            this.hardwareCheckbox = arr2
            this.publicCheckbox = arr3
            this.checkboxChange()
        },

        // 地球自转控制 bool-true开启 bool-false结束
        earthRotate(bool) {
            if (bool) {
                viewer.clock.onTick.addEventListener(this.rotate)
            } else {
                viewer.clock.onTick.removeEventListener(this.rotate)
            }
        },
        // 地球自转方法
        rotate() {
            // console.log('执行自转')
            let a = .1
            let t = Date.now()
            let n = (t - nowI) / 1e3
            nowI = t
            viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -a * n)
        },
        // Map地图初始化方法
        mapInit() {
            console.log(Cesium.VERSION);
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MDZiODg5ZS0yMTYwLTQwNzgtODNkMi0xMjk5NzU1NDMzYTciLCJpZCI6MTM0MTUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjMyNTQ1ODF9.ZSTW9uIkKQKW2hO3KsHdBRJ-udZ4tWMEChZCSslFTyw'
            // 初始化 Map 对象
            viewer = new Cesium.Viewer('cesiumContainer', {
                animation: false,                   // [ Bool, 是否显示动画控件 ]
                shouldAnimate: true,               // [ Bool, 是否开启动画 ]
                homeButton: false,                  // [ Bool, 是否显示Home按钮 ]
                vrButton: false,                    // [ Bool, 是否显示vr按钮 ]
                fullscreenButton: false,            // [ Bool, 是否显示全屏按钮 ]
                baseLayerPicker: false,             // [ Bool, 是否显示图层选择控件 ]
                geocoder: false,                    // [ Bool, 是否显示地名查找控件 ]
                timeline: false,                    // [ Bool, 是否显示时间线控件 ]
                sceneModePicker: true,              // [ Bool, 是否显示投影方式控件 ]
                navigationHelpButton: false,        // [ Bool, 是否显示帮助信息控件 ]
                infoBox: false,                     // [ Bool, 是否显示点击要素之后显示的信息 ]
                requestRenderMode: true,            // [ Bool, 启用请求渲染模式 ]
                scene3DOnly: false,                 // [ Bool, 每个几何实例将只能以3D渲染以节省GPU内存 ]
                sceneModePicker: false,             // [ Bool, 是否显示场景切换控件 ]
                sceneMode: 3,                       // [ Number,初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode ]
                fullscreenElement: document.body,   // [ Object, 全屏时渲染的HTML元素 ]
            })

            // 清除默认的第一个影像 bing地图影像
            viewer.imageryLayers.remove(viewer.imageryLayers.get(0))

            viewer.scene.undergroundMode = false                                  // [ Bool , 设置开启地下场景 ]
            // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50     // [ Number ,设置相机最小缩放距离,距离地表n米 ]
            viewer.scene.terrainProvider.isCreateSkirt = false                    // [ Bool , 关闭裙边 ]
            viewer.scene.globe.enableLighting = true                              // [ Bool , 是否添加全球光照，scene(场景)中的光照将会随着每天时间的变化而变化 ]
            viewer.scene.globe.showGroundAtmosphere = true                        // [ Bool , 是否关闭大气效果 ]
            viewer.scene.globe.depthTestAgainstTerrain = true                  // [ Bool , 地面以下不可见（高程遮挡） ]
            viewer._cesiumWidget._creditContainer.style.display = "none"          // [ String , 隐藏logo ]

            viewer._cesiumWidget._supportsImageRenderingPixelated = Cesium.FeatureDetection.supportsImageRenderingPixelated();
            viewer._cesiumWidget._forceResize = true;
            if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
                var vtxf_dpr = window.devicePixelRatio;
                // 适度降低分辨率
                while (vtxf_dpr >= 2.0) {
                    vtxf_dpr /= 2.0;
                }
                //alert(dpr);
                viewer.resolutionScale = vtxf_dpr;
            }
            //地图底图
            var arcLayer = mars3d.layer.createImageryProvider({
                "type": "arcgis_cache",
                "url": "/zjl/_alllayers/L{arc_z}/R{arc_y}/C{arc_x}.jpg",
                "minimumLevel": 0,
                "maximumLevel": 4,
                "rectangle": { "xmin": -180, "xmax": 180, "ymin": -90, "ymax": 90 },
            });
            viewer.imageryLayers.addImageryProvider(arcLayer);

            viewer.mars = new mars3d.ViewerEx(viewer, {
                contextmenu: true,
                mouseZoom: true
            });

            //记录url传入参数
            var request = haoutil.system.getRequest();
            if (window.top) {//有父级
                request = $.extend(request, haoutil.system.getRequest(window.top));
            }
            haoutil.loading.show();

            $.ajax({
                type: "get",
                dataType: "json",
                url: "config/widget.json",
                timeout: 0,
                success: function (widgetCfg) {
                    haoutil.loading.hide();

                    //url如果有传参时的处理
                    if (haoutil.isutil.isNotNull(request.widget)) {
                        if (request.onlyStart) widgetCfg.widgetsAtStart = [];
                        widgetCfg.widgetsAtStart.push({
                            uri: request.widget,
                            name: request.name || "",
                            windowOptions: {
                                closeBtn: !request.onlyStart,
                            },
                            request: request
                        });
                    }

                    //初始化widget管理器
                    mars3d.widget.init(viewer, widgetCfg); //tip: 此方法有第3个参数支持定义父目录。 




                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    haoutil.loading.hide();
                    haoutil.alert("config/widget.json文件加载失败！");
                }
            });




            // 加载3DTiles模型数据
            let tileset1 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: '/zjl/12/tileset.json'
            }))


            let tileset2 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url: '/zjl/Data/3Dtiles/cesiumosgb/tileset.json'
            }))

            // 地球自转开启
            this.earthRotate(true)
        },
        // 标识线绘制方法
        addIdentificationLine(long, lat, height) {
            // 添加标识线
            viewer.entities.add({
                name: "",
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                        long, lat, -100,
                        long, lat, height
                    ]),
                    width: 1,
                    material: Cesium.Color.DODGERBLUE
                    // material : new Cesium.PolylineGlowMaterialProperty({ //发光线
                    //     glowPower : 0.1,
                    //     color : Cesium.Color.DODGERBLUE
                    // })
                }
            });
        },
        // 点绘制方法
        addMarker(long, lat, height, billboard) {
            // 删除所有覆盖物
            // viewer.entities.removeAll()
            // 添加点
            viewer.entities.add({
                name: 'name',
                position: Cesium.Cartesian3.fromDegrees(long, lat, height),
                billboard: billboard
            })
            this.addIdentificationLine(long, lat, height)
        },
        // 多点绘制方法 dataArr-点信息集,billboard图标
        addMarkers(dataArr, billboard) {
            viewer.entities.removeAll()
            let position_arr = [], markerObj

            imageCanvasBase64(billboard.image, (image) => {
                billboard.image = image

                dataArr.forEach((item, i) => {
                    position_arr.push(Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude))
                    let options = {
                        name: item.name,
                        position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.altitude),
                        billboard: billboard,
                    }
                    Object.assign(options, item)
                    markerObj = viewer.entities.add(options)

                    this.addIdentificationLine(item.longitude, item.latitude, item.altitude)

                    item.entities_id = markerObj.id
                })

                //this.access()
            })

        },
        // 贴地线绘制方法
        PolyLinePrimitive(item, opt) {
            let _update = function () {
                return item.area
            }
            let options = {
                corridor: {
                    show: true,
                    positions: new Cesium.CallbackProperty(_update, false),
                    material: Cesium.Color.DODGERBLUE.withAlpha(1),
                    // material : new Cesium.PolylineGlowMaterialProperty({
                    //     glowPower : 0.2,
                    //     color : Cesium.Color.BLUE
                    // }),
                    // material : new Cesium.PolylineGlowMaterialProperty({
                    //     glowPower : 1,
                    //     color : Cesium.Color.YELLOW.withAlpha(1),
                    // }),
                    width: 2
                }
            }
            if (opt) {
                Object.assign(options.corridor, opt)
            }
            let lineObj = viewer.entities.add(options)
            return lineObj.id
        },
        // 贴地线多线绘制
        PolyLinePrimitives(dataArr) {
            viewer.entities.removeAll()
            dataArr.map((item, i) => {
                item.entities_id = this.PolyLinePrimitive(item)
            })
            //this.access()
        },
        // 引导动画
        moveAnimation(bool) {
            return;
            let _this = this
            if (!bool) {
                if (_this.moveTimer != null) {
                    clearInterval(_this.moveTimer)
                }
                if (_this.moveTimerOut[0] != null) {
                    clearTimeout(_this.moveTimerOut[0])
                }
                if (_this.moveTimerOut[1] != null) {
                    clearTimeout(_this.moveTimerOut[1])
                }
                if (_this.moveTimerOut[2] != null) {
                    clearTimeout(_this.moveTimerOut[2])
                }
                if (_this.moveTimerOut[3] != null) {
                    clearTimeout(_this.moveTimerOut[3])
                }
                return
            }

            function callbackFun() {
                _this.moveTimerOut[0] = setTimeout(() => {
                    // 客流分析系统 共享车系统 停车系统
                    viewer.scene.camera.flyTo({
                        destination: new Cesium.Cartesian3(-2451159.5868161586, 4569290.571021583, 3701754.3560328917),
                        orientation: {
                            heading: 4.7784159152452865,
                            pitch: -0.7199005710200699,
                            roll: 6.278964574356454
                        }
                    })
                    setTimeout(() => {
                        _this.moveAddMarker({
                            classId: 1,
                            label: '停车系统',
                            position: [118.21002, 35.70539, 10],
                            billboard: { image: './images/cheliang.png', width: 35, height: 40 }
                        })
                        _this.moveAddMarker({
                            classId: 2,
                            label: '客流分析系统',
                            position: [118.20973, 35.70555, 10],
                            billboard: { image: './images/jiankong.png', width: 35, height: 40 }
                        })
                        _this.moveAddMarker({
                            classId: 3,
                            label: '共享车系统',
                            position: [118.20996, 35.70557, 10],
                            billboard: { image: './images/danche.png', width: 35, height: 40 }
                        })
                    }, 1500)
                }, 1000)
                _this.moveTimerOut[1] = setTimeout(() => {
                    // 客流分析系统
                    console.log(2)
                    viewer.scene.camera.flyTo({
                        destination: new Cesium.Cartesian3(-2450973.9005359965, 4569478.622018611, 3701642.217128693),
                        orientation: {
                            heading: 5.826378716674048,
                            pitch: -1.0191041936859877,
                            roll: 6.280496895150513
                        }
                    })
                    setTimeout(() => {
                        _this.moveAddMarker({
                            classId: 4,
                            label: '客流分析系统',
                            position: [118.20791, 35.70462, 10],
                            billboard: { image: './images/jiankong.png', width: 35, height: 40 }
                        })
                    }, 1500)
                }, 8000)
                _this.moveTimerOut[2] = setTimeout(() => {
                    // 环境监测仪
                    viewer.scene.camera.flyTo({
                        destination: new Cesium.Cartesian3(-2450867.048225528, 4569612.047961829, 3701548.8839329774),
                        orientation: {
                            heading: 6.207562284597419,
                            pitch: -0.8256027311625922,
                            roll: 6.282829821595243
                        }
                    })
                    setTimeout(() => {
                        _this.moveAddMarker({
                            classId: 5,
                            label: '环境监测仪',
                            position: [118.20643, 35.70390, 10],
                            billboard: { image: './images/haunjinjiance.png', width: 35, height: 40 }
                        })
                    }, 1500)
                }, 15000)
                _this.moveTimerOut[3] = setTimeout(() => {
                    // 支付系统
                    viewer.scene.camera.flyTo({
                        destination: new Cesium.Cartesian3(-2450828.327522273, 4569551.352179894, 3701648.822710052),
                        orientation: {
                            heading: 5.778416384996152,
                            pitch: -0.8312999567210166,
                            roll: 6.2808965083199375
                        }
                    })
                    setTimeout(() => {
                        _this.moveAddMarker({
                            classId: 6,
                            label: '支付系统',
                            position: [118.20597, 35.70488, 10],
                            billboard: { image: './images/zhifu.png', width: 35, height: 40 }
                        })
                    }, 1500)
                }, 22000)
            }

            callbackFun()
            this.moveTimer = setInterval(() => {
                callbackFun()
            }, 29000)
        },
        // 动态点
        moveAddMarker(obj) {
            removeDynamicLayer(viewer, { element: '#one' })
            if (obj.classId == 1) {
                if (this.moveMarker1 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker1[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker1[1]))
                    this.moveMarker1 = null
                }
            }
            if (obj.classId == 2) {
                if (this.moveMarker2 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker2[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker2[1]))
                    this.moveMarker2 = null
                }
            }
            if (obj.classId == 3) {
                if (this.moveMarker3 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker3[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker3[1]))
                    this.moveMarker3 = null
                }
            }
            if (obj.classId == 4) {
                if (this.moveMarker4 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker4[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker4[1]))
                    this.moveMarker4 = null
                }
            }
            if (obj.classId == 5) {
                if (this.moveMarker5 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker5[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker5[1]))
                    this.moveMarker5 = null
                }
            }
            if (obj.classId == 6) {
                if (this.moveMarker6 != null) {
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker6[0]))
                    viewer.entities.remove(viewer.entities.getById(this.moveMarker6[1]))
                    this.moveMarker6 = null
                }
            }

            setTimeout(() => {
                let alt1 = 0, alt2 = 0
                let offset = 150, n = -15
                let opt = 0, optn = -15
                let optt = 0, opttn = -15
                let marker = viewer.entities.add({
                    name: 'moveMarker',
                    position: new Cesium.CallbackProperty(function () {
                        alt1++
                        if (alt1 >= obj.position[2]) {
                            alt1 = obj.position[2]
                        }
                        return Cesium.Cartesian3.fromDegrees(obj.position[0], obj.position[1], alt1)
                    }, false),
                    billboard: obj.billboard,
                    label: { //文字标签
                        text: obj.label,
                        font: '26px Source Han Sans CN',                   // 字体样式
                        fillColor: new Cesium.CallbackProperty(function () {
                            opttn++
                            if (opttn >= 0) {
                                optt += 0.05
                                if (optt >= 1) {
                                    optt = 1
                                }
                            }
                            return Cesium.Color.BLACK.withAlpha(optt)
                        }, false),                       // 字体颜色
                        backgroundColor: new Cesium.CallbackProperty(function () {
                            optn++
                            if (optn >= 0) {
                                opt += 0.1
                                if (opt >= 0.6) {
                                    opt = 0.6
                                }
                            }
                            return Cesium.Color.AQUA.withAlpha(opt)
                        }, false),    // 背景颜色
                        showBackground: true,                                // 是否显示背景颜色
                        style: Cesium.LabelStyle.FILL,                      // label样式
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,      // 垂直方向以底部来计算标签的位置
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,   // 水平位置
                        pixelOffset: new Cesium.CallbackProperty(function () {
                            n += 2
                            if (n >= 0) {
                                offset -= n
                                if (offset <= 17) {
                                    offset = 17
                                }
                            }
                            return new Cesium.Cartesian2(offset, -5)
                        }, false)      // 偏移量
                    },
                })
                let markerLine = viewer.entities.add({
                    name: "baioshi",
                    polyline: {
                        positions: new Cesium.CallbackProperty(function () {
                            alt2++
                            if (alt2 >= obj.position[2]) {
                                alt2 = obj.position[2]
                            }
                            return Cesium.Cartesian3.fromDegreesArrayHeights([
                                obj.position[0], obj.position[1], -100,
                                obj.position[0], obj.position[1], alt2
                            ])
                        }, false),
                        width: 2,
                        // material : Cesium.Color.DODGERBLUE
                        material: new Cesium.PolylineGlowMaterialProperty({ //发光线
                            glowPower: 0.5,
                            color: Cesium.Color.DODGERBLUE.withAlpha(.8)
                        })
                    }
                })

                if (obj.classId == 1) {
                    this.moveMarker1 = [marker.id, markerLine.id]
                }
                if (obj.classId == 2) {
                    this.moveMarker2 = [marker.id, markerLine.id]
                }
                if (obj.classId == 3) {
                    this.moveMarker3 = [marker.id, markerLine.id]
                }
                if (obj.classId == 4) {
                    this.moveMarker4 = [marker.id, markerLine.id]
                }
                if (obj.classId == 5) {
                    this.moveMarker5 = [marker.id, markerLine.id]
                }
                if (obj.classId == 6) {
                    this.moveMarker6 = [marker.id, markerLine.id]
                }
            }, 1000)
        },

        async realTimeCar() {
            let resa = await fetchAPI.get('./visual/bicycle/positionData.json', {})
            console.log(resa)
        },

        // 数据初始化
        async dataInit() {
            // 附近景点接口数据
            let resa = await fetchAPI.get('./visual/scenic/indexdata.json', {})
            if (resa.code == 200) {
                let arr = resa.data
                if (Array.isArray(arr)) {
                    arr.map((item, i) => {
                        if (item.children && item.children != []) {
                            return keyUpdata('name', 'scenic_name', item.children)
                        }
                    })
                } else {
                    arr = []
                }

                this.spotData = arr
                console.groupCollapsed('附近景点接口数据')
                console.log(resa)
                console.log(arr)
                console.groupEnd()
            } else {
                this.$Message.error(resa.msg)
            }

            // 公共区域接口数据
            let resb = await fetchAPI.get('./visual/common/indexdata.json', {})
            if (resb.code == 200) {
                let arr = resb.data
                if (Array.isArray(arr)) {
                    arr.map((item, i) => {
                        if (item.children && item.children != []) {
                            return keyUpdata('name', 'device_name', item.children)
                        }
                    })
                } else {
                    arr = []
                }

                this.publicAreaData = arr
                console.groupCollapsed('公共区域接口数据')
                console.log(resb)
                console.log(arr)
                console.groupEnd()
            } else {
                this.$Message.error(resb.msg)
            }

            // 硬件设备接口数据
            let resc = await fetchAPI.get('./visual/device/indexdata.json', {})
            if (resc.code == 200) {
                let arr = resc.data
                if (Array.isArray(arr)) {
                    arr.map((item, i) => {
                        if (item.children) {
                            item.children.map((itemChild, j) => {
                                return itemChild['icon'] = item.cate_image
                            })
                        }
                        if (item.children && item.children != []) {
                            return keyUpdata('name', 'device_name', item.children)
                        }
                    })
                } else {
                    arr = []
                }

                this.hardwareData = arr
                console.groupCollapsed('硬件设备接口数据')
                console.log(resc)
                console.log(arr)
                console.groupEnd()
            } else {
                this.$Message.error(resc.msg)
            }

            //街道接口数据
            let resd = await fetchAPI.get('./visual/street/indexdata.json', {})
            if (resd.code == 200) {
                let arr = resd.data
                let stree = [], build = []
                if (Array.isArray(arr)) {
                    arr.map((item, i) => {
                        if (item.children) {
                            build.push(...item.children)
                            delete item.children
                        }
                        stree.push(item)
                    })
                } else {
                    arr = []
                }
                stree.map((item, i) => {
                    item.area = JSON.parse(item.area)
                })
                build.map((item, i) => {
                    item.build_images = imagesFun(item.build_images)
                })

                this.streeData = stree
                this.buildData = build
                // arr
                console.groupCollapsed('街道楼栋接口数据')
                console.log(resd)
                console.log(stree)
                console.log(build)
                console.groupEnd()
            } else {
                this.$Message.error(resd.msg)
            }

            //车辆类别下拉接口数据
            let vehicleRes = await fetchAPI.get('./visual/car/carCateData.json', {})
            if (vehicleRes.code == 200) {
                let arr = []
                if (Array.isArray(vehicleRes.data)) {
                    vehicleRes.data.map((item, i) => {
                        arr.push({
                            label: item.name,
                            value: item.id
                        })
                    })
                } else {
                    arr = []
                }

                this.vehicleSelectList = arr
                // arr
                console.groupCollapsed('车辆类别下拉接口数据')
                console.log(vehicleRes)
                console.log(this.vehicleSelectList)
                console.groupEnd()
            } else {
                this.$Message.error(vehicleRes.msg)
            }

            //人员类别下拉接口数据
            let peopleRes = await fetchAPI.get('./visual/event/partData.json', {})
            if (peopleRes.code == 200) {
                let arr = []
                if (Array.isArray(vehicleRes.data)) {
                    peopleRes.data.map((item, i) => {
                        arr.push({
                            label: item.part_name,
                            value: item.part_id
                        })
                    })
                } else {
                    arr = []
                }

                this.peopleSelectList = arr
                // arr
                console.groupCollapsed('人员类别下拉接口数据')
                console.log(peopleRes)
                console.log(this.peopleSelectList)
                console.groupEnd()
            } else {
                this.$Message.error(peopleRes.msg)
            }
            setTimeout(() => { loading.close() }, 1000)


        },

        //视频融合
        videoFusion() {
            if ($("#videoFusion").html() == "停车场(开)") {
                this.videoElementm = document.getElementById('trailer');
                viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights([
                            118.20731, 35.704592,
                            0,
                            118.207805, 35.704619,
                            0,
                            118.207841, 35.704592,
                            0,
                            118.207547, 35.704383,
                            0,
                            118.207277, 35.704431,
                            0,
                            118.20731, 35.704592,
                            0
                        ])),
                        material: this.videoElementm,
                        stRotation: Cesium.Math.toRadians(0),//视频旋转角度
                        perPositionHeight: false,
                        outline: false
                    }
                });
                document.getElementById('trailer').play();
                $("#videoFusion").html("停车场(关)");
                viewer.mars.centerAt({ "y": 35.70416, "x": 118.207384, "z": 127.62, "heading": 2.4, "pitch": -74.2, "roll": 0 });
            } else {
                document.getElementById('trailer').pause();
                viewer.entities.removeAll();
                $("#videoFusion").html("停车场(开)");
            }

        },


        //广告牌显示开关
        switchons() {
            console.log("switchon")
        },

    },
    created() {
        this.dataInit()
    }
})

window.appk = app;

// 按钮点击波纹方法
let addRippleEffect = function (e) {
    let target = e.target
    if (target.className.toLowerCase() !== 'btn') return false
    let rect = target.getBoundingClientRect()
    let ripple = target.querySelector('.ripple')
    if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
    }
    ripple.classList.remove('show')

    let top = e.offsetY - (ripple.offsetHeight / 2)
    let left = e.offsetX - (ripple.offsetWidth / 2)
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    ripple.classList.add('show')
    return false;
}
// 按钮点击波纹监听
document.addEventListener('click', addRippleEffect, false)

/**
 * 图片字符串转数组处理
 * @param  {String|Array} str  图片链接字符串|图片数组
 * @return {Array}             图片数组
 */
function imagesFun(str) {
    if (Array.isArray(str)) {
        return str
    }
    if (str == '') {
        return []
    }
    if (str.indexOf(',') != -1) {
        return str.split(',')
    }
    return [str]
}

/**
 * 修改数组对象键值
 * @param  {String} nkey    新键值
 * @param  {String} okey    老键值
 * @param  {Array}  arr     数组
 * @return {Array}          新数组
 */
function keyUpdata(nkey, okey, arr) {
    arr.map((item, i) => {
        return item[nkey] = item[okey]
    })
}

/**
 * 图片转base64
 * @param  {String} image    新键值
 * @param  { Fun }  callback    老键值
 */
function imageCanvasBase64(image, callback) {
    let imgs = new Image()
    imgs.crossOrigin = "Anonymous" //注意存放顺序
    imgs.src = image
    imgs.onload = function () {
        let canvass = document.createElement('canvas')
        canvass.width = imgs.width
        canvass.height = imgs.height
        let ctxImg = canvass.getContext("2d")
        ctxImg.drawImage(imgs, 0, 0, imgs.width, imgs.height)
        let img1 = new Image()
        img1.src = canvass.toDataURL("image/png")
        callback(img1.src)
    }
}

/**
 * test模糊查询方法
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  关键词
 * @return {Array,Array}     查询结果 {arr,tem} arr->搜索结果 tem->原数组改变序列
 */
function fuzzyQuery(list, keyWord) {
    let reg = new RegExp(keyWord)
    let arr = [], tem = list
    let bool = false, childBool = false
    if (keyWord == '' || !keyWord) {
        return []
    }
    for (let i = 0; i < list.length; i++) {

        if (list[i].children) {
            arr = arr.concat(fuzzyQuery(list[i].children, keyWord).arr)
            tem[i].children = fuzzyQuery(list[i].children, keyWord).tem
            if (arr > 0) {
                childBool = true
            }
        }

        if (reg.test(list[i].name)) {
            arr.push(list[i])
            bool = true
        }

        if (bool || childBool) {
            let item = list[i]
            tem.splice(i, 1)
            tem.unshift(item)

            bool = false
            childBool = false
        }
    }
    return { arr, tem }
}

/**
 * 圆扩散构造方法
 * @param  {Object}  viewer  viewer实例对象
 * @param  {Object}  data    配置项
 */
function addCircleRipple(viewer, data) {
    var r1 = data.minR, r2 = data.minR;
    if (viewer.entities.getById(data.id[0])) {
        viewer.entities.remove(viewer.entities.getById(data.id[0]))
    }
    if (viewer.entities.getById(data.id[1])) {
        viewer.entities.remove(viewer.entities.getById(data.id[1]))
    }

    function changeR1() { //这是callback，参数不能内传
        r1 = r1 + data.deviationR;
        if (r1 >= data.maxR) {
            r1 = data.minR;
        }

        return r1;
    }
    function changeR2() {
        r2 = r2 + data.deviationR;
        if (r2 >= data.maxR) {
            r2 = data.minR;
        }
        return r2;
    }
    viewer.entities.add({
        id: data.id[0],
        name: "",
        position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
        ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
            semiMajorAxis: new Cesium.CallbackProperty(changeR1, false),
            height: data.height,
            material: new Cesium.ImageMaterialProperty({
                image: data.imageUrl,
                repeat: new Cesium.Cartesian2(1.0, 1.0),
                transparent: true,
                color: new Cesium.CallbackProperty(function () {
                    var alp = 1 - r1 / data.maxR;
                    return Cesium.Color.WHITE.withAlpha(alp)  //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                }, false)
            })
        }
    });
    setTimeout(function () {
        viewer.entities.add({
            id: data.id[1],
            name: "",
            position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(changeR2, false),
                semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
                height: data.height,
                material: new Cesium.ImageMaterialProperty({
                    image: data.imageUrl,
                    repeat: new Cesium.Cartesian2(1.0, 1.0),
                    transparent: true,
                    color: new Cesium.CallbackProperty(function () {
                        var alp = 1;
                        alp = 1 - r2 / data.maxR;
                        return Cesium.Color.WHITE.withAlpha(alp)
                    }, false)
                })
            }
        });
    }, data.eachInterval)
}

/**
 * 圆扩散调用方法
 * @param  {String}  long   经度
 * @param  {String}  lat    维度
 * @param  {String}  height 高度
 */
function addCircleRippleInit(long, lat, height) {
    let data = {
        id: ["abcd-111", "abcd-222"],
        lon: long,
        lat: lat,
        height: height,
        maxR: 40,
        minR: 0,                        // 最好为0
        deviationR: 0.3,                  // 差值 差值也大 速度越快
        eachInterval: 1000,             // 两个圈的时间间隔
        imageUrl: "./img/red_circle.png"
    }
    addCircleRipple(viewer, data)
}

/**
 * Date对象添加format原型方法 
 */
function initFormatter() {
    Date.prototype.Format = function (fmt) { //
        let o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
initFormatter()


/**
 * 创建一个 htmlElement元素 并且，其在earth背后会自动隐藏
 */
function creatHtmlElement(viewer, element, position, arr, flog) {
    var ele = document.querySelector(element)
    var scratch = new Cesium.Cartesian2()  //cesium二维笛卡尔 笛卡尔二维坐标系就是我们熟知的而二维坐标系；三维也如此
    var scene = viewer.scene, camera = viewer.camera
    scene.preRender.addEventListener(function () {
        var canvasPosition = scene.cartesianToCanvasCoordinates(position, scratch) //cartesianToCanvasCoordinates 笛卡尔坐标（3维度）到画布坐标
        if (Cesium.defined(canvasPosition)) {
            ele.style.left = canvasPosition.x + arr[0] + 'px'
            ele.style.top = canvasPosition.y + arr[1] + 'px'
            /* 此处进行判断**/// var px_position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian) 
            if (flog && flog == true) {
                var e = position, i = camera.position, n = scene.globe.ellipsoid.cartesianToCartographic(i).height
                if (!(n += 1 * scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(i, e) > n)) {
                    // $(element).show() 
                    ele.style.display = 'block'
                } else {
                    ele.style.display = 'none'
                    // $(element).hide() 
                }
            }
            /* 此处进行判断**/
        }
    });
}

/**
 * 创建一个动态实体弹窗
 */
function showDynamicLayer(viewer, data, callback) {
    var lon = data.lon, lat = data.lat

    var sStartFlog = false
    setTimeout(function () {
        sStartFlog = true
    }, 300)
    var s1 = 0.001, s2 = s1, s3 = s1, s4 = s1
    /* 弹窗的dom操作--默认必须*/
    $(data.element).css({ opacity: 0 })  // 使用hide()或者display是不行的 因为cesium是用pre定时重绘的div导致 left top display 会一直重绘
    $(".dynamic-layer .line").css({ width: 0 })
    $(data.element).find(".main").hide(0)
    /* 弹窗的dom操作--针对性操作*/
    callback()

    if (data.addEntity) {
        var rotation = Cesium.Math.toRadians(30)
        var rotation2 = Cesium.Math.toRadians(30)
        function getRotationValue() {
            rotation += 0.05
            return rotation
        }
        function getRotationValue2() {
            rotation2 -= 0.03
            return rotation2
        }
        //如果有实体存在 先清除实体 
        viewer.entities.removeById(data.layerId + "_1")
        viewer.entities.removeById(data.layerId + "_2")
        viewer.entities.removeById(data.layerId + "_3")
        //构建entity
        var height = data.boxHeight, heightMax = data.boxHeightMax, heightDif = data.boxHeightDif
        var goflog = true
        //添加正方体
        viewer.entities.add({
            id: data.layerId + "_1",
            name: "立方体盒子",
            position: new Cesium.CallbackProperty(function () {
                height = height + heightDif
                if (height >= heightMax) {
                    height = heightMax
                }
                return Cesium.Cartesian3.fromDegrees(lon, lat, height / 2)
            }, false),
            box: {
                dimensions: new Cesium.CallbackProperty(function () {
                    height = height + heightDif
                    if (height >= heightMax) {
                        height = heightMax
                        if (goflog) {//需要增加判断 不然它会一直执行; 导致对div的dom操作 会一直重复
                            addLayer() //添加div弹窗
                            goflog = false
                        }
                    }
                    return new Cesium.Cartesian3(data.boxSide, data.boxSide, height)
                }, false),
                material: data.boxMaterial
            }
        })
        //添加底座一 外环
        viewer.entities.add({
            id: data.layerId + "_2",
            name: "椭圆",
            position: Cesium.Cartesian3.fromDegrees(lon, lat),
            ellipse: {
                // semiMinorAxis :data.circleSize, //直接这个大小 会有一个闪白的材质 因为cesium材质默认是白色 所以我们先将大小设置为0
                // semiMajorAxis : data.circleSize,
                semiMinorAxis: new Cesium.CallbackProperty(function () {
                    if (sStartFlog) {
                        s1 = s1 + data.circleSize / 20;
                        if (s1 >= data.circleSize) {
                            s1 = data.circleSize;
                        }
                    }
                    return s1
                }, false),
                semiMajorAxis: new Cesium.CallbackProperty(function () {
                    if (sStartFlog) {
                        s2 = s2 + data.circleSize / 20
                        if (s2 >= data.circleSize) {
                            s2 = data.circleSize
                        }
                    }
                    return s2
                }, false),
                material: "./img/circle2.png",
                rotation: new Cesium.CallbackProperty(getRotationValue, false),
                stRotation: new Cesium.CallbackProperty(getRotationValue, false),
                zIndex: 2,
            }
        })
        //添加底座二 内环
        viewer.entities.add({
            id: data.layerId + "_3",
            name: "椭圆",
            position: Cesium.Cartesian3.fromDegrees(lon, lat),
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(function () {
                    if (sStartFlog) {
                        s3 = s3 + data.circleSize / 20;
                        if (s3 >= data.circleSize / 2) {
                            s3 = data.circleSize / 2;
                        }
                    }
                    return s3;
                }, false),
                semiMajorAxis: new Cesium.CallbackProperty(function () {
                    if (sStartFlog) {
                        s4 = s4 + data.circleSize / 20;
                        if (s4 >= data.circleSize / 2) {
                            s4 = data.circleSize / 2;
                        }
                    }
                    return s4;
                }, false),
                material: "./img/circle1.png",
                rotation: new Cesium.CallbackProperty(getRotationValue2, false),
                stRotation: new Cesium.CallbackProperty(getRotationValue2, false),
                zIndex: 3
            }
        })
    } else {
        addLayer() //添加div弹窗
    }

    function addLayer() {
        //添加div
        var divPosition = Cesium.Cartesian3.fromDegrees(lon, lat, data.boxHeightMax) //data.boxHeightMax为undef也没事
        $("#one").css({ opacity: 1 })
        $("#one").find(".line").animate({
            width: 50//线的宽度
        }, 500, function () {
            $("#one").find(".main").fadeIn(500)
        })
        creatHtmlElement(viewer, data.element, divPosition, [10, -(parseInt($(data.element).css("height")))], true)  //当为true的时候，表示当element在地球背面会自动隐藏。默认为false，置为false，不会这样。但至少减轻判断计算压力
    }
}

/**
 * 移除动态弹窗 为了方便 这里的移除 是真的移除，因此 到时是需要重建弹窗的doom的
 */
function removeDynamicLayer(viewer, data) {
    viewer.entities.removeById(data.layerId + "_1")
    viewer.entities.removeById(data.layerId + "_2")
    viewer.entities.removeById(data.layerId + "_3")
    // $(data.element).remove()
    // $(data.element).css({ opacity: 0 })
    document.querySelector(data.element).style.opacity = 0
}



/**
 * 绘制形状
 * @param s1 {Number} 起点一
 * @param s2 {Number} 起点二
 * @param p1 {Number} 结束点一
 * @param p2 {Number} 结束点二
 */
function draw(s1, s2, p1, p2) {
    let h = canvas.height
    let w = canvas.width
    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(s1, 0);
    ctx.bezierCurveTo(s1, h * 0.2, p1, h * 0.6, p1, h);
    ctx.lineTo(p2, h);
    ctx.bezierCurveTo(p2, h * 0.6, s2, h * 0.2, s2, 0);
    ctx.lineTo(s1, 0);
    ctx.fillStyle = "rgba(0, 0, 0, .8)";
    ctx.fill();
}
/**
 * 擦除方式
 * @param y {Number}
 * @param speed {Number}
 * @param type 类型，放大或缩小 zoomin、zoomout
 */
function clearRect(y, speed, type) {
    ctx = canvas.getContext("2d")
    if (type === "zoomout") {
        ctx.clearRect(0, y, canvas.width, speed);
    } else if (type === "zoomin") {
        ctx.clearRect(0, 0, canvas.width, y);
    }
}
/**
 * 缩放效果
 * @param s1 {Number} 起点一
 * @param s2 {Number} 起点二
 * @param p1 {Number} 结束点一
 * @param p2 {Number} 结束点二
 * @param type {String} 类型，放大或缩小 zoomin、zoomout
 */
function scale(s1, s2, p1, p2, type, callback) {
    var h = canvas.height
    var dist1 = Math.abs(p1 - s1);
    var dist2 = Math.abs(p2 - s2);
    var d1, d2, _p1, _p2, speed1, y, speed2;
    if (dist1 === 0 || dist2 === 0) {
        dist1 = 1;
        dist2 = 1;
    }
    speed1 = 40;
    speed2 = 40;
    if (type === "zoomout") {
        d1 = (p1 >= s1 && p1 < speed1) ? 0 : p1 < s1 ? -speed1 : speed1;
        d2 = p2 < s2 ? -speed1 * dist2 / dist1 : speed1 * dist2 / dist1;
        _p1 = s1;
        _p2 = s2;
        y = 0;
        var t = setInterval(function () {
            if (_p2 - _p1 <= p2 - p1) {
                clearInterval(t);
                var timer = setInterval(function () {
                    if (y > h) {
                        clearInterval(timer);
                        callback && callback();
                    }
                    clearRect(y, speed2, type);
                    y += speed2;
                    speed2 += 1;
                }, 60);
            }
            draw(s1, s2, _p1, _p2);
            _p1 += d1;
            _p2 += d2;
            if ((d1 < 0 && _p1 <= p1) || (d1 > 0 && _p1 >= p1)) {
                _p1 = p1;
            }
            if ((d2 < 0 && _p2 <= p2) || (d2 > 0 && _p2 >= p2)) {
                _p2 = p2;
            }
        }, 17);
    } else if (type === "zoomin") {
        d1 = (p1 >= s1 && p1 < speed1) ? 0 : p1 < s1 ? speed1 : -speed1;
        d2 = p2 < s2 ? speed1 * dist2 / dist1 : -speed1 * dist2 / dist1;
        _p1 = p1;
        _p2 = p2;
        y = h;
        var timer = setInterval(function () {
            if (y <= 0) {
                clearInterval(timer);
                var t = setInterval(function () {
                    if (_p2 - _p1 >= s2 - s1) {
                        clearInterval(t);
                        callback && callback();
                    }
                    draw(s1, s2, _p1, _p2);
                    _p1 += d1;
                    _p2 += d2;
                }, 17);
            }
            draw(s1, s2, _p1, _p2);
            clearRect(y, speed2, type);
            y -= speed2;
            speed2 += 1;
        }, 17);
    }
}


/**
 * (流动)折线
 * */
function creatBrokenLine(viewer, data) {
    if (data.flowing == true) {
        initPolylineTrailLinkMaterialProperty(data);
        var str1 = data.options.polyline.material[0];
        var str2 = data.options.polyline.material[1];
        data.options.polyline.material = new Cesium.PolylineTrailLinkMaterialProperty(str1, str2);
    }
    viewer.entities.add(data.options)
    viewer.entities.add({
        polyline: {
            show: true,
            positions: data.options.polyline.positions,
            // SLATEGRAY LIGHTSKYBLUE DODGERBLUE
            material: Cesium.Color.DODGERBLUE.withAlpha(0.05),
            // material : new Cesium.PolylineGlowMaterialProperty({
            //     glowPower : .2,
            //     color : Cesium.Color.DODGERBLUE.withAlpha(0.05),
            // }),
            // width : 4
        }
    })
}

//流动特效
function initPolylineTrailLinkMaterialProperty(data) {
    function PolylineTrailLinkMaterialProperty(color, duration) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._colorSubscription = undefined;
        this.color = color;
        this.duration = duration;
        this._time = (new Date()).getTime();
    }
    Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
        isConstant: {
            get: function () {
                return false;
            }
        },
        definitionChanged: {
            get: function () {
                return this._definitionChanged;
            }
        },
        color: Cesium.createPropertyDescriptor('color')
    });
    PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
        return 'PolylineTrailLink';
    }
    PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
        result.image = Cesium.Material.PolylineTrailLinkImage;
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
        return result;
    }
    PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty &&
                Property.equals(this._color, other._color))
    };
    Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
    Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
    Cesium.Material.PolylineTrailLinkImage = data.flowImage;//图片
    Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                {\n\
                                                        czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                        vec2 st = materialInput.st;\n\
                                                        vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                        material.alpha = colorImage.a * color.a;\n\
                                                        material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                        return material;\n\
                                                    }";
    // material.alpha:透明度;material.diffuse：颜色;
    Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
        fabric: {
            type: Cesium.Material.PolylineTrailLinkType,
            uniforms: {
                color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                image: Cesium.Material.PolylineTrailLinkImage,
                time: 0
            },
            source: Cesium.Material.PolylineTrailLinkSource
        },
        translucent: function (material) {
            return true;
        }
    });



    //asdasdadasd
    /*$(document).ready(function () {
        if (!mars3d.util.webglreport()) {
            alert('系统检测到您使用的浏览器不支持WebGL功能');
            layer.open({
                type: 1,
                title: "当前浏览器不支持WebGL功能",
                closeBtn: 0,
                shadeClose: false,
                resize: false,
                area: ['600px', '200px'], //宽高
                content: '<div style="margin: 20px;"><h3>系统检测到您使用的浏览器不支持WebGL功能！</h3>  <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p> <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装显卡驱动程序！</p></div>'
            });
        }

        initMap();
    });*/

    function removeMask() {
        $("#mask").remove();
    }


    var viewer;

    //初始化地图
    function initMap() {
        //url传参，一个系统动态使用不同配置
        var configfile = haoutil.system.getRequestByName("config", "config/config.json");

        mars3d.createMap({
            id: 'cesiumContainer',
            url: configfile,
            center: {
                "y": 36.534035,
                "x": 101.494838,
                "z": 2871.39,
                "heading": 196.6,
                "pitch": -43.5,
                "roll": 359.9
            },
            success: function (_viewer, jsondata) {//地图成功加载完成后执行
                viewer = _viewer;

                setTimeout(removeMask, 3000);
                initWork();
            }
        });
    }

    //当前页面业务相关
    function initWork() {
        var tilesetDX;

        //加模型
        mars3d.layer.createLayer({
            "type": "3dtiles",
            "url": "/zjl/Data/3Dtiles/cesiumosgb/tileset.json",
            "maximumScreenSpaceError": 3,
            "offset": { "z": -100 },
            "center": {
                "y": 36.534035,
                "x": 101.494838,
                "z": 2871.39,
                "heading": 196.6,
                "pitch": -43.5,
                "roll": 359.9
            },
            "visible": true,
            "flyTo": true,
            "calback": function (tileset) {
                tilesetDX = tileset;

                //显示历史数据
                var coords = [
                    [101.494598, 36.531232, 2575.68],
                    [101.493713, 36.531463, 2575.83],
                    [101.493934, 36.532096, 2576.18],
                    [101.494881, 36.531865, 2575.58]
                ];
                flatObj = new mars3d.tiles.TilesFlat({
                    viewer: viewer,
                    tileset: tileset,
                    positions: mars3d.pointconvert.lonlats2cartesians(coords),
                    flatHeight: 0
                });

                coords.push(coords[0]);
                viewer.mars.draw.addPolyline(coords, {
                    color: "#ffffff",
                    clampToGround: true,
                    width: 2,
                });
            }
        }, viewer);




        var flatObj;

        $("#btnDraw").click(function () {
            if (flatObj) {
                flatObj.destroy();
                flatObj = undefined;
            }

            viewer.mars.draw.deleteAll();
            viewer.mars.draw.startDraw({
                type: "polygon",
                style: {
                    color: "#007be6",
                    opacity: 0.5,
                    clampToGround: false
                },
                success: function (entity) { //绘制成功后回调
                    var positions = viewer.mars.draw.getPositions(entity);

                    //显示边界线处理
                    var showLine = $("#chkShowLine").is(':checked');
                    if (showLine) {
                        var coords = viewer.mars.draw.getCoordinates(entity);
                        coords.push(coords[0]);
                        console.log(JSON.stringify(coords));//打印下边界

                        viewer.mars.draw.deleteAll();
                        viewer.mars.draw.addPolyline(coords, {
                            color: "#ffffff",
                            clampToGround: true,
                            width: 2,
                        });
                    }
                    else {
                        viewer.mars.draw.deleteAll();
                    }
                    //显示边界线处理

                    var tileset = mars3d.tileset.pick3DTileset(viewer, positions);//拾取绘制返回的模型
                    if (!tileset) {
                        tileset = tilesetDX
                        // haoutil.msg("请在模型上绘制区域！");
                        // return
                    }
                    var flatHeight = Number($("#flatHeight").val());

                    flatObj = new mars3d.tiles.TilesFlat({
                        viewer: viewer,
                        tileset: tileset,
                        positions: positions,
                        flatHeight: flatHeight
                    });

                }
            });
        });


        $("#flatHeight").change(function () {
            if (!flatObj) return;

            var num = Number($(this).val());
            flatObj.flatHeight = num;
        });


        $("#clearWJ").click(function () {
            viewer.mars.draw.deleteAll();
            $("#offsetNumX").val(0);
            $("#offsetNumY").val(0);

            if (flatObj) {
                flatObj.destroy();
                flatObj = undefined;
            }
        });


        $("#offsetNumX").change(function () {
            if (!flatObj) return;
            var xx = $("#offsetNumX").val() * 1;
            var yy = $("#offsetNumY").val() * 1;

            flatObj.b3dmOffset = new Cesium.Cartesian2(xx, yy);
        });


        $("#offsetNumY").change(function () {
            if (!flatObj) return;
            var xx = $("#offsetNumX").val() * 1;
            var yy = $("#offsetNumY").val() * 1;

            flatObj.b3dmOffset = new Cesium.Cartesian2(xx, yy);
        });


        $("#chkHasOffset").change(function () {
            var val = $(this).is(':checked');

            if (val)
                $(".hasOffset").show();
            else
                $(".hasOffset").hide();
        });


    }
    /*
    window.onload=function(){
        window.vi=viewer;
    }*/




}

