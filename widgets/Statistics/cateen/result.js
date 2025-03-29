var im;
var dat;
window.onload = function() {
    var url = location.search;
    im = url.slice(1);
    dat = [
        [["羊肉串", "2元/串", "1"], ["鸡排", "17/份", "2"], ["北京烤鸭", "23/份", "3"]],
        [["宫保鸡丁", "13/份", "1"], ["牛肉面", "12/份", "2"]]
    ];
    nob = parseInt(im) - 1;
    var le = dat[nob].length;
    var menuSelect = document.getElementById("menuSelect");

    for (var i = 0; i < le; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = dat[nob][i][0];
        menuSelect.add(option);
    }

    var pnumel = document.getElementById("people");
    pnum = Math.floor(Math.random() * 100) + 50;
    pnumel.innerHTML = "食堂内人数：" + String(pnum) + "人";
    peo();
};

var pnum;

function peo() {
    var pnumel = document.getElementById("people");
    pnum += Math.floor(Math.random() * 11) - 5;
    pnumel.innerHTML = "食堂内人数：" + String(pnum) + "人";
    var nt = (Math.floor(Math.random() * 7) + 1) * 1000;
    setTimeout(peo, nt);
}

cl = function cl() {
    window.parent.appk.closeIframe();
}

function updateInfo() {
    var menuSelect = document.getElementById("menuSelect");
    var selectedIndex = menuSelect.value;
    var pho = document.getElementById("pho");
    var na = document.getElementById("na");
    var price = document.getElementById("price");
    var nob = parseInt(im) - 1;

    na.innerHTML = dat[nob][selectedIndex][0];
    price.innerHTML = dat[nob][selectedIndex][1];
    pho.src = "image/" + im + "-" + dat[nob][selectedIndex][2] + ".jpg";
}
