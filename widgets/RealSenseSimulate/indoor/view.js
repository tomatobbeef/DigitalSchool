


var list=[];

window.onload=function(){
    console.log("启动");
    var x = document.getElementById("sel");
    $.ajax({
        url: "data.json",//同文件夹下的json文件路径
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法 
            v=data.V;
            vle=v.length;
            var i;
            var k=0;
            for(i=0;i<vle;i++){
                if(v[i].hide!=1)
                {
                    list.push(v[i].position)
                    var option = new Option(v[i].name, k);
                    x.appendChild(option);
                    k++;
                }
            }
        }
    })
}




