const colors = [
  "#de324c",
  "#f4895f",
  "#f8e16f",
  "#95cf92",
  "#369acc",
  "#9656a2",
];

let score = 0;
let targetColor = "";
let timer;
let timeLeft = 15;
let gameActive = true;

const colorBox = document.getElementById("colorBox");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const nextGameButton = document.getElementById("nextGameButton");
const buttonsContainer = document.querySelector(".btn-container");
const timerDisplay = document.querySelector(".timer");

const titleElement = document.querySelector(".title");
const titleText = "Color Guessing Game";
let index = 0;

function typeTitle() {
  if (index < titleText.length) {
    titleElement.innerHTML += titleText.charAt(index);
    index++;
    setTimeout(typeTitle, 200);
  } else {
    setTimeout(() => {
      titleElement.innerHTML = "";
      index = 0;
      typeTitle();
    }, 2000);
  }
}
typeTitle();

function startGame(resetGame = false) {
  if (resetGame) {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timeLeft = 15;
    clearInterval(timer);
    startTimer();
  }

  gameStatus.textContent = "";
  buttonsContainer.innerHTML = "";
  gameActive = true;
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  document.documentElement.style.setProperty("--target-color", targetColor);
  colorBox.style.backgroundColor = targetColor;

  let shuffledColors = [...colors].sort(() => Math.random() - 0.5);
  shuffledColors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("colorOption");
    button.dataset.color = color;
    button.style.backgroundColor = color;
    button.onclick = () => handleGuess(button);
    buttonsContainer.appendChild(button);
  });

  nextGameButton.disabled = false;
}

function handleGuess(button) {
  if (!gameActive) return;

  gameActive = false;
  const colorOptions = document.querySelectorAll(".colorOption");
  colorOptions.forEach((btn) => (btn.disabled = true));

  if (button.dataset.color === targetColor) {
    showGameStatus("Correct! 🎉", "green");
    score++;
  } else {
    showGameStatus("Wrong! Try again. ❌", "red");
    nextGameButton.disabled = true;
  }

  scoreDisplay.textContent = `Score: ${score}`;
}

function showGameStatus(message, color) {
  gameStatus.textContent = message;
  gameStatus.style.color = color;
  gameStatus.classList.add("bounce");

  setTimeout(() => {
    gameStatus.classList.remove("bounce");
  }, 600);
}

// Start Timer
function startTimer() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    } else {
      clearInterval(timer);
      alertGameOver();
    }
  }, 1000);
}

function alertGameOver() {
  Swal.fire({
    title: "Time's Up! ⏳",
    text: `Your final score: ${score}`,
    icon: "warning",
    confirmButtonText: "Restart Game",
    confirmButtonColor: "#4fc3dc",
  }).then(() => {
    startGame(true);
  });

  document
    .querySelectorAll(".colorOption")
    .forEach((btn) => (btn.disabled = true));
  nextGameButton.disabled = true;
  gameActive = false;
}

newGameButton.addEventListener("click", () => startGame(true));
nextGameButton.addEventListener("click", () => startGame(false));

startGame();
startTimer();
