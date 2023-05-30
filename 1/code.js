const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');


canvas.width = 1000
canvas.height = 1000

const circles = []; // Tablica przechowująca kółka

// Funkcja do rysowania kółka
function drawCircle(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

// Klasa reprezentująca kółko
class Circle {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;
  
    // Sprawdzanie kolizji z granicami canvasa
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX *= -1; // Odwracanie kierunku po przekroczeniu granic
    }
  
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY *= -1; // Odwracanie kierunku po przekroczeniu granic
    }
  }
}

// Tworzenie 5 kółek
for (let i = 0; i < 5; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = 20;
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  const speedX = (Math.random() - 0.5) * 2; // Losowa prędkość X
  const speedY = (Math.random() - 0.5) * 2; // Losowa prędkość Y
  
  const circle = new Circle(x, y, radius, color, speedX, speedY);
  circles.push(circle); // Dodawanie kółka do tablicy
}

// Funkcja do renderowania kółek
let lastTime = 0;

function render(currentTime) {
  context.clearRect(0, 0, canvas.width, canvas.height); // Czyszczenie canvasa

  const deltaTime = 1; // Obliczenie deltaTime w sekundach

  // Aktualizowanie i rysowanie kółek
  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.update(deltaTime); // Aktualizacja położenia kółka

    drawCircle(circle.x, circle.y, circle.radius, circle.color); // Rysowanie kółka na canvasie
  }

  lastTime = currentTime;

  requestAnimationFrame(render); // Rekurencyjne wywołanie funkcji render dla płynnej animacji
}

// Wywołanie funkcji render po raz pierwszy
requestAnimationFrame(render);

// Wywołanie funkcji render
// render();