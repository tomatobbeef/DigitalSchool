var thisWidget;
var thisType = "";
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
var roadlist=[];
var djslist=[];
var djsblist=[];

var st = function st(star)
{
    djslist.splice(0,djslist.length);
    //console.log(djslist);
    rle=roadlist.length
    for(i=0;i<rle;i++)
    {
        var rx = {
            id : null,
            road : [],
            stdis : -1,
        };
        rx.id=v[i].id;
        djslist.push(rx);
    }
    //asda=[];
    //asda.push(parseInt(star))
    roads=[parseInt(star)]
    tool(star,[1,roads,0]);
    djs(star,roads,0);
}

var djs = function djs(star,road,distance)
{
    //console.log(road);
    var newroad=new Array();
    newroad=road;
    //console.log("newroad:",newroad);
    var ne=[[]];
    var i=0;
    var rle=roadlist.length;
    //console.log("rle",rle)
    for(i=0;i<rle;i++)
    {
        //console.log("搜索ne",roadlist[i].id,":=:",star)
        if(roadlist[i].id==star)
        {
            //console.log("找到ne");
            ne=roadlist[i].near;
            //console.log(ne);
            break;
        }
    };
    var nle=ne.length;
    for(i=0;i<nle;i++)
    {
        //console.log("road:",newroad,",ne[i][0]:",ne[i][0],",include:",newroad.includes(ne[i][0]))
        if(newroad.includes(ne[i][0]))
        {

        }else
        {
            //console.log("d:",distance,";",ne[i][1]);
            d=distance+parseFloat(ne[i][1]);
            u=tool(ne[i][0],[0]);
            //console.log("u:",u,"d:",d);
            if(d<u||u<0)
            {
                newroad.push(ne[i][0]);
                //console.log(newroad);
                tool(ne[i][0],[1,newroad,d]);
                djs(ne[i][0],newroad,d);
                newroad.pop();
                //console.log(roads);


            }
        }
    }
}

var tool =function tool(id,method)//method:[num方法序号,[]路径数组,distance距离]
{
    var dle=djslist.length;
    var i=0;
    //console.log(djslist);
    for(i=0;i<dle;i++)
    {
        //console.log(id,":",djslist[i].id);
        if(djslist[i].id==id)
        {
            //console.log(id,":",djslist[i].id);
            switch(method[0]){
                case 0:
                    {
                        //返回值，用于查找距离
                        return djslist[i].stdis;
                    }
                case 1:
                    {
                        //用于修改指定量
                        djslist[i].road=method[1].slice();
                        //console.log(djslist[i].road)
                        djslist[i].stdis=method[2];
                        break;
                    }
                case 2:
                    {
                        //用于查看结果
                        //console.log("结果：",[djslist[i].stdis,djslist[i].road])
                        return [djslist[i].stdis,djslist[i].road]
                    }
            }
        }
    }
}
//美
var stb = function stb(star)
{
    djsblist.splice(0,djsblist.length);
    console.log(djsblist);
    rle=roadlist.length
    for(i=0;i<rle;i++)
    {
        var rx = {
            id : null,
            road : [],
            stdis : -1,
        };
        rx.id=v[i].id;
        djsblist.push(rx);
    }
    console.log("broad:",djsblist)
    //asda=[];
    //asda.push(parseInt(star))
    roads=[parseInt(star)]
    tool(star,[1,roads,0]);
    djsb(star,roads,0);
}

var djsb = function djsb(star,road,distance)
{
    //console.log(road);
    var newroad=new Array();
    newroad=road;
    //console.log("newroad:",newroad);
    var ne=[[]];
    var i=0;
    var rle=roadlist.length;
    //console.log("rle",rle)
    for(i=0;i<rle;i++)
    {
        //console.log("搜索ne",roadlist[i].id,":=:",star)
        if(roadlist[i].id==star)
        {
            //console.log("找到ne");
            ne=roadlist[i].near;
            //console.log(ne);
            break;
        }
    };
    var nle=ne.length;
    for(i=0;i<nle;i++)
    {
        //console.log("road:",newroad,",ne[i][0]:",ne[i][0],",include:",newroad.includes(ne[i][0]))
        if(newroad.includes(ne[i][0]))
        {

        }else
        {
            //console.log("beauty",ne[i][2]);
            //d=distance+parseFloat(ne[i][1])*ne[i][2];
            d=distance+parseFloat(ne[i][2]);
            u=tool(ne[i][0],[0]);
            //console.log("u:",u,"d:",d);
            if(d<u||u<0)
            {
                newroad.push(ne[i][0]);
                //console.log(newroad);
                tool(ne[i][0],[1,newroad,d]);
                djsb(ne[i][0],newroad,d);
                newroad.pop();
                //console.log(roads);


            }
        }
    }
}












