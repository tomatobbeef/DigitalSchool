var co;
var ty;

window.onload=function(){
    console.log("开始请求");
    $.ajax({
        url: "commodity.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            console.log("请求成功");
            co=data.CO;
            ty=data.TY;
            //le=co.length;
            //var i=0;

            show();

            fsel= document.getElementById("sel1");
            var tyle=ty.length;
            var i=0;
            for(i=0;i<tyle;i++){
                var option = new Option(ty[i][0], i);
                fsel.appendChild(option);
            }
            custo();
        }
    })
}

custo=function custo(){
    var le=co.length;
    var usnum=Math.floor(Math.random() * 2)+1
    var se=Math.floor(Math.random() * le)
    var nt=(Math.floor(Math.random() * 7)+1)*1000;
    co[se].nums-=usnum;
    if(co[se].nums<0)co[se].nums=0;
    show();
    setTimeout(custo,nt);
}

changef=function changef(){
    sel1= document.getElementById("sel1");
    sel2= document.getElementById("sel2");
    var j=0;
    sele=sel2.length;
    console.log("sel2:",sele);
    for(j=1;i<sele;j++)
    {
        //sel2.remove(j);
    }
    sel2.length=1;
    var index1=sel1.selectedIndex;
    var fcla=sel1.options[index1].value;
    if(fcla!=-1)
    {
        var clist=ty[fcla][1];
        var i=0;
        var cle=clist.length;
        for(i=0;i<cle;i++)
        {
            var option = new Option(clist[i], i);
            option.id="newop";
            sel2.appendChild(option);
        }
    }
    changec()
},

changec=function changec(){
    sel1= document.getElementById("sel1");
    sel2= document.getElementById("sel2");
    var index1=sel1.selectedIndex;
    var index2=sel2.selectedIndex;
    var fcla=sel1.options[index1].value;
    var scla=sel2.options[index2].value;
    le=co.length;
    var i=0;
    for(i=0;i<le;i++)
    {
        if(fcla==-1)
        {
            co[i].show=1;
        }else if(co[i].F==fcla&&(scla==-1||co[i].S==scla))
        {
            co[i].show=1;
        }else
        {
            co[i].show=0;
        }
    }
    show();
},

show=function show(){
    console.log("显示刷新");
    par = document.getElementById("cozone");
    while (par.firstChild) {
         par.firstChild.remove()
    }
    le=co.length;
    var i=0;
    var clda=["#00fde2", "#00e9cf", "#00d5bc", "#00c1a9", "#00ad96", "#009983", "#008570", "#00715d"]    ;
    cdle=clda.length;
    for(i=0;i<le;i++)
    {
        if(co[i].show==1)
        {
            ids=co[i].id-1;
            var divf = document.createElement("div");
            divf.id = i;
            divf.style = "position:relative;width: 100%;height: 80px;background-color: "+clda[i%cdle]+";border-style:solid;";
            divf.value=i;
            par.appendChild(divf);

            var im =  document.createElement("img");
            im.src="image/"+String(ids+1)+".jpg";
            im.style = "position:absolute;right:0%;top:0%;height:80px;";
            divf.appendChild(im);

            var na = document.createElement("p");
            na.innerHTML="商品名称："+co[ids].name;
            na.style = "position:absolute;left:0%;top:0px;height:20px;color:white;"
            divf.appendChild(na);

            var pr = document.createElement("p");
            pr.innerHTML="商品价格："+String(co[ids].price);
            pr.style = "position:absolute;left:0%;top:20px;height:20px;color:white;"
            divf.appendChild(pr);

            var pr = document.createElement("p");
            var pnum =Math.floor(Math.random() * 100)+100;
            pr.innerHTML="剩余数量："+String(co[ids].nums);
            pr.style = "position:absolute;left:0%;top:40px;height:20px;color:white;"
            divf.appendChild(pr);
        }
    }
}

cl=function cl(){
    window.parent.appk.closeIframe();
}