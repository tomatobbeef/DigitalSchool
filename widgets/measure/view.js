spacedistance=function spacedistance(){
    window.parent.drawroa(0);
    //drawroa(0);
}

spacedistancetd=function spacedistancetd(){
    window.parent.drawroa(1);
    //drawroa(1);
}
heightmea=function heightmea(){
    window.parent.drawroa(2);
    //drawroa(1);
}
areamea=function areamea(){
    window.parent.areamea();
    //drawroa(1);
}

delda=function delda(){
    //window.parent.delda();
    window.parent.delda();
}

tanglemea=function tanglemea(){
    window.parent.drawroa(3);
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
