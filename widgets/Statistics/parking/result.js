var certain
var car

window.onload=function(){
    console.log("开始请求");
    $.ajax({
        url: "cars.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            console.log("请求成功");
            car=data.CAR;
            //le=co.length;
            var i=0;
            var le=car.length;
            par = document.getElementById("carzone");
            for(i=0;i<le;i++)
            {
                //if(car[i].exist)
                ids=car[i].id-1;
                var divf = document.createElement("div");
                divf.id = i;
                dtop=parseInt((ids)/8)*80+parseInt(((ids)/8+1)/2)*40;
                divf.style = "position:absolute;width: 12.5%;height: 80px;border-style:solid;border-color:#fff;top:"+String(dtop)+"px;left:"+String(ids%8*12.5)+"%;";
                divf.value=i;
                divf.onclick=function choosecar(){
                    if(certain!=null)
                    {
                        va=certain.value;
                        if(document.getElementById("che").checked&&!car[va].exist)
                        {
                            certain.style.borderColor="#f00";
                        }else
                        {
                            certain.style.borderColor="#fff";
                        }
                    }
                    certain=this;
                    certain.style.borderColor="#ff0";
                    val=certain.value;
                    var nu=document.getElementById("number");
                    var ti=document.getElementById("time");
                    var outs=document.getElementById("outs");
                    var parking=document.getElementById("parking");
                    var inpart=document.getElementById("inpart");
                    inpart.style.display="none";
                    if(car[val].exist)
                    {
                        nu.innerHTML="车牌号："+String(car[val].number);
                        ti.innerHTML="停留时间："+String(car[val].hour)+"时"+String(car[val].min)+"分";
                        outs.style.display="block";
                        parking.style.display="none";
                    }else
                    {
                        nu.innerHTML="";
                        ti.innerHTML="";
                        outs.style.display="none";
                        parking.style.display="block";
                    }
                }
                par.appendChild(divf);

                var imgcar = document.createElement("img");
                imgcar.src="image/car ("+String(Math.round( Math.random()*11+0.5))+").png";
                imgcar.style="position:flex;flex-direction: column;align-items: center;justify-content: center;"
                if(car[i].exist)
                {
                    imgcar.style.display="block";
                }else
                {
                    imgcar.style.display="none";
                }
                if(0==parseInt(ids/8)%2)
                {
                    imgcar.style.transform="rotate(180deg)";
                }
                divf.appendChild(imgcar);
            }
        }
    })
}

cl=function cl(){
    window.parent.appk.closeIframe();
}

outpark=function outpark(){
    var val = certain.value;
    car[val].exist=false;
    certain.children[0].style.display="none";
    certain.onclick();
    highline();
}

showinp=function showinp(){
    var inpart=document.getElementById("inpart");
    inpart.style.display="block";
}

parki=function parki(){
    var inp=document.getElementById("innum").value;
    var val = certain.value;
    car[val].exist=true;
    car[val].number=inp;
    car[val].hour=0;
    car[val].min=0;
    certain.children[0].style.display="block";
    certain.onclick();
    highline();
}

highline=function highline(){
    var val = document.getElementById("che").checked;
    var le= car.length;
    var i=0;
    par = document.getElementById("carzone");
    if(val)
    {
        for(i=0;i<le;i++)
        {
            if(!car[i].exist)
            {
                var tar=par.children[i];
                if(tar!=certain)
                {
                    tar.style.borderColor="#f00";
                }
            }
        }
    }else
    {
        for(i=0;i<le;i++)
        {
            if(!car[i].exist)
            {
                var tar=par.children[i];
                if(tar!=certain)
                {
                    tar.style.borderColor="#fff";
                }
            }
        }
    }
}

jiankong=function jiankong(){
    console.log("变更播放状态")
    var val = document.getElementById("jk").checked;
    var jkzone = document.getElementById("jkzone");
    if(val)
    {
        jkzone.style.display="block";
    }else
    {
        jkzone.style.display="none";
    }
}


