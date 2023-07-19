const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
const balls = [];

//all variables need to be sorted & config need to be created
let isStrokeActive = false;
let startTime = performance.now();
let isTextVisible = true;
let x1 = 0;
let isXKeyPressed = false;
let speed = 500;
let stopProgressBar = false;
let isSpacebarPressed = false;
let afterThreeSeconds = false;
let targetTime = 0;
let countDownBlocker = false;
let fade = 0;
let alpha = 0;
let textFade = true;
let textAlpha = 1;

//bugs:

//add random color to the front text1
//all variables need to be sorted & config need to be created
//create some sort of mass to objects

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomHue = getRandomInt(0, 360);
const randomLightness = getRandomInt(20, 80);
const randomSat = getRandomInt(80, 100);

const getRandomColor = () => {
  const hue = getRandomInt(0, 360);
  const saturation = 100;
  const lightness = Math.floor(Math.random() * 30) + 50; // random lightness (50-80)
  const alpha = 1; // Alpha value set to 0.1
  const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  return color;
};

const startCountdown = () => {
  let startTime = Date.now();
  targetTime = startTime + 1300;
};
const countDownCheck = () => {
  if (Date.now() > targetTime) {
    speed = 500;
    console.log("timeout");
    countDownBlocker = false;
    cancelAnimationFrame(countDownCheck);
  } else {
    requestAnimationFrame(countDownCheck);
  }
};

//to be fixed
const keyDown = (e) => {
  if (e.code == "Space" && !isSpacebarPressed) {
    isStrokeActive = !isStrokeActive;
    isSpacebarPressed = true;
    console.log("space down");
  }
  if (e.code === "KeyX") {
    isXKeyPressed = true;
    console.log("X down");
    if (!isTextVisible) {
      isTextVisible = !isTextVisible;
      speed = 0;
      textAlpha = 1;
      startCountdown();
      requestAnimationFrame(countDownCheck);
    }
  }
}; //to be fixed

const keyUp = (e) => {
  if (e.code == "Space") {
    isSpacebarPressed = false;
  }
  if (e.code == "KeyX") {
    isXKeyPressed = false;
  }
};

const drawBall = (x, y, radius, color) => {
  context.fillStyle = color;
  context.save();
  context.beginPath();
  context.globalAlpha = alpha;
  alpha = 0.9;
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  if (isStrokeActive) {
    context.lineWidth = 3;
    context.strokeStyle = `hsla(0,0%,0%,1)`;
    context.stroke();
  }
  context.closePath();
  context.restore();
};

const drawText = () => {
  if (isTextVisible) {
    //text 1
    context.save();
    context.beginPath();
    context.fillStyle = `hsla(${randomHue},${randomSat}%,${randomLightness}%,${textAlpha})`;
    context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
    context.font = "100px arial";
    context.textAlign = "center";
    context.lineWidth = 4;
    const text = "Use spacebar to add border";
    const textX1 = window.innerWidth / 2;
    const textY1 = window.innerHeight - 100;
    context.fillText(text, textX1, textY1);
    context.strokeText(text, textX1, textY1);
    context.closePath();
    context.restore();
  }

  if (isTextVisible) {
    //text 2
    context.save();
    context.beginPath();
    context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
    context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
    context.font = "50px arial";
    context.textAlign = "right";
    context.lineWidth = 2;
    const text2 = "Hold x to hide this message";
    const textX2 = window.innerWidth / 2;
    const textY2 = window.innerHeight - 20;
    context.fillText(text2, textX2, textY2);
    context.strokeText(text2, textX2, textY2);
    //subject to change
    //subject to change
    //subject to change

    //progress bar
    context.save();
    context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
    const rectX = window.innerWidth / 2 + 50;
    const rectY = window.innerHeight - 50;
    const rectLength = 570;
    const rectWidth = 30;
    context.rect(rectX, rectY, rectLength, rectWidth);
    context.stroke();
    context.fill();
    context.closePath();
    context.restore();
  }
};

