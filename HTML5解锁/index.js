var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var chooseType = 3;
var arrCircle = [];
var lastPath = [];
var password = "";
var radius = 0;

function createCircle() {
    var n = chooseType;
    lastPath = [];
    arrCircle = [];
    radius = (ctx.canvas.width - 2) / (4 * n + 4 * n - 4);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            arrCircle.push({
                x: j * 4 * radius + j * 4 * radius + 2 * radius + 1,
                y: i * 4 * radius + i * 4 * radius + 2 * radius + 1
            });
        }
    }
}

function drawCircle() {
    var r = 2 * radius;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,1)";

    for (var i = 0, l = arrCircle.length; i < l; i++) {
        // ctx.save();
        var point = arrCircle[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, r, 0, 2 * Math.PI, false);
        ctx.stroke();
        // ctx.restore();
    }
    ctx.restore();
}

function drawPoint(x, y) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
}

function getPosition(e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    var node = canvas;
    while (node) {
        var offsetX = node.offsetLeft;
        var offsetY = node.offsetTop;
        y = y - offsetY;
        x = x - offsetX;
        node = node.offsetParent;
    }
    return {
        x: x,
        y: y
    };
}

function bindEvent() {
    canvas.addEventListener("touchstart", function(e) {
        var pos = getPosition(e);
        var r = 2 * radius;
        for (var i = 0, l = arrCircle.length; i < l; i++) {
            if (Math.abs(pos.x - arrCircle[i].x) < r && Math.abs(pos.y - arrCircle[i].y) < r) {
                console.log("第几个点：", i);
                lastPath.push(arrCircle[i]);
                break;
            }
        }
    }, false);
    canvas.addEventListener("touchmove", function(e) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawCircle();
        ctx.save();
        var pos = getPosition(e);
        var r = 2 * radius;
        for (var i = 0, l = arrCircle.length; i < l; i++) {
            if (Math.abs(pos.x - arrCircle[i].x) < r && Math.abs(pos.y - arrCircle[i].y) < r) {
                console.log("第几个点：", i);
                lastPath.push(arrCircle[i]);
                break;
            }
        }
        for (var i = 0, l = lastPath.length; i < l; i++) {
            var point = lastPath[i];
            drawPoint(point.x, point.y)
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }, false);
    canvas.addEventListener("touchend", function(e) {

    }, false);
}

function init() {
    createCircle();
    drawCircle();
    bindEvent();
    // drawPoint(arrCircle[0].x, arrCircle[0].y);
}
init();