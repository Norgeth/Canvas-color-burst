//Get the canvas element and 2D rendering context
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

//Initialize ball array and various variables
const balls = [];
let isStrokeActive = false;
let startTime = performance.now();
let isTextVisible = true;
let x1 = 0;
let isXKeyPressed = false;
let speed = 500;
let stopProgressBar = false;
let isSpacebarPressed = false;
let isMouseDown = false;
let afterThreeSeconds = false;
let targetTime = 0;
let countDownBlocker = false;
let alpha = 0;
let textFade = true;
let textAlpha = 1;
let button1SizeX = 200;
let button1SizeY = 50;
let button1Pressed = false;
let button2Pressed = false;
let button2Lightness = 100;
let button1Lightness = 100;
let button1PositionX = window.innerWidth / 2 + button1SizeX / 2;
let button1PositionY = window.innerHeight / 10 - button1SizeY / 2;
let button2SizeX = 200;
let button2SizeY = 50;
let button2PositionX = window.innerWidth / 2 - button1SizeX * 1.5;
let button2PositionY = window.innerHeight / 10 - button1SizeY / 2;
let speedBlocker = 0;

//Function to get a random integer within a range
const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

//Generate random values for color
const randomHue = getRandomInt(0, 360);
const randomLightness = getRandomInt(40, 60);
const randomSat = getRandomInt(80, 100);

//Function to create a random color in HSLA format
const getRandomColor = () => {
	const hue = getRandomInt(0, 360);
	const saturation = 100;
	const lightness = Math.floor(Math.random() * 30) + 50;
	const alpha = 1;
	const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
	return color;
};

//Start the countdown for text hide
const startCountdown = () => {
	let startTime = Date.now();
	targetTime = startTime + 1300;
};

//Check countdown completion
const countDownCheck = () => {
	if (Date.now() > targetTime) {
		speed = 500;

		countDownBlocker = false;
		cancelAnimationFrame(countDownCheck);
	} else {
		requestAnimationFrame(countDownCheck);
	}
};

//Function to track mouse position and to check if a button is pressed
const mouseDown = (event) => {
	let x = event.clientX;
	let y = event.clientY;
	isMouseDown = !isMouseDown;
	if (isTextVisible) {
		if (
			x >= button1PositionX &&
			x < button1PositionX + button1SizeX &&
			y >= button1PositionY &&
			y <= button1PositionY + button1SizeY
		) {
			button1Pressed = true;
		}
		if (
			x >= button2PositionX &&
			x < button2PositionX + button2SizeX &&
			y >= button2PositionY &&
			y <= button2PositionY + button2SizeY
		) {
			button2Pressed = true;
		}
	}
};
//Mouse up event handling
const mouseUp = () => {
	isMouseDown = !isMouseDown;

	button1Pressed = false;
	button2Pressed = false;
};
//Key down event handling
const keyDown = (e) => {
	if (e.code == "Space" && !isSpacebarPressed) {
		isStrokeActive = !isStrokeActive;
		isSpacebarPressed = true;
	}
	if (e.code === "KeyX") {
		isXKeyPressed = true;
		if (!isTextVisible) {
			isTextVisible = !isTextVisible;
			speed = 0;
			textAlpha = 1;
			startCountdown();
			requestAnimationFrame(countDownCheck);
		}
	}
};

//Key up event handling
const keyUp = (e) => {
	if (e.code == "Space") {
		isSpacebarPressed = false;
	}
	if (e.code == "KeyX") {
		isXKeyPressed = false;
	}
};

//Function to draw a ball
const drawBall = (x, y, radius, color) => {
	context.fillStyle = color;
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
};

