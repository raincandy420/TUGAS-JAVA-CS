const canvas = document.getElementById(
    'heartCanvas');
   const ctx = canvas.getContext('2d');
   
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   const hearts = [];
   const maxHearts = 100;
   
   class Heart {
    constructor() {
     this.x = Math.random() * canvas
      .width;
     this.y = Math.random() * canvas
      .height;
     this.size = Math.random() * 20 + 10;
     this.speedY = Math.random() * 1 +
      0.5;
     this.opacity = Math.random() * 0.5 +
      0.5;
    }
   
    draw() {
     ctx.globalAlpha = this.opacity;
     ctx.fillStyle = 'red';
     ctx.beginPath();
     ctx.moveTo(this.x, this.y);
     ctx.bezierCurveTo(this.x - this
      .size / 2, this.y - this.size / 2,
      this.x - this.size, this.y + this
      .size / 3, this.x, this.y + this
      .size);
     ctx.bezierCurveTo(this.x + this
      .size, this.y + this.size / 3,
      this.x + this.size / 2, this.y -
      this.size / 2, this.x, this.y);
     ctx.closePath();
     ctx.fill();
    }
   
    update() {
     this.y += this.speedY;
     if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas
       .width;
     }
     this.draw();
    }
   }
   
   function generateHearts() {
    for (let i = 0; i < maxHearts; i++) {
     hearts.push(new Heart());
    }
   }
   
   function animateHearts() {
    ctx.clearRect(0, 0, canvas.width,
     canvas.height);
    hearts.forEach(heart => heart
     .update());
    requestAnimationFrame(animateHearts);
   }
   
   generateHearts();
   animateHearts();
   
   function generateSingleHeart(x, y) {
    hearts.push(new Heart());
   }
   
   document.addEventListener("DOMContentLoaded", function () {
    const showContentBtn = document.getElementById("showcontent");
    const container = document.querySelector(".container");

    // Button hover sound
    const hoverSound = new Audio("https://l.top4top.io/m_3330iby0a1.mp3");
    const clickSound = new Audio("https://i.top4top.io/m_3330ytrkk1.mp3");

    // Ensure audio can play instantly on interaction (important for mobile)
    document.body.addEventListener("mousemove", () => {
        hoverSound.play().catch(() => {}); // Preload sound
        hoverSound.pause();
        hoverSound.currentTime = 0;
        clickSound.play().catch(() => {});
        clickSound.pause();
        clickSound.currentTime = 0;
    }, { once: true });

    // Add hover sound to all buttons
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mouseenter", () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });

        button.addEventListener("click", () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Show Content Button Click
    showContentBtn.addEventListener("click", function () {
        container.classList.add("unblurred"); // Remove blur effect
        showContentBtn.classList.add("hidden"); // Hide button after click
    });
});
