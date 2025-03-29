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
}

var lastVal = 0;
var lastSection = null;
var list=[];

window.onload=function(){
    console.log("启动");
    var x = document.getElementById("sel");
    $.ajax({
        url: "../data.json",//同文件夹下的json文件路径
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
    viewer=thisWidget.viewer;
    console.log("kp:",kp);
    console.log(viewer);
    
    
    
    viewer.camera.flyTo({
        destination : kp,
        orientation : {
            direction : new Cesium.Cartesian3(14,-30,-20),
            up : new Cesium.Cartesian3(0,0,0)
        }
    })
}

//从父页面调用
function showResult(valstr, val) {
    if (val)
        lastVal = val;
    $("#lbl_measure_result").html(valstr);
}


function showSectionResult(param, val) {
    if (haoutil.isutil.isString(param)) {
        showResult(param, val);
        return;
    }else{
        lastSection = param
	}
    showResult(param.distancestr, param.distance);
    var danwei = $('#measure_length_danwei').val();
    thisWidget.showSectionChars(param,danwei || 'auto');
}

function switchon(){
    thisWidget.onSwitch({
        unit: $('#measure_length_danwei').val(),
        isSuper: true,
        calback: showResult
    });
}

function searchplace(){
    thisWidget.Placrsearch({
        unit: $('#measure_length_danwei').val(),
        isSuper: true,
        calback: showResult
    });
}


function buildingInspection(){
    console.log("buildingInspection");
    thisWidget.inspectionBuilding({
        unit: $('#measure_length_danwei').val(),
        isSuper: true,
        calback: showResult
    });
}

function test01(abc){
   
    alert(abc);

    thisWidget.test();
}



