const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "IFTHereISoneThINGinTHISWORLDisYOU!!!▒▓█☠⚡⌬⌁ΔΨ∑<>/\\|";

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = chars[Math.floor(Math.random() * chars.length)];
        this.size = Math.random() * 16 + 10;
        this.life = 1;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
    }

    draw() {
        ctx.fillStyle = `rgba(0,255,0,${this.life})`;
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.char, this.x, this.y);
    }
}

function spawnDragon() {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    spawnDragon();

    particles.forEach((p, i) => {
        p.update();
        p.draw();

        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
const video = document.getElementById("bg-video");

video.addEventListener("timeupdate", () => {
    if (video.currentTime >= 5) {
        video.currentTime = 0;
        video.play();
    }
});