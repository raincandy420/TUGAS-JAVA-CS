let options = [];
let rotation = 0;
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
let spinning = false;

function addInput() {
    const input = document.getElementById("newInput").value.trim();
    // Pattern: "kelompok 1 sampai 12", "1 sampai 12", "kelompok 1-12", or "1-12"
    const match = input.match(/^(.*?)(\d+)\s*(?:sampai|-)\s*(\d+)$/i);
    if (match) {
        let prefix = match[1].trim();
        let start = parseInt(match[2]);
        let end = parseInt(match[3]);
        if (start <= end && end - start < 100) { // reasonable limit
            for (let i = start; i <= end; i++) {
                let label = prefix ? `${prefix} ${i}`.replace(/\s+/g, ' ').trim() : `${i}`;
                if (!options.includes(label)) options.push(label);
            }
            document.getElementById("newInput").value = "";
            updateInputList();
            drawWheel();
            return;
        }
    }
    // Normal single input
    if (input && !options.includes(input)) {
        options.push(input);
        document.getElementById("newInput").value = "";
        updateInputList();
        drawWheel();
    }
}

function updateInputList() {
    const listDiv = document.getElementById("inputList");
    listDiv.innerHTML = "<h3>Options:</h3>" + options.map(opt => `<p>${opt}</p>`).join("");
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = options.length;
    if (total === 0) {
        // Optionally, show a message in the center
        ctx.save();
        ctx.fillStyle = "#03fa6e";
        ctx.restore();
        return;
    }

    let startAngle = 0;
    const angle = 2 * Math.PI / total;

    for (let i = 0; i < total; i++) {
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, startAngle + angle, false);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "#03fa6e" : "#028a48";
        ctx.fill();

        // Draw text
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(startAngle + angle / 2);
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(options[i], radius / 1.5, 0);
        ctx.restore();

        startAngle += angle;
    }
}


function spinWheel() {
    if (options.length === 0 || spinning) return;
    spinning = true;
    const spinButton = document.getElementById("spinButton");
    spinButton.disabled = true;

    const total = options.length;
    const duration = 8000; // 8 seconds
    let spins;

    if (total === 1) {
        spins = 13.33; // 100 RPM for 8 seconds
    } else {
        // 50 RPM base + 50 RPM per option, but for 8 seconds
        // spins = RPM * 8 / 60
        let rpm = 50 + 50 * total;
        spins = rpm * 8 / 60;
    }

    const start = performance.now();
    const initialRotation = rotation;
    const randomOffset = Math.random() * 360;
    const finalRotation = initialRotation + spins * 360 + randomOffset;

    function easeInOut(t) {
        // cubic ease-in-out
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(now) {
        const elapsed = now - start;
        let t = Math.min(elapsed / duration, 1); // 0 to 1
        let eased = easeInOut(t);
        rotation = initialRotation + (finalRotation - initialRotation) * eased;
        canvas.style.transform = `rotate(${rotation}deg)`;

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            canvas.style.transition = "";
            spinButton.disabled = false;
            determineWinner(); // Only call after animation is done
        }
    }

    canvas.style.transition = ""; // Remove any previous transition
    requestAnimationFrame(animate);
}

function determineWinner() {
    let spinButton = document.getElementById("spinButton"); 
    let degrees = (rotation % 360 + 360) % 360;
    let index = Math.floor((options.length - (degrees / 360) * options.length) % options.length);

    if (options.length > 0) {
        spinButton.disabled = true; // Disable spin button

        setTimeout(() => {
            document.getElementById("winnerText").innerText = options[index]; // Set winner name
            document.getElementById("winnerModal").style.display = "block"; // Show modal
            options.splice(index, 1); // Remove winner from list
            drawWheel();
            updateInputList();
        }, 5000); // 2-second delay after spin before showing modal
    }
}

function closeModal() {
    document.getElementById("winnerModal").style.display = "none";
    document.getElementById("spinButton").disabled = false; // Enable spin button when modal is closed
}

    function resetOptions() {
    options = [];
    updateInputList();
    drawWheel();
}

drawWheel();
