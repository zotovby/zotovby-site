// Звёздочки, летящие за курсором мыши.
// В 1999-м такой скрипт был на каждой второй домашней страничке.

var starTrailLength = 14;
var starTrail = [];
var starMouseX = -100;
var starMouseY = -100;
var starReady = false;
var starSeenMouse = false;

function initStarTrail() {
  if (starReady) return;
  starReady = true;
  for (var i = 0; i < starTrailLength; i++) {
    var star = document.createElement("img");
    star.src = "/img/stars.gif";
    star.width = 14;
    star.height = 14;
    star.alt = "";
    star.style.position = "absolute";
    star.style.zIndex = "9999";
    star.style.pointerEvents = "none";
    star.style.left = "-100px";
    star.style.top = "-100px";
    document.body.appendChild(star);
    starTrail.push({ node: star, x: 0, y: 0 });
  }
  animateStarTrail();
}

function animateStarTrail() {
  // Пока мышь не двигалась, звёзды ждут за краем экрана.
  if (!starSeenMouse) {
    window.setTimeout(animateStarTrail, 100);
    return;
  }
  var x = starMouseX;
  var y = starMouseY;
  for (var i = 0; i < starTrail.length; i++) {
    var dot = starTrail[i];
    dot.x += (x - dot.x) * 0.35;
    dot.y += (y - dot.y) * 0.35;
    dot.node.style.left = Math.round(dot.x) + "px";
    dot.node.style.top = Math.round(dot.y) + "px";
    x = dot.x;
    y = dot.y;
  }
  window.setTimeout(animateStarTrail, 40);
}

document.onmousemove = function (event) {
  var e = event || window.event;
  starSeenMouse = true;
  starMouseX = (e.pageX !== undefined ? e.pageX : e.clientX) + 6;
  starMouseY = (e.pageY !== undefined ? e.pageY : e.clientY) + 6;
};

if (window.addEventListener) {
  window.addEventListener("load", initStarTrail, false);
} else {
  window.onload = initStarTrail;
}