//Function to draw text
const drawText = () => {
	if (isTextVisible) {
		//text 1
		context.beginPath();
		context.fillStyle = `hsla(${randomHue},${randomSat}%,${randomLightness}%,${textAlpha})`;
		context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
		context.font = "110px arial";
		context.textAlign = "center";
		context.lineWidth = 4;
		const text = "Use spacebar to add border";
		const textX1 = window.innerWidth / 2;
		const textY1 = window.innerHeight - 100;
		context.fillText(text, textX1, textY1);
		context.strokeText(text, textX1, textY1);
		context.closePath();

		//text 2
		context.beginPath();
		context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
		context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
		context.font = "48px arial";
		context.textAlign = "right";
		context.lineWidth = 2;
		const text2 = `Hold "x" key to hide interface`;
		const textX2 = window.innerWidth / 2;
		const textY2 = window.innerHeight - 20;
		context.fillText(text2, textX2, textY2);
		context.strokeText(text2, textX2, textY2);
		context.closePath();

		//text 3
		context.beginPath();
		context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
		context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
		context.font = "48px arial";
		context.textAlign = "center";
		context.lineWidth = 2;
		const text3 = `Use buttons to change balls speed`;
		const textX3 = window.innerWidth / 2;
		const textY3 = 48;
		context.fillText(text3, textX3, textY3);
		context.strokeText(text3, textX3, textY3);
		context.closePath();

		//progress bar
		context.beginPath();
		context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
		const rectX = window.innerWidth / 2 + 50;
		const rectY = window.innerHeight - 50;
		const rectLength = 570;
		const rectWidth = 30;
		context.rect(rectX, rectY, rectLength, rectWidth);
		context.stroke();
		context.fill();
		context.closePath();

		//buttons
		context.beginPath();
		context.rect(
			button1PositionX,
			button1PositionY,
			button1SizeX,
			button1SizeY
		);

		context.stroke();
		if (!button1Pressed) {
			context.fillStyle = `hsla(120,80%,${button1Lightness}%,${textAlpha})`;
		} else if (button1Pressed) {
			button1Lightness = 50;
			context.fillStyle = `hsla(120,80%,${button1Lightness}%,${textAlpha})`;
		}

		context.fill();
		context.closePath();
		context.beginPath();
		context.rect(
			button2PositionX,
			button2PositionY,
			button2SizeX,
			button2SizeY
		);

		context.stroke();
		if (!button2Pressed) {
			context.fillStyle = `hsla(360,100%,${button2Lightness}%,${textAlpha})`;
		} else if (button2Pressed) {
			button2Lightness = 50;
			context.fillStyle = `hsla(360,100%,${button2Lightness}%,${textAlpha})`;
		}
		context.fill();
		context.closePath();

		//text for buttons
		context.beginPath();
		context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
		context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
		context.font = "50px arial";
		context.textAlign = "left";
		context.lineWidth = 2;
		const button1Text = "Faster";
		const button1TextX = button1PositionX + 25;
		const button1TextY = button1PositionY + 43;
		context.fillText(button1Text, button1TextX, button1TextY);
		context.strokeText(button1Text, button1TextX, button1TextY);
		context.closePath();
		context.beginPath();
		context.fillStyle = `hsla(0,100%,100%,${textAlpha})`;
		context.strokeStyle = `hsla(0,0%,0%,${textAlpha})`;
		context.font = "50px arial";
		context.textAlign = "left";
		context.lineWidth = 2;
		const button2Text = "Slower";
		const button2TextX = button2PositionX + 22;
		const button2TextY = button2PositionY + 43;
		context.fillText(button2Text, button2TextX, button2TextY);
		context.strokeText(button2Text, button2TextX, button2TextY);
		context.closePath();
	}
};

//Function to create balls and set their initial properties
const createBalls = () => {
	count = getRandomInt(50, 100);
	for (let i = 0; i < count; i++) {
		const radius = getRandomInt(30, 80);
		const speedX = getRandomInt(-1000, 1000) / (radius / 10);
		const speedY = getRandomInt(-1000, 1000) / (radius / 10);
		const x = window.innerWidth / 2;
		const y = window.innerHeight / 2 - radius;
		const color = getRandomColor();
		balls.push({ x, y, radius, color, speedX, speedY });
	}
};

createBalls();

//Function to render the balls, buttons and text
const draw = () => {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	balls.forEach((ball) => {
		drawBall(ball.x, ball.y, ball.radius, ball.color);
	});

	drawText();
};

//Function to update ball positions and text elements
const update = (deltaTime) => {
	//Balls position update
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
	//Text update
	if (isTextVisible) {
		if (isXKeyPressed) {
			if (x1 < 570 && !stopProgressBar) {
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
			}
		}
		if (!isXKeyPressed) {
			if (x1 > 0 && !stopProgressBar) {
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
			}
		}
		if (x1 >= 570 && isTextVisible) {
			textAlpha -= 1 * deltaTime;
			stopProgressBar = true;
			context.beginPath();
			context.fillStyle = `hsl(120, 100%, 25%, ${textAlpha})`;
			context.rect(
				window.innerWidth / 2 + 50,
				window.innerHeight - 50,
				x1,
				30
			);
			context.fill();
			context.closePath();
			textFade = true;
			if (!countDownBlocker) {
				startCountdown();
				countDownBlocker = true;
			}
			if (Date.now() > targetTime) {
				isTextVisible = false;
				x1 = 0;
				stopProgressBar = false;
				countDownBlocker = false;
			}
		}
	}
	//Buttons update
	if (!isMouseDown && !button2Pressed) {
		button2Lightness += 1;
	}
	if (!isMouseDown && !button1Pressed) {
		button1Lightness += 1;
	}
	if (button1Pressed) {
		if (speedBlocker <= 2000) {
			speedBlocker += 40;
		}
		balls.forEach((ball) => {
			if (speedBlocker < 2000) {
				ball.speedX *= 1.05;
				ball.speedY *= 1.05;
			}
		});
	}
	if (button2Pressed) {
		if (speedBlocker >= -2000) {
			speedBlocker -= 40;
		}
		balls.forEach((ball) => {
			if (speedBlocker > -2000) {
				ball.speedX /= 1.05;
				ball.speedY /= 1.05;
			}
		});
	}
};

//Render function to initiate animation loop
const render = (currentTime) => {
	draw();
	let deltaTime = (currentTime - startTime) / 1000;
	startTime = currentTime;
	update(deltaTime);
	requestAnimationFrame(render);
};

requestAnimationFrame(render);

//Function to restart the animation on window resize
const restart = () => {
	location.reload();
};

//Add event listeners for mouse tracking, key events, visibility change, and window resize
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("resize", restart);

//Function to handle visibility change (for pausing/resuming animation)
function handleVisibilityChange() {
	if (document.visibilityState === "hidden") {
		cancelAnimationFrame(render);
	} else if (document.visibilityState === "visible") {
		startTime = performance.now();
	}
}
