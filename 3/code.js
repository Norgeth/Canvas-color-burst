const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
const balls = [];
let isStrokeActive = false;
let startTime = performance.now();

const getRandomInt = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getRandomColor = () => {
    const hue = getRandomInt(0,360);
    const saturation = 100;
    const lightness = Math.floor(Math.random() * 30) + 50; // random lightness (50-80)
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
  };

const addStroke = (e) => {
  if(e.code == "Space"){
    isStrokeActive = !isStrokeActive;
  }
}

const drawBall = (x,y,radius,color) => {
    context.beginPath();
    context.lineWidth = 3;
    context.arc(x,y,radius,0,2*Math.PI);
    context.fillStyle = color;
    context.fill();
    if(isStrokeActive){
    context.stroke();
    }
    context.closePath();
    
}

const drawText = () => {
    context.beginPath();
    context.fillStyle = ""
    context.strokeStyle = "black";
    context.font = "100px arial";
    context.textAlign = "center";
    context.lineWidth = 4;
    const text = "Use spacebar to add border";
    const x = window.innerWidth/2;
    const y = window.innerHeight-80;
    context.fillText(text,x,y);
    context.strokeText(text,x,y);
    context.closePath();
}

const createBalls = () => {
    count = getRandomInt(100,100);
      for(let i = 0; i<count; i++){
          const radius = getRandomInt(20,100);
          const mass = 100/radius;
          const speedX = (getRandomInt(-50,50))*mass;
          const speedY = (getRandomInt(-50,50))*mass;
          const x = getRandomInt(radius,window.innerWidth-radius);
          const y = getRandomInt(radius,window.innerHeight-radius);
          const color = getRandomColor();
          balls.push({x,y,radius,color,speedX,speedY});
      }  
}

createBalls();

const draw = () => {
  context.clearRect(0,0,window.innerWidth,window.innerHeight);
  balls.forEach(ball => {drawBall(ball.x, ball.y, ball.radius, ball.color)})
  drawText();
}

const update = (deltaTime) => {
    for(let i = 0; i<count; i++){
       balls[i].x += balls[i].speedX*deltaTime;
       balls[i].y += balls[i].speedY*deltaTime;
       if(balls[i].x>window.innerWidth-(balls[i].radius)||balls[i].x<0+(balls[i].radius)){
          balls[i].speedX*=-1;
       }
       if(balls[i].y>window.innerHeight-(balls[i].radius)||balls[i].y<0+(balls[i].radius)){
         balls[i].speedY*=-1;
       }      
    }
}

const render = (currentTime) => {
    let deltaTime = (currentTime-startTime)/1000;
    startTime = currentTime;
    draw();
    update(deltaTime);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
window.addEventListener("keydown", addStroke);
