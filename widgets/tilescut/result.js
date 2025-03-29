window.onload=function(){
    var x = document.getElementById("im");
    var y = document.getElementById("vi")
    var url=location.search;
    console.log(url);
    im=url.slice(1);
    console.log(im);
    if(im.substr(-1)=="i")
    {
        x.style.display="block"
        x.src="image/"+im+".png";
    }
    if(im.substr(-1)=="v")
    {
        y.style.display="block"
        y.src="image/"+im+".mp4";
    }
}

cl=function cl(){
    console.log("关闭");
    ifa=window.parent.document.getElementById("cht");
    console.log(ifa);
    //ifa.src="widgets/Statistics/teaching/result.html?"+String(build)+"-"+String(floor);
    ifa.style.display="none";
}