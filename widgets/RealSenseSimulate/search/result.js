window.onload=function(){
    var x = document.getElementById("im");
    var url=location.search;
    console.log(url);
    im=url.slice(1);
    console.log(im);
    x.src="video/"+im+".mp4";
}

cl=function cl(){
    window.parent.appk.closeIframe();
}