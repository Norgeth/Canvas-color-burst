//first working version   #1

console.log("ok1");

let xRect, yRect, xSize, ySize, move, velocity, speed;

let stopMove = true;
let arrowsBlocker = true;

velocity = 5;
speed = 10;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function innit(){
    
    xSize = 150;
    ySize = 150;
    xRect = 0;
    yRect = window.innerHeight - 16 - 2 - ySize;
    
    context.canvas.width = window.innerWidth - 16 - 2;
    context.canvas.height = window.innerHeight - 16 - 2;

    context.fillStyle = "red";
    context.fillRect(xRect, yRect, xSize, ySize);


}



function render(){
    context.fillRect(xRect, yRect, xSize, ySize);
    
}
setInterval(render,1)

document.onkeydown = keyDown;
function keyDown(e){
    
        if (e.keyCode == '38' && stopMove && arrowsBlocker){//Up
            arrowsBlocker=false
            stopMove = !stopMove;
            move = setInterval(()=>{
                
                yRect-=speed
                context.fillStyle = "green";
                context.clearRect(xRect, yRect+150, xSize, ySize)
                keepOnMap();
            }, velocity)
            
        };
        if (e.keyCode == '40' && stopMove && arrowsBlocker){//Down
            arrowsBlocker=false
            stopMove = !stopMove;
            move = setInterval(()=>{
                
                yRect+=speed
                context.fillStyle = "green";
                context.clearRect(xRect, yRect-150, xSize, ySize)
                keepOnMap();
            }, velocity)
            
            
        };
        if (e.keyCode == '37' && stopMove && arrowsBlocker){//Left
            arrowsBlocker=false
            stopMove = !stopMove;
            move = setInterval(()=>{
                
                xRect-=speed
                context.fillStyle = "green";
                context.clearRect(xRect+150, yRect, xSize, ySize)
                keepOnMap();
            }, velocity)
            
            
        };
        if (e.keyCode == '39' && stopMove && arrowsBlocker){//Right
            arrowsBlocker=false
            stopMove = !stopMove;
            move = setInterval(()=>{
                
                xRect+=speed
                context.fillStyle = "green";
                context.clearRect(xRect-150, yRect, xSize, ySize)
                keepOnMap();
            }, velocity)
            
            
        };
};

document.onkeyup = keyUp;
function keyUp(e){//
    if (e.keyCode == '38'){//Up
        arrowsBlocker=true
        context.fillStyle = "red";
        // context.fillRect(xRect, yRect, xSize, ySize);
        stopMove = !stopMove;
        clearInterval(move);
        console.log("xRect = " + xRect+",", "yRect = " + yRect);

    };
    if (e.keyCode == '40'){//Down
        arrowsBlocker=true
        context.fillStyle = "red";
        // context.fillRect(xRect, yRect, xSize, ySize);
        stopMove = !stopMove;
        clearInterval(move);
        console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
    };
    if (e.keyCode == '37'){//Left
        arrowsBlocker=true
        context.fillStyle = "red";
        // context.fillRect(xRect, yRect, xSize, ySize);
        stopMove = !stopMove;
        clearInterval(move);
        console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
    };
    if (e.keyCode == '39'){//Right
        arrowsBlocker=true
        context.fillStyle = "red";
        // context.fillRect(xRect, yRect, xSize, ySize);
        stopMove = !stopMove;
        clearInterval(move);
        console.log("xRect = " + xRect+",", "yRect = " + yRect);
        
    };
};


let keepOnMapX = window.innerWidth - 16 - 2 - 150 ;
let keepOnMapY = window.innerHeight - 16 - 2 - 150;
function keepOnMap(){
    if(xRect>keepOnMapX){
        xRect-=speed
        clearInterval(move);
    }
    if(xRect<0){
        xRect+=speed
        clearInterval(move);
    }
    if(yRect>keepOnMapY){
        yRect-=speed
        clearInterval(move);
    }
    if(yRect<0){
        yRect+=speed
        clearInterval(move);
    }
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