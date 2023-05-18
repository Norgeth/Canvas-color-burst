console.log("hello world");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let x = window.innerWidth-18;
let y = window.innerHeight-18;
ctx.canvas.width  = x;
ctx.canvas.height = y;
ctx.fillStyle = "green";
ctx.fillRect(x-window.innerWidth+18, y-150, 150, 150);





function moveUp(){
    console.log("jump");
    ctx.clearRect(x-window.innerWidth+18, y-150, 150, 150);
    y-=20
    ctx.fillRect(x-window.innerWidth+18, y-150, 150, 150);
}
function moveDown(){
    console.log("duck");
    ctx.clearRect(x-window.innerWidth+18, y-150, 150, 150);
    y+=20
    ctx.fillRect(x-window.innerWidth+18, y-150, 150, 150);
}
function moveLeft(){
    console.log("left");
    ctx.clearRect(x-window.innerWidth+18, y-150, 150, 150);
    x-=20
    ctx.fillRect(x-window.innerWidth+18, y-150, 150, 150);
}
function moveRight(){
    console.log("right");
    ctx.clearRect(x-window.innerWidth+18, y-150, 150, 150);
    x+=20
    ctx.fillRect(x-window.innerWidth+18, y-150, 150, 150);
    
    
}



document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode == '38') {
        moveUp();
    }
    else if (e.keyCode == '40') {
        moveDown();
    }
    else if (e.keyCode == '37') {
        moveLeft();
    }
    else if (e.keyCode == '39') {
        moveRight();
    }
}