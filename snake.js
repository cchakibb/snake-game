const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const grid = 40;
let score = 0;
let speed = 240;
let apple = [5, 6];
const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];

let direction = "e";

const drawMap = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let body of snake) {
    ctx.fillRect(body[0] * grid, body[1] * grid, grid, grid);
  }
  console.log(snake[0]);
};

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * grid, apple[1] * grid, grid, grid);
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight": {
      direction = "e";
      break;
    }
    case "ArrowLeft": {
      direction = "w";
      break;
    }
    case "ArrowUp": {
      direction = "n";
      break;
    }
    case "ArrowDown": {
      direction = "s";
      break;
    }
    case " ": {
      document.location.reload();
    }
  }
});

const gameOver = () => {
  const [head, ...body] = snake;
  for (let bodyElem of body) {
    if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
      ctx.beginPath();
      ctx.fillStyle = "#EAC96F";
      ctx.textAlign;
      ctx.font = "50px Arial sans-serif";
      ctx.fillText("You lost !! ", 270, 300);
      ctx.font = "30px Arial sans-serif";
      ctx.textAlign;
      ctx.fillText("Press the spacebar to play again", 200, 350);
      return true;
    }
  }
  return false;
};

const generateApple = () => {
  score++;
  if (score % 5 === 0) {
    speed -= 20;
    if (speed < 100) {
      speed = 100;
    }
  }
  const [x, y] = [
    Math.trunc(Math.random() * 20),
    Math.trunc(Math.random() * 20),
  ];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
  apple = [x, y];
};

const newSnakePosition = () => {
  let head;
  switch (direction) {
    case "e": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "w": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "n": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "s": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }
  snake.unshift(head);
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple(); // Snake ate apple, we generate a new.
  } else {
    snake.pop();
  }

  return gameOver();
};

const drawScore = () => {
  ctx.fillStyle = "#EAC96F";
  ctx.textAlign;
  ctx.font = "30px Arial sans-serif";
  ctx.fillText(`Score: ${score}`, 80, 100);
};

const reappearSnake = () => {
  switch (direction) {
    case "e": {
      if (snake[0][0] === 20) {
        snake[0][0] = -1;
      }
      break;
    }
    case "w": {
      if (snake[0][0] === -1) {
        snake[0][0] = 20;
      }
      break;
    }
    case "n": {
      if (snake[0][1] === -1) {
        snake[0][1] = 20;
      }
      break;
    }
    case "s": {
      if (snake[0][1] === 20) {
        snake[0][1] = -1;
      }
      break;
    }
  }
};

const move = () => {
  if (!newSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();
    reappearSnake();
    setTimeout(() => {
      requestAnimationFrame(move);
    }, speed);
  }
};

requestAnimationFrame(move);
