console.log("hello world");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillStyle = "red";
context.fillReact = (10, 10, 150, 100);

function moveUp(){
    console.log("jump");
}
function moveDown(){
    console.log("duck");
}
function moveLeft(){
    console.log("left")
}
function moveRight(){
    console.log("right");
    
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