var spieler = document.querySelector(".player");
var background = document.querySelector(".space");

spieler.style.left = "400px";
spieler.style.top = "500px";

var timer_enemy = new Timer(30);
var timer_projectile = new Timer(30);

var score = 0;
var scorepoints = document.querySelector(".score");

function Steuerung() {
  if (keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 5 + "px";
  }
  if (keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 5 + "px";
  }
}

function Gegner() {
  if (timer_enemy.ready()) {
    var e = document.createElement("div");
    e.classList.add("enemy");
    e.style.top = "0px";
    e.style.left = "0px";
    background.appendChild(e);
  }

  var enemys = document.querySelectorAll(".enemy");

  for (var enemy of enemys) {
    enemy.style.left = parseInt(enemy.style.left) + 5 + "px";
    if (parseInt(enemy.style.left) > 780) {
      enemy.style.left = parseInt(enemy.style.left) - 5 + "px";
      enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
    }
    if (parseInt(enemy.style.top) > 20) {
      enemy.style.left = parseInt(enemy.style.left) - 5 + "px";
      enemy.style.top = parseInt(enemy.style.top) - 2 + "px";
    }
  }

  if (anyCollision(spieler, enemys)) {
    alert("Game over!");
    return;
  }
}

function Score(enemys, projectiles) {
  for (var projectile of projectiles) {
    var collisions = allCollisions(projectile, enemys);
    for (var collision of collisions) {
      projectile.parentNode.removeChild(projectile);
      collision.parentNode.removeChild(collision);
    }
    if (collision) {
      score = score + 1;
      scorepoints.textContent = score;
    }
  }
}

function Schuss() {
  var spx = spieler.style.left;

  if (timer_projectile.ready()) {
    var p = document.createElement("div");
    p.classList.add("projectile");
    p.style.top = "500px";
    p.style.left = spx;
    background.appendChild(p);
  }

  var projectiles = document.querySelectorAll(".projectile");

  for (var projectile of projectiles) {
    projectile.style.top = parseInt(projectile.style.top) - 2 + "px";
    if (parseInt(projectile.style.top) < 0) {
      projectile.parentNode.removeChild(projectile);
    }
  }
}

function loop() {
  Steuerung();
  Gegner();
  Schuss();
  var enemys = document.querySelectorAll(".enemy");
  var projectiles = document.querySelectorAll(".projectile");
  Score(enemys, projectiles);
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
