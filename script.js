const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fontSize = 18;
let columns, drops;
let fallingText = document.getElementById("languageSelector").value;
let dropColor = document.getElementById("colorPicker").value;
let speed = parseInt(document.getElementById("speedRange").value);

// 🎵 Música + corazón antes de reproducir
const player = document.getElementById("player");
const bigHeart = document.getElementById("big-heart");
const playlist = ["Love.mp3", "ingles.mp3","wanna.mp3"]
let current = 0;

function startPlaylist() {
  bigHeart.style.opacity = 1;
  setTimeout(() => {
    bigHeart.style.opacity = 0;
    playNext();
  }, 3000);
}

function playNext() {
  if (current < playlist.length) {
    player.src = playlist[current];
    player.play();
    current++;
  }
}

player.addEventListener("ended", playNext);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / (fontSize * 6));
  drops = new Array(columns).fill(1);
}
resizeCanvas();
ctx.font = fontSize + "px 'Orbitron', monospace";

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = dropColor;
  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize * 6;
    const y = drops[i] * fontSize;
    ctx.fillText(fallingText, x, y);
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
let interval = setInterval(draw, speed);

window.addEventListener('resize', () => {
  resizeCanvas();
  clearInterval(interval);
  interval = setInterval(draw, speed);
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  dropColor = e.target.value;
});
document.getElementById("speedRange").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
  clearInterval(interval);
  interval = setInterval(draw, speed);
});
document.getElementById("languageSelector").addEventListener("change", (e) => {
  fallingText = e.target.value;
});

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.bottom = `-40px`;
  heart.style.fontSize = `${Math.random() * 20 + 40}px`;
  heart.style.animationDuration = `${6 + Math.random() * 4}s`;
  heart.innerText = '💖';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 400);

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.animationDuration = (2 + Math.random() * 2) + 's';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 3000);
}
setInterval(createStar, 400);

const colors = ['#ff69b4', '#ff1493', '#e066ff', '#ff8c00', '#00ffff', '#00ff7f', '#ffa07a'];
const messages = [
  "TE AMO 💖", "ERES TODO 💫", "MI VIDA 💘", "SIEMPRE TÚ 💌", "TE EXTRAÑO 🌙", "CONTIGO ✨",
  "MI CORAZÓN 💞", "CADA DÍA MÁS 💍", "INFINITO AMOR 💗"
];

window.addEventListener('click', e => {
  const msg = document.createElement('div');
  msg.className = 'click-message';
  msg.innerText = messages[Math.floor(Math.random() * messages.length)];
  msg.style.left = `${e.clientX}px`;
  msg.style.top = `${e.clientY}px`;
  msg.style.color = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
});
