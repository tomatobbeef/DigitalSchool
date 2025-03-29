sltj=function sltj(){
    const iframeSrc = 'widgets/tucengguanli/result.html';
    window.parent.appk.openPopup('widgets/tucengguanli/sltj/sltj.html');
}
kxcx=function kxcx(){
    window.parent.appk.openPopup('widgets/two-dimension/chaxun/chaxun.html')
}

spacedistancetd=function spacedistancetd(){
    window.parent.drawroa(1);
    //drawroa(1);
}
heightmea=function heightmea(){
    if(window.parent.txdjs==2)window.parent.txdjs=0
    else window.parent.txdjs=2;
}
areamea=function areamea(){
    if(window.parent.txdjs==1)window.parent.txdjs=0
    else window.parent.txdjs=1;
}

delda=function delda(){
    //window.parent.delda();
    window.parent.delda();
}

tanglemea=function tanglemea(){
    window.parent.appk.openPopup('widgets/tucengguanli/tucengxianyin/xianyin.html')
}

positionmea=function position(){
    window.parent.positionmea();
}

cha=function cha(){
    console.log("change")
    var x = document.getElementById("measure_length_danwei");
    var index=x.selectedIndex;
    window.parent.cha(index);
}