const createBalls = () => {
  count = getRandomInt(80, 100);
  for (let i = 0; i < count; i++) {
    const radius = getRandomInt(20, 60);
    const mass = 300 / radius;
    const speedX = getRandomInt(-50, 50) * mass;
    const speedY = getRandomInt(-50, 50) * mass;
    const x = window.innerWidth / 2;
    const y = radius + 10;
    const color = getRandomColor();
    balls.push({ x, y, radius, color, speedX, speedY });
  }
};

createBalls();

const draw = () => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  balls.forEach((ball) => {
    drawBall(ball.x, ball.y, ball.radius, ball.color);
  });
  drawText();
};

const update = (deltaTime) => {
  //balls update
  for (let i = 0; i < count; i++) {
    balls[i].x += balls[i].speedX * deltaTime;
    balls[i].y += balls[i].speedY * deltaTime;
    if (balls[i].x + balls[i].radius > window.innerWidth) {
      balls[i].x = window.innerWidth - balls[i].radius;
      balls[i].speedX *= -1;
    }
    if (balls[i].x - balls[i].radius < 0) {
      balls[i].x = balls[i].radius;
      balls[i].speedX *= -1;
    }

    if (balls[i].y + balls[i].radius > window.innerHeight) {
      balls[i].y = window.innerHeight - balls[i].radius;
      balls[i].speedY *= -1;
    }
    if (balls[i].y - balls[i].radius < 0) {
      balls[i].y = balls[i].radius;
      balls[i].speedY *= -1;
    }
  }
  //text update
  if (isTextVisible) {
    if (isXKeyPressed) {
      if (x1 < 570 && !stopProgressBar) {
        context.save();
        context.beginPath();
        context.fillStyle = `hsl(120, 100%, 25%, ${textAlpha})`;
        const newX1 = x1 + Math.floor(speed * deltaTime);
        x1 = newX1 > 570 ? 570 : newX1;
        context.rect(
          window.innerWidth / 2 + 50,
          window.innerHeight - 50,
          x1,
          30
        );
        context.fill();
        context.closePath();
        context.restore();
      }
    }
    if (!isXKeyPressed) {
      if (x1 > 0 && !stopProgressBar) {
        context.save();
        context.beginPath();
        context.fillStyle = `hsl(0, 100%, 25%, ${textAlpha})`;
        x1 -= Math.floor((speed * deltaTime) / 4);
        context.rect(
          window.innerWidth / 2 + 50,
          window.innerHeight - 50,
          x1,
          30
        );
        context.fill();
        context.closePath();
        context.restore();
      }
    }
    if (x1 >= 570 && isTextVisible) {
      textAlpha -= 1 * deltaTime;
      stopProgressBar = true;
      context.save();
      context.beginPath();
      context.fillStyle = `hsl(120, 100%, 25%, ${textAlpha})`;
      context.rect(window.innerWidth / 2 + 50, window.innerHeight - 50, x1, 30);
      context.fill();
      context.closePath();
      context.restore();
      console.log("progressBarIsBlocked");
      textFade = true;
      if (!countDownBlocker) {
        startCountdown();
        countDownBlocker = true;
      }
      if (Date.now() > targetTime) {
        isTextVisible = false;
        x1 = 0;
        stopProgressBar = false;
        console.log("usunieto tekst");
        countDownBlocker = false;
      }
    }
  }
};

const render = (currentTime) => {
  draw();

  let deltaTime = (currentTime - startTime) / 1000;
  startTime = currentTime;

  update(deltaTime);
  requestAnimationFrame(render);
};

requestAnimationFrame(render);

const restart = () => {
  location.reload();
};

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("resize", restart);

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    cancelAnimationFrame(render);
    console.log("hidden");
  } else if (document.visibilityState === "visible") {
    console.log("visible");
    startTime = performance.now();
  }
}
