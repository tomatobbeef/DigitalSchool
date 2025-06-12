window.onload = function () {
    console.log("启动");
    var x = document.getElementById("sel");
    var list = []; // 用于存储位置信息
    var jsonData; // 用于存储从JSON文件中获取的数据

    // 使用$.ajax加载本地JSON文件
    $.ajax({
        url: "data.json", // 确保路径正确
        type: "GET",
        dataType: "json",
        success: function (data) {
            jsonData = data; // 保存JSON数据
            var v = data.V;
            var vle = v.length;
            var k = 0;
            for (var i = 0; i < vle; i++) {
                if (v[i].hide != 1) {
                    list.push(v[i].position);
                    var option = new Option(v[i].name, k);
                    x.appendChild(option);
                    k++;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error("加载JSON文件失败：", error);
        }
    });

    // 为按钮添加点击事件
    document.getElementById("sr").addEventListener("click", function () {
        var selectedIndex = x.value; // 获取用户选择的选项索引
        if (selectedIndex === "") {
            alert("请选择一个选项！");
        } else {
            // 获取对应的JSON数据
            var selectedData = jsonData.V[selectedIndex];
            console.log("选中的数据：", selectedData);
            // 在这里可以根据selectedData执行后续操作
            // 向父页面发送消息
            window.parent.postMessage({
                action: 'indoor', // 指定要调用的父页面方法
                payload: {
                    data: selectedData,
                }
            }, '*'); // 指定目标页面的来源（'*'表示任何来源，建议指定具体来源）
        }
    });
};

function autowander(){
    // 向父页面发送消息
    window.parent.postMessage({
        action: 'autowander', // 指定要调用的父页面方法
        payload: {
            data: "start",
        }
    }, '*'); // 指定目标页面的来源（'*'表示任何来源，建议指定具体来源）
}

// const iframeSrc = 'widgets/Statistics/cateen/result.html?' + String(build);
//         window.parent.appk.toggleIframe(iframeSrc);