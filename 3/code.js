console.log("hello");
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

const balls = [];
let count, x, y, radius, color, speedX, speedY;

//chatgpt
const getRandomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomColor = () => {
//CHAT GPT
  const letters = '0123456789ABCDEF';
  let color = '#';

  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === '#FFFFFF'); // Exclude white color
  return color
}
//chatgpt

const drawBall = (x,y,radius,color) => {
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

const createBalls = () => {
    count = getRandomInt(10,100);
    for(let i = 0; i<count; i++){
        radius = getRandomInt(10,50); 
        speedX = (getRandomInt(-25,25)/(radius/5));
        speedY = (getRandomInt(-25,25)/(radius/5));
        x = getRandomInt(radius,window.innerWidth-radius);
        y = getRandomInt(radius,window.innerHeight-radius);
        color = getRandomColor();
        drawBall(x,y,radius,color);
        balls.push([x,y,radius,color,speedX,speedY]);  
    }  
}
createBalls();

const update = () => {
     for(let i = 0; i<count; i++){
        drawBall(balls[i][0],balls[i][1],balls[i][2],balls[i][3]);
        balls[i][0] += balls[i][4]
        balls[i][1] += balls[i][5]
        if(balls[i][0]>window.innerWidth-(balls[i][2])||balls[i][0]<0+(balls[i][2])){
          balls[i][4]*=-1
        }
        if(balls[i][1]>window.innerHeight-(balls[i][2])||balls[i][1]<0+(balls[i][2])){
            balls[i][5]*=-1
         }      
    }
}

const render = () => {
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    update();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);