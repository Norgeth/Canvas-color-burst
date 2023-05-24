console.log("hello");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const config = {
    ball:{
        count: {
            min: 10,
            max: 20,
        },

        speed: {
            min: 10,
            max: 20,
        },

        radius: {
            min: 10,
            max: 15,
        },

        startCoordinates: {
            x: window.innerWidth/10,
            y: window.innerHeight/2,
        }

    }
}


const getRandomInt = (min, max)=>{
    //CHAT GPT
return Math.floor(Math.random() * (max - min + 1)) + min
    //CHAT GPT
};

const getRandomColor = () => {
    //CHAT GPT
    const letters = '0123456789ABCDEF';
  let color = '#';

  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === '#FFFFFF'); // Exclude white color

  return color;
    //CHAT GPT
}

const count = getRandomInt(config.ball.count.min, config.ball.count.max);
const color = getRandomColor();

const circles = [];

const ballz = () => {

    const {ball:{radius, startCoordinates}} = config;

    const ballRadius = getRandomInt(radius.min,radius.max);
    ctx.beginPath();
    ctx.arc(startCoordinates.x,startCoordinates.y,ballRadius,Math.PI*2,0,true);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.closePath();
    
    config.ball.startCoordinates.x +=20;
    
}

for(let i = 1; i<=count; i++){
    ballz();
    
}
console.log("Number of circles = "+count);


//render, tablica do przechowywania obiektow, losowo generowane obiekty z losowa predkoscia itd, odbijanie od scian, strzałki na przycisk tak zeby na telefonie dzialalo, web app