var idtopo = function idtopo(ids){
    //console.log("ids:",ids);
    var answ=[]
    vle=v.length;
    ile=ids.length;
    i=0;
    j=0;
    for(j=0;j<ile;j++)
    {
        for(i=0;i<vle;i++)
        {
            if(v[i].id==ids[j])
            {
                //console.log(v[i].id,"::",ids[j])
                pok=new Cesium.Cartesian3(0,0,0.1)
                pok.x=v[i].position[0];
                pok.y=v[i].position[1];
                pok.z=v[i].position[2];
                answ.push(pok);
                break;
            }
        }
    }
    return answ;
}

window.onload=function(){
    console.log("启动");
    var x = document.getElementById("sel1");
    var y = document.getElementById("sel2");
    $.ajax({
        url: "../data.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            v=data.V;
            e=data.E;
            vle=v.length;
            var i;
            var j;
            var k=0;
            for(i=0;i<vle;i++){
                if(v[i].hide!=1)
                {
                    k=v[i].id;
                    //console.log(i,"k",k);
                    list.push(v[i].position);
                    var option = new Option(v[i].name, k);
                    var optiony = new Option(v[i].name, k);
                    x.appendChild(option);
                    y.appendChild(optiony);
                }
            }

            var rkx;
            ele=e.length;
            for(i=0;i<vle;i++)
            {
                var rx = {
                    id : null,
                    near:[[]],
                };
                rx.id=v[i].id;
                roadlist.push(rx);
            }
            for(i=0;i<vle;i++)
            {
                rkx=[];
                for(j=0;j<ele;j++)
                {
                    if(e[j].p1==v[i].id)
                    {
                        rkx.push([e[j].p2,parseFloat(e[j].distance),e[j].beauty]);
                    }else if(e[j].p2==v[i].id)
                    {
                        rkx.push([e[j].p1,parseFloat(e[j].distance),e[j].beauty]);
                    }
                }
                roadlist[i].near=rkx;
            }
        }
    })
}

var ans;
var kcx;
var kcxb;
var sh=function sh(color){
    console.log("执行：",color);
    return color;
}

function searr(){
    //console.log("开始搜索");
    var x = document.getElementById("sel1");
    var y = document.getElementById("sel2");
    var index1=x.selectedIndex;
    var index2=y.selectedIndex;
    star=x.options[index1].value;
    fin=y.options[index2].value;
    //console.log("stat",star);
    //console.log("fin",fin);
    //console.log(djslist);
    st(star);
    ans=tool(fin,[2])
    console.log(ans);
    viewer=thisWidget.viewer;
    ansp=idtopo(ans[1]);
    console.log(ansp);
    if(kcx!=null){
        viewer.entities.remove(kcx)
    }
    mat=new Cesium.Material({
        fabric: {
          type: 'Color',
          uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5)
          }
        }
      })
    console.log(mat);
    kcx=viewer.entities.add({
        name: "Red tube with rounded corners",
            polylineVolume: {
              positions: ansp,
              shape: [
                new Cesium.Cartesian2(-2, -2),
                new Cesium.Cartesian2(2, -2),
                new Cesium.Cartesian2(2, 2),
                new Cesium.Cartesian2(-2, 2),
              ],
            cornerType: Cesium.CornerType.BEVELED,
                material: Cesium.Color.RED,
                outline: true,
                outlineWidth: 1,
                outlineColor: Cesium.Color.RED,
                material: Cesium.Color.YELLOW
            },
    })
    console.log(kcx.polylineVolume.outlineWidth);

    
    stb(star);
    ans=tool(fin,[2])
    console.log(ans);
    viewer=thisWidget.viewer;
    ansp=idtopo(ans[1]);
    console.log(ansp);
    if(kcxb!=null){
        viewer.entities.remove(kcxb)
    }
    kcxb=viewer.entities.add({
        name: "Red tube with rounded corners",
            polylineVolume: {
              positions: ansp,
              shape: [
                new Cesium.Cartesian2(0, -3),
                new Cesium.Cartesian2(1, -1),
                new Cesium.Cartesian2(3, 0),
                new Cesium.Cartesian2(1, 1),
                new Cesium.Cartesian2(0, 3),
                new Cesium.Cartesian2(-1, 1),
                new Cesium.Cartesian2(-3, 0),
                new Cesium.Cartesian2(-1, -1),
              ],
            cornerType: Cesium.CornerType.BEVELED,
                material: Cesium.Color.DEEPPINK,
                outline: true,
                outlineWidth: 1,
                outlineColor: Cesium.Color.YELLOW,
                material: Cesium.Color.YELLOW
            },
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



