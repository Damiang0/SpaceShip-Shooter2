const spieler = document.querySelector(".player");
const background = document.querySelector(".space");

spieler.style.left = "400px";
spieler.style.top = "500px";

const timer_enemy = new Timer(33);
const timer_projectile = new Timer(30);

let score = 0;
const scorepoints = document.querySelector(".score");

const main = document.querySelector("main");

function Steuerung() {
  if (keyboard(39)) {
    spieler.style.left = parseInt(spieler.style.left) + 6 + "px";

    /* Spielberich eingrenzen 
    if (spieler.style.left >= 500) {
      spieler.style.left = parseInt(spieler.style.left) - 7 + "px";
    }
    */
  }
  if (keyboard(37)) {
    spieler.style.left = parseInt(spieler.style.left) - 6 + "px";

    /* Spielberich eingrenzen 
    if (spieler.style.left <= 300) {
      spieler.style.left + 7 + "px";
    }
    */
  }
}

function Gegner() {
  if (timer_enemy.ready()) {
    var e = document.createElement("img");
    e.setAttribute("src", "enemy.png");
    e.classList.add("enemy");
    e.style.top = "0px";
    e.style.left = "0px";
    background.appendChild(e);
  }

  var enemys = document.querySelectorAll(".enemy");

  //Bewegung Gegner (Zickzack Linie)
  for (var enemy of enemys) {
    //links
    if (parseInt(enemy.style.left) < 780 && parseInt(enemy.style.top) == 0) {
      enemy.style.left = parseInt(enemy.style.left) + 5 + "px";
    }

    //runter (rechte Seite)
    if (parseInt(enemy.style.left) >= 780 && parseInt(enemy.style.top) < 100) {
      enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
    }

    //rechts
    if (parseInt(enemy.style.left) > 0 && parseInt(enemy.style.top) == 100) {
      enemy.style.left = parseInt(enemy.style.left) - 5 + "px";
    }

    //runter (linke Seite)
    if (parseInt(enemy.style.left) == 0 && parseInt(enemy.style.top) <= 200) {
      enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
    }

    if (parseInt(enemy.style.left) < 780 && parseInt(enemy.style.top) == 200) {
      enemy.style.left = parseInt(enemy.style.left) + 5 + "px";
    }

    if (
      parseInt(enemy.style.left) >= 780 &&
      parseInt(enemy.style.top) < 300 &&
      parseInt(enemy.style.top) > 200
    ) {
      enemy.style.top = parseInt(enemy.style.top) + 5 + "px";
    }

    if (parseInt(enemy.style.left) > 0 && parseInt(enemy.style.top) == 300) {
      enemy.style.left = parseInt(enemy.style.left) - 5 + "px";
    }

    if (
      parseInt(enemy.style.left) == 0 &&
      parseInt(enemy.style.top) <= 400 &&
      parseInt(enemy.style.top) > 200
    ) {
      enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
    }

    if (parseInt(enemy.style.left) < 780 && parseInt(enemy.style.top) == 400) {
      enemy.style.left = parseInt(enemy.style.left) + 5 + "px";
    }

    if (parseInt(enemy.style.left) >= 780 && parseInt(enemy.style.top) < 500) {
      enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
    }

    if (parseInt(enemy.style.left) > 0 && parseInt(enemy.style.top) == 500) {
      enemy.style.left = parseInt(enemy.style.left) - 5 + "px";
    }
  }

  if (anyCollision(spieler, enemys)) {
    main.innerHTML = " ";
    alert("Game over! Please restart your page!");
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
    var p = document.createElement("img");
    p.setAttribute("src", "projectile.png");
    p.classList.add("projectile");
    p.style.top = "500px";
    p.style.left = spx;
    background.appendChild(p);
  }

  var projectiles = document.querySelectorAll(".projectile");

  for (var projectile of projectiles) {
    projectile.style.top = parseInt(projectile.style.top) - 4 + "px";
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
