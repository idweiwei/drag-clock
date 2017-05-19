'use strict';

var canvas = document.querySelector('canvas'),
    cvs = canvas.getContext('2d');
var _width = canvas.width,
    _height = canvas.height,
    angle = Math.PI/180;
function drawClock(_angle) {
    cvs.clearRect(0,0,_width,_height);
    cvs.save();
//绘制 圆形
    cvs.beginPath();
    cvs.strokeStyle= '#000';
    cvs.strokeWidth= 2;
    cvs.arc(_width/2,_height/2,150,0,360*angle,false);
    cvs.stroke();
    cvs.closePath();
//绘制 刻度
    cvs.strokeStyle='#foo';
    cvs.strokeWidth = 1;
    cvs.translate(_width/2,_height/2);
    for(var j=0; j<12; j++){
        cvs.save();
        cvs.rotate(30*angle*j);
        cvs.moveTo(0,-140);
        cvs.lineTo(0,-150);
        cvs.stroke();

        for(var i=1; i<=4; i++){
            cvs.save();
            cvs.rotate(angle*6*i);
            cvs.moveTo(0,-145);
            cvs.lineTo(0,-150);
            cvs.stroke();
            cvs.restore();
        }
        cvs.restore();
    }


    cvs.strokeStyle= '#f00';
    cvs.strokeWidth= 2;
//绘制指针
    //分针
    rotateMinute(_angle);
    //时针
    rotateHour(_angle);

//旋转指针
    function rotateMinute(degree) {
        cvs.save();
        cvs.rotate(degree*angle);
        cvs.beginPath();
        cvs.moveTo(0,0);
        cvs.lineTo(0,-100);
        cvs.stroke();
        cvs.closePath();
        cvs.restore();
    }
    function rotateHour(degree) {
        cvs.save();
        cvs.rotate(degree*angle/12);
        cvs.beginPath();
        cvs.moveTo(0,0);
        cvs.lineTo(0,-60);
        cvs.stroke();
        cvs.closePath();
        cvs.restore();
    }
    cvs.restore();
}
//初始化钟表
drawClock(0);
//绘制扇形图
function drawSector(x, y, r, sdegree, edegree, color) {
    var single = Math.PI / 180;
    cvs.fillStyle = color;
    cvs.beginPath();
    cvs.moveTo(x, y);

    cvs.arc(x, y, r, sdegree * single, edegree * single, false);
    cvs.closePath();
    cvs.fill();
}



var offset = canvas.getBoundingClientRect();
var flag = false;
var startX,startY,moveX,moveY,shortSide,longSide;
canvas.addEventListener('mousedown',function (e) {
    flag = true;
    startX = e.clientX-offset.left -10;
    startY = e.clientY-offset.top -10;

    shortSide = startX-_width/2;
    longSide = _height/2-startY;

    var angle = Math.round(Math.atan2(shortSide,longSide)*180/Math.PI);

    if(angle<0){
        angle = 360+angle
    }
    console.log(angle);

    drawClock(angle);

    drawSector(_width/2,_height/2,100,-90,angle-90,'#ccc');
});

canvas.addEventListener('mousemove',function (e) {
    if(!flag) return;

    moveX = e.clientX-offset.left-10;
    moveY = e.clientY-offset.top-10;

    shortSide = moveX-_width/2;
    longSide = _height/2-moveY;

    var angle = Math.round(Math.atan2(shortSide,longSide)*180/Math.PI);

    if(angle<0){
        angle = 360+angle
    }
    console.log(angle);
    drawClock(angle);
});

canvas.addEventListener('mouseup',function () {
    flag = false;
});

