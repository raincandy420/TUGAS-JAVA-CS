document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  function drawMatrix() {
      ctx.fillStyle = "rgba(23, 24, 16, 0.05)"; // Dark fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#03fa6e"; // Green neon text
      ctx.font = `${fontSize}px Arial`;

      for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
          }

          drops[i]++;
      }

      requestAnimationFrame(drawMatrix);
  }

  window.addEventListener("resize", () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
  });

  drawMatrix();
});

document.addEventListener("DOMContentLoaded", function() {
  const codeGroup = document.getElementById("matrix-code-group");
  const cols = 7;
  const rows = 14;
  const chars = "アァカサタナハマヤャラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * rows));

  function drawMatrix() {
    codeGroup.innerHTML = "";
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Only draw one char per column per frame for the "falling" effect
        if (r === drops[c]) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", 6 + c * 3.2); // adjust for icon width
          text.setAttribute("y", 11 + r * 1.6); // adjust for icon height
          text.setAttribute("font-size", "2.2");
          text.setAttribute("fill", "#03fa6e");
          text.setAttribute("opacity", "0.8");
          text.setAttribute("font-family", "monospace");
          text.textContent = char;
          codeGroup.appendChild(text);
        }
      }
      // Randomly move the drop down, reset to top randomly for chaos
      if (Math.random() > 0.3) {
        drops[c] = (drops[c] + 1) % rows;
      } else if (Math.random() > 0.95) {
        drops[c] = 0;
      }
    }
  }

  setInterval(drawMatrix, 120);
});