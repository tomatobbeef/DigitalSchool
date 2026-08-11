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

function showSit(){
    // 向父页面发送消息
    window.parent.postMessage({
        action: 'showSit', // 指定要调用的父页面方法
    }, '*'); // 指定目标页面的来源（'*'表示任何来源，建议指定具体来源）
}

function showmap(){
    // 向父页面发送消息
    window.parent.postMessage({
        action: 'showmap', // 指定要调用的父页面方法
    }, '*'); // 指定目标页面的来源（'*'表示任何来源，建议指定具体来源）
}

function smartSegment(){
    // 在小窗口内切换到 SAGA 智能分割视图
    // 隐藏原始视图（按钮组），显示 SAGA 视图
    document.getElementById('originalView').style.display = 'none';
    var sagaView = document.getElementById('sagaView');
    sagaView.style.display = 'flex';
}

// 关闭 SAGA 视图，恢复原始视图
function closeSaga(){
    // 销毁 SAGA iframe 以释放 WebSocket 连接等资源
    var sagaFrame = document.getElementById('sagaFrame');
    if (sagaFrame) {
        sagaFrame.src = sagaFrame.src; // 重新加载页面会断开 WebSocket
    }
    // 恢复原始视图
    document.getElementById('sagaView').style.display = 'none';
    document.getElementById('originalView').style.display = 'block';
}

// 监听来自 SAGA iframe 的 postMessage（兼容降级方案）
window.addEventListener('message', function(event) {
    var data = event.data;
    if (data && data.action === 'closeSaga') {
        closeSaga();
    }
});

// const iframeSrc = 'widgets/Statistics/cateen/result.html?' + String(build);
//         window.parent.appk.toggleIframe(iframeSrc);