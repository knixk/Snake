// vars setup
direction = null;
started = false;
snakePos = 346;
foodPos = Math.round(Math.random() * 399);
score = null;

// music
let sfx = document.getElementsByClassName("audio");
// audio.play();
// score
let p = document.getElementById("p");

//  grid setup
const grid = document.querySelector(".grid");

for (let i = 0; i < 400; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
  cell.setAttribute("id", i);
}

snake = document.getElementById(snakePos);
snake.classList.add("snake");

food = document.getElementById(foodPos);
food.classList.add("food");

// event handler
let eventHandler = (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveSnake("up");
      direction = "up";
      break;

    case "ArrowDown":
      moveSnake("bottom");
      direction = "bottom";
      break;

    case "ArrowLeft":
      moveSnake("left");
      direction = "left";
      break;

    case "ArrowRight":
      moveSnake("right");
      direction = "right";
      break;
  }
  started = true;
  sfx[0].play();
};

document.addEventListener("keydown", eventHandler);

// moving snake
function moveSnake(e) {
  snake.classList.remove("snake");
  switch (e) {
    case "right":
      bounds(snakePos + 1) ? snakePos : (snakePos += 1);
      drawingSnake();
      break;

    case "left":
      bounds(snakePos - 1) ? snakePos : (snakePos += -1);
      drawingSnake();
      break;

    case "up":
      bounds(snakePos - 20) ? snakePos : (snakePos += -20);
      drawingSnake();
      break;

    case "bottom":
      bounds(snakePos + 20) ? snakePos : (snakePos += 20);
      drawingSnake();
      break;
  }

  snake = document.getElementById(snakePos);
  snake.classList.add("snake");
}

// check bounds
function bounds(e) {
  if (e > 399 || e < 0) {
    return true;
  } else {
    return false;
  }
}

// eat food
function eatFood() {
  if (foodPos == snakePos) {
    score += 1;
  }
}

// creating a queue for snake tail of fixed size
class Queue {
  constructor(size) {
    this.queue = [];
    this.size = size;
    this.add = size + 1;
    this.push = function push(i) {
      this.queue.push(i);
      if (this.queue.length > this.size) {
        this.queue.shift();
      }
    };

    this.showList = console.log(this.queue);
  }
}

let q = new Queue(5);
let t = new Queue(3);

// pushing to queue
function growBody() {
  q.push(snakePos);
  t.push(q.queue[0]);
}

// drawing snake
function drawingSnake() {
  growBody();
  clearOld();
  eatingFood();
  for (let i = 0; i < q.queue.length; i++) {
    let k = document.getElementById(q.queue[i]);
    k.classList.add("snake");
  }
}

// clearing old snake points
function clearOld() {
  for (let i = 0; i < t.queue.length; i++) {
    let k = document.getElementById(t.queue[i]);
    k && k.classList.remove("snake");
  }
}

// eating food
function eatingFood() {
  if (foodPos == snakePos) {
    document.getElementById(snakePos).classList.toggle("food");
    q.size += 1;
    score += 1;
    generateFood();
  }
}

// generating food
function generateFood() {
  let r = Math.round(Math.random() * 399);
  document.getElementById(r).classList.add("food");
  foodPos = r;
}

// game over
function gameOver() {
  clearInterval(myInterval);
  alert("game over");
  document.removeEventListener("keydown", eventHandler);
}

// infinite game loop

// document.addEventListener("keydown", myInterval);

const myInterval = setInterval(() => {
  if (started) {
    for (i = 0; i < q.queue.length - 1; i++) {
      if (q.queue[i] == snakePos) {
        gameOver();
      }
    }

    autoMoveSnake(direction);
    drawingSnake();
    p.innerHTML = score;
  }
}, 500);

// move functions
function moveUp() {
  snake.classList.remove("snake");
  bounds(snakePos - 20) ? snakePos : (snakePos -= 20);
}

function moveLeft() {
  snake.classList.remove("snake");
  bounds(snakePos + 1) ? snakePos : (snakePos -= 1);
}

function moveRight() {
  snake.classList.remove("snake");
  bounds(snakePos + 1) ? snakePos : (snakePos += 1);
}

function moveDown() {
  snake.classList.remove("snake");
  bounds(snakePos + 20) ? snakePos : (snakePos += 20);
}

// auto move snake, gets passed to infinite loop
function autoMoveSnake(e) {
  switch (e) {
    case "up":
      moveUp();
      direction = "up";
      break;

    case "bottom":
      moveDown();
      direction = "bottom";
      break;

    case "left":
      moveLeft();
      direction = "left";
      break;

    case "right":
      moveRight();
      direction = "right";
      break;
  }
}
// That's it, thank you reading my code
// if you have a doubt feel free to ask me :)
// ig: knixkcodes
// clearInterval(myInterval);
