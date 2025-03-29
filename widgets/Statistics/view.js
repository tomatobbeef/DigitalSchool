var thisWidget;
var thisType = "";

//当前页面业务

var lastVal = 0;
var lastSection = null;

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

function Mteaching(){
    window.parent.childopen(null,"newht","widgets/Statistics/teaching/teaching.html")
}
function Mcanteen(){
    window.parent.childopen(null,"newht","widgets/Statistics/cateen/cateen.html")
}

function Mshoping(){
    const iframeSrc = "widgets/Statistics/shopping/result.html"
    window.parent.appk.toggleIframe(iframeSrc);
}

function Mparking(){
    viewer=window.parent.vi;
    pos=new Cesium.Cartesian3(-2291586.778134185, 5002807.385131771, 3214749.829807341)
    viewer.camera.flyTo({
        destination : pos,
        orientation : {
            direction : new Cesium.Cartesian3(14,-30,-20),
            up : new Cesium.Cartesian3(0,0,0)
        }
    })
    var ifa=window.parent.document.getElementById("myFrame");
    ifa.style.display="block";
    ifa.src="widgets/Statistics/parking/result.html";
    /*
    thisWidget.ParkingMessage({
        unit: $('#measure_length_danwei').val(),
        isSuper: true,
        calback: showResult
    });*/
}

function Outp(){
    viewer=window.parent.vi;
    viewer.render();
    scene=viewer.scene;
    saveToFile(scene);
}

function saveToFile(scene) {
    let canvas = scene.canvas;
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement("a");
    let blob = dataURLtoBlob(image);
    let objurl = URL.createObjectURL(blob);
    link.download = "scene.png";
    link.href = objurl;
    link.click();

}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}



function buildingInspection(){
    console.log("buildingInspection");
    thisWidget.inspectionBuilding({
        unit: $('#measure_length_danwei').val(),
        isSuper: true,
        calback: showResult
    });
}

