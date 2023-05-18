console.log("ok");

var canvas;
var context;

let xCanvas;
let yCanvas;

let xRect = 0;
let yRect = window.innerHeight-150-16-2;

const innit = function init() {
xCanvas = window.innerWidth
yCanvas = window.innerHeight
canvas = document.getElementById('canvas');
context = canvas.getContext("2d");
context.canvas.width = xCanvas - 16 - 2;
context.canvas.height = yCanvas - 16 - 2;

draw();

}

function draw(){
    setInterval(redraw, 1)

}

function redraw(){

context.fillStyle = "green";
context.fillRect(xRect, yRect, 150, 150); //ustawianie jako metoda
}

document.onkeydown = checkKey
function checkKey(e) {
    if (e.keyCode == '38') {
        // moveUp();
        context.clearRect(xRect, yRect, 150, 150);
        yRect-=100
    }
    else if (e.keyCode == '40') {
        // moveDown();
        context.clearRect(xRect, yRect, 150, 150);
        yRect+=100
    }
    else if (e.keyCode == '37') {
        // moveLeft();
        context.clearRect(xRect, yRect, 150, 150);
        xRect-=100
    }
    else if (e.keyCode == '39') {
        // moveRight();
        context.clearRect(xRect, yRect, 150, 150);
        xRect+=100
    }
}