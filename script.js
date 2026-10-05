// --- Cyberpunk Matrix/Particle Canvas Animation ---
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? '#00f0ff' : '#9d4edd';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Connect particles with subtle neural lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00f0ff';
        ctx.globalAlpha = (1 - dist / 120) * 0.15;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// --- Repo Category Filter Logic ---
const filterButtons = document.querySelectorAll('.filter-btn');
const repoBoxes = document.querySelectorAll('.repo-box');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    repoBoxes.forEach(box => {
      if (filterVal === 'all' || box.getAttribute('data-category') === filterVal) {
        box.style.display = 'flex';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// --- Dynamic Terminal Typewriter Effect ---
const terminalPrompts = [
  'fetch --profile alionur',
  'system.getStats()',
  'ue5.buildTarget --platform Win64',
  'git commit -m "feat: next-gen mechanic deployed"'
];

let promptIndex = 0;
let charIndex = 0;
let isDeleting = false;
const promptElement = document.getElementById('interactive-prompt');

function typeEffect() {
  if (!promptElement) return;

  const currentText = terminalPrompts[promptIndex];

  if (isDeleting) {
    promptElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    promptElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000; // Bekleme süresi
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    promptIndex = (promptIndex + 1) % terminalPrompts.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1000);
