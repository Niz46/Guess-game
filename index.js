const bubbleContainer = document.querySelector(".bubbles");
const totalBubbles = 30;

for (let i = 0; i < totalBubbles; i++) {
  const bubble = document.createElement("span");
  bubble.style.setProperty("--i", Math.floor(Math.random() * 20) + 10);
  bubbleContainer.appendChild(bubble);
}

document.getElementById("startButton").addEventListener("click", function () {
  window.location.href = "/html/game.html";
});
