const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const clouds = new Image();
clouds.src = "../assets/background/4.png";
const Pink_Monster = new Image();
Pink_Monster.src = "../assets/sprites/Pink_Monster.png";
let monsterX = 0;
let monsterY = 200;
let monsterWidth = 50;
let monsterHeight = 50;
let monsterSpeed = 2; // Speed of the monster
let keys = {};
let velocityY = 0; // Speed of the monster
const gravity = 0.5; // Gravity effect on the monster
const jumpStrength = -10; // Jump strength of the monster
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;

  if (event.key === " " || event.key==="ArrowUp") {
    // Space or Up arrow key pressed
    // Jump action
    if (monsterY >= canvas.height - monsterHeight) {
      velocityY = jumpStrength;
    }
  }
});
document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});
function update() {

  if (keys["ArrowLeft"]) {
    monsterX -= monsterSpeed;
  }
  if (keys["ArrowRight"]) {
    monsterX += monsterSpeed;
  }
  velocityY += gravity; // Apply gravity to the monster
  monsterY += velocityY; // Update the monster's vertical position
  if (monsterY + monsterHeight >= canvas.height) {
    // If the monster hits the ground, stop its downward movement
    monsterY = canvas.height - monsterHeight;
    velocityY = 0;
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(clouds, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(Pink_Monster, monsterX, monsterY, monsterWidth, monsterHeight);
  
}
function gameLoop() {
  update();
  draw();
  // Draw the clouds
  
  requestAnimationFrame(gameLoop);
}
Pink_Monster.onload = function () {
  gameLoop();
}
// Resize the canvas to fill the window