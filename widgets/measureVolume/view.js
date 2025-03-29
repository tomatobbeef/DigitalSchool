var thisWidget;

//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;

    if (thisWidget.config && thisWidget.config.style) {//适应不同样式
        $("body").addClass(thisWidget.config.style);
    }
    $("#measure").click(function(){ 
        thisWidget.measureObj.startDraw();
    });
    $("#clear").click(function(){
        thisWidget.measureObj.clear(); 
 
        $("#maxHeight").val("0");
        $("#txtHeight").val("0");
        // document.getElementById("maxHeightzt").innerHTML = "- - ";
        // document.getElementById("jzmHeight").innerHTML = "- - ";
    });
    $("#txtHeight").change(function(){
        var num = Number($(this).val());
        thisWidget.measureObj.height = num;
    });
    $("#maxHeight").change(function(){
        var num = Number($(this).val());
        thisWidget.measureObj.maxHeight = num; 
    });
    // $("#trueHeight").click(function(){
    //     var num = Number($("#maxHeight").val());
    //     thisWidget.measureObj.maxHeight = num; 

    //     var num = Number($("#txtHeight").val());
    //     thisWidget.measureObj.height = num;
    // });
    $("#selHeight").click(function(){ 
        thisWidget.measureObj.selecteHeight();
    });
}

//
function showHeightRg(measureObj) { 
    var height =measureObj.height.toFixed(0);
    $("#txtHeight").val(height);
    // $("#jzmHeight").html(height);

    var maxHeight =measureObj.maxHeight.toFixed(0);
    $("#maxHeight").val(maxHeight);
    // $("#maxHeightzt").html(maxHeight); 
}