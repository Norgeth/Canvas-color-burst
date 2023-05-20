//first working version   #1

/////////////////////////////////////////////////////////////////////

// console.log("ok1");

// let xRect, yRect, xSize, ySize, move, velocity, speed;

// let stopMove = true;
// let arrowsBlocker = true;

// velocity = 5;
// speed = 10;

// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");

// function innit(){
    
//     xSize = 150;
//     ySize = 150;
//     xRect = 0;
//     yRect = window.innerHeight - 16 - 2 - ySize;
    
//     context.canvas.width = window.innerWidth - 16 - 2;
//     context.canvas.height = window.innerHeight - 16 - 2;

//     context.fillStyle = "red";
//     context.fillRect(xRect, yRect, xSize, ySize);
    
//     context.fillStyle = "aqua";
//     context.fillRect(150, yRect+50, 100, 100);
    

// }



// function render(){
    
//     context.fillRect(xRect, yRect, xSize, ySize);
    
// }
// setInterval(render,10)

// document.onkeydown = keyDown;
// function keyDown(e){
    
//         if (e.keyCode == '38' && stopMove && arrowsBlocker){//Up
//             arrowsBlocker=false
//             stopMove = !stopMove;
//             move = setInterval(()=>{
                
//                 yRect-=speed
//                 context.fillStyle = "green";
//                 context.clearRect(xRect, yRect+150, xSize, ySize)
//                 keepOnMap();
//             }, velocity)
            
//         };
//         if (e.keyCode == '40' && stopMove && arrowsBlocker){//Down
//             arrowsBlocker=false
//             stopMove = !stopMove;
//             move = setInterval(()=>{
                
//                 yRect+=speed
//                 context.fillStyle = "green";
//                 context.clearRect(xRect, yRect-150, xSize, ySize)
//                 keepOnMap();
//             }, velocity)
            
            
//         };
//         if (e.keyCode == '37' && stopMove && arrowsBlocker){//Left
//             arrowsBlocker=false
//             stopMove = !stopMove;
//             move = setInterval(()=>{
                
//                 xRect-=speed
//                 context.fillStyle = "green";
//                 context.clearRect(xRect+150, yRect, xSize, ySize)
//                 keepOnMap();
//             }, velocity)
            
            
//         };
//         if (e.keyCode == '39' && stopMove && arrowsBlocker){//Right
//             arrowsBlocker=false
//             stopMove = !stopMove;
//             move = setInterval(()=>{
                
//                 xRect+=speed
//                 context.fillStyle = "green";
//                 context.clearRect(xRect-150, yRect, xSize, ySize)
//                 keepOnMap();
//             }, velocity)
            
            
//         };
// };

// document.onkeyup = keyUp;
// function keyUp(e){//
//     if (e.keyCode == '38'){//Up
//         arrowsBlocker=true
//         context.fillStyle = "red";
//         // context.fillRect(xRect, yRect, xSize, ySize);
//         stopMove = !stopMove;
//         clearInterval(move);
//         console.log("xRect = " + xRect+",", "yRect = " + yRect);

//     };
//     if (e.keyCode == '40'){//Down
//         arrowsBlocker=true
//         context.fillStyle = "red";
//         // context.fillRect(xRect, yRect, xSize, ySize);
//         stopMove = !stopMove;
//         clearInterval(move);
//         console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
//     };
//     if (e.keyCode == '37'){//Left
//         arrowsBlocker=true
//         context.fillStyle = "red";
//         // context.fillRect(xRect, yRect, xSize, ySize);
//         stopMove = !stopMove;
//         clearInterval(move);
//         console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
//     };
//     if (e.keyCode == '39'){//Right
//         arrowsBlocker=true
//         context.fillStyle = "red";
//         // context.fillRect(xRect, yRect, xSize, ySize);
//         stopMove = !stopMove;
//         clearInterval(move);
//         console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
//     };
// };


// let keepOnMapX = window.innerWidth - 16 - 2 - 150 ;
// let keepOnMapY = window.innerHeight - 16 - 2 - 150;
// function keepOnMap(){
//     if(xRect>keepOnMapX){
//         xRect-=speed
//         clearInterval(move);
//     }
//     if(xRect<0){
//         xRect+=speed
//         clearInterval(move);
//     }
//     if(yRect>keepOnMapY){
//         yRect-=speed
//         clearInterval(move);
//     }
//     if(yRect<0){
//         yRect+=speed
//         clearInterval(move);
//     }
// }

/////////////////////////////////////////////////////////////////////


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//#1
var speedX=+5;
var speedY=-5;
var ballRadius = 100;
var color1 = '#' + Math.floor(Math.random() * 16777215).toString(16)

var x = window.innerWidth/7;
var y = window.innerHeight/1.3;
//#2
var speedX2=+7;
var speedY2=-7;
var ballRadius2 = 80;
var color2 = '#' + Math.floor(Math.random() * 16777215).toString(16)

var x2 = window.innerWidth/7;
var y2 = window.innerHeight/7;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function draw(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawBall();
    drawBall2();
    collisionCheck();
    console.log("x1 = "+Math.floor(x)+", y1= "+Math.floor(y)+" | x2 = "+Math.floor(x2)+", y2 = "+Math.floor(y2))
};
setInterval(draw, 10);

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2,true);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.closePath(); 
    x+=speedX;
    y+=speedY;
};

function drawBall2(){
    ctx.beginPath();
    ctx.arc(x2,y2,ballRadius2,0,Math.PI*2,true);
    ctx.fillStyle = color2;
    ctx.fill();
    ctx.closePath();
    x2+=speedX2;
    y2+=speedY2;
};

function collisionCheck(){
    if(y+speedY<0+ballRadius||y+speedY>window.innerHeight-ballRadius){
        speedY=-speedY;
        color1 = '#' + Math.floor(Math.random() * 16777215).toString(16)
        
    };
    if(x+speedX<0+ballRadius||x+speedX>window.innerWidth-ballRadius){
        speedX=-speedX;
        color1 = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    if(y2+speedY2<0+ballRadius2||y2+speedY2>window.innerHeight-ballRadius2){
        speedY2=-speedY2;
        color2 = '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
    if(x2+speedX2<0+ballRadius2||x2+speedX2>window.innerWidth-ballRadius2){
        speedX2=-speedX2;
        color2 = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    // if(a==a){   
    //     speedY2=-speedY2;
    //     speedX=-speedX;
    // }collisions with objects not walls
}







 
// function test(){
//    let a,b,c,d;
//     function test1(){
//         a=10
//         b=15
//         c=20
//         d=25
//         console.log(b)
//     }

//     test1()
// }

// test();