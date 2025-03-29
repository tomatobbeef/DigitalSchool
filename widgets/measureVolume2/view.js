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
        // 清除开挖效果
        if (thisWidget.TerrainClip) {
            thisWidget.TerrainClip.clear();
        }
 
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

    var digEffectFlag = false;
    $("#showDig").val(digEffectFlag==false?'模拟挖填':'关闭模拟');

    $("#showDig").click(function(){
        digEffectFlag = !digEffectFlag;

        if(digEffectFlag == true){
            $(this).addClass('btn-warning').removeClass('btn-primary').val('关闭模拟');
        }else{
            $(this).removeClass('btn-warning').addClass('btn-primary').val('模拟挖填');
        }
        thisWidget.showDigEffect(digEffectFlag);
    })
    // $("#trueHeight").click(function(){
    //     var num = Number($("#maxHeight").val());
    //     thisWidget.measureObj.maxHeight = num; 

    //     var num = Number($("#txtHeight").val());
    //     thisWidget.measureObj.height = num;
    // });
    $("#selHeight").click(function(){ 
        thisWidget.measureObj.selecteHeight(function(){
            showHeightRg(thisWidget.measureObj);
        });
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

    // 更新开挖效果
    if(thisWidget.TerrainClip){
        var fillHeight = measureObj.height - measureObj.minHeight - 1;
        thisWidget.TerrainClip.height = -fillHeight;
    }
}