var thisWidget;
var thisType = "";
var viewer=this.viewer;
//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;


    if (thisWidget.config && thisWidget.config.style) {
        $("body").addClass(thisWidget.config.style);
    }

    $("#measure_area_danwei").val("auto"); //默认值
    $("#measure_length_danwei").val("auto"); //默认值

    // $('#btn_measure_length').bind('click', function () {

    //     alert(0);
    //     thisWidget.test();
    // });

    $('#btn_measure_length_td').bind('click', function () {
        //用户首次使用时，提醒一次


        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: false,
            calback: showResult
        });
    });


    $('#btn_measure_length_td').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('贴地需要地形服务支撑，部分区域可能无法贴地！', 'measure_length_tip');


        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: true,
            calback: showResult
        });
    });

    $('#btn_measure_area').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_length_danwei').hide();
        $('#measure_area_danwei').show();

        thisType = "area";
        lastVal = 0;
        /*thisWidget.drawPolygon({
            unit: $('#measure_area_danwei').val(),
            calback: showResult
        });*/
    });

    $('#btn_measure_angle').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "angle";
        lastVal = 0;
        thisWidget.measureAngle();
    });

    $('#btn_measure_point').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "point";
        lastVal = 0;
        thisWidget.measurePoint();
    });


    $('#btn_measure_section').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('剖面需要地形服务支撑，部分区域可能无法获取高程值！', 'measure_section_tip');

        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "section";
        lastVal = 0;
        thisWidget.drawSection({
            unit: $('#measure_length_danwei').val(),
            splitNum: 19, //插值次数
            onStart: function () {//开始分析前回调(异步)
                haoutil.loading.show();
            },
            onStop: function () {//分析完成后回调(异步)
                haoutil.loading.hide();
            },
            calback: showSectionResult
        });
    });


    $('#btn_measure_height').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: false,
            calback: showResult
        });
    });

    $('#btn_measure_supHeight').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "super_height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: true,
            calback: showResult
        });
    });

    $('#btn_measure_clear').bind('click', function () {
        $("#lbl_measure_result").html("");

        thisType = "";
        lastVal = 0;
        thisWidget.clearDraw();
    });

    $('#btn_measure_point2').bind('click', function () {
        alert(1);
    });
    

    //更换单位
    $("#measure_length_danwei").change(function (e) {
        var danwei = $('#measure_length_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatLength(lastVal, danwei);
            showResult(valstr);
        }
		if( lastSection != null){
            thisWidget.showSectionChars(lastSection,danwei);
        }
    });
    $("#measure_area_danwei").change(function (e) {
        var danwei = $('#measure_area_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatArea(lastVal, danwei);
            showResult(valstr);
        }
    });
    function sel1(){
        var y = document.getElementById("secondpart");
        y.style.cssText="display: inline;"
    }    
}

var build = 0;
var floor = 0;

window.onload=function(){
    
},

selfs=function self(){
    console.log("sel1")
    var x = document.getElementById("sel1");
    var index1=x.selectedIndex;
    build=x.options[index1].value;
    var y = document.getElementById("secondpart");
    y.style.cssText="display: inline;"
},

sels=function sels(){
    var y = document.getElementById("sel2");
    var i = document.getElementById("if");
    var index2=y.selectedIndex;
    floor=y.options[index2].value;
    //window.open("result.html?"+String(build)+"-"+String(floor));
    if(build!=0&&floor!=0)
    {
        console.log("教服信息");
        viewer=window.parent.vi;
        poda=[new Cesium.Cartesian3(-2291798.904204027, 5002720.935138895, 3214536.317111472),new Cesium.Cartesian3(-2291778.3393226336, 5002688.921614423, 3214631.708660834 )]
        pos=poda[parseInt(build)-1];
        viewer.camera.flyTo({
            destination : pos,
            orientation : {
                direction : new Cesium.Cartesian3(14,-30,-20),
                up : new Cesium.Cartesian3(0,0,0)
            }
        })
        // ifa=window.parent.document.getElementById("myFrame");
        // ifa.src="widgets/Statistics/teaching/result.html?"+String(build)+"-"+String(floor);
        const iframeSrc = "widgets/Statistics/teaching/result.html?"+String(build)+"-"+String(floor);
        window.parent.appk.toggleIframe(iframeSrc);
    }
}


