let monika0 = document.querySelector('.jump .sprite');
let monika1 = document.querySelector('.slidefromright .sprite');
let monikaJumpscare = document.querySelector('.jumpscare .sprite');
let monikaPointing = document.querySelector('.pointatyes .sprite'); // Pointing Monika
let noButton = document.getElementById('doSomething');
let yesButton = document.querySelector("button[onclick]");
let container = document.querySelector(".container");
let pressCount = 0;
let jumpCount = 0;
let hasSlidIn = false;
let hasExpanded = false;
let jumpscareCount = 0;

// Initialize Monika's position (fully hidden below view)
monika0.style.position = 'fixed';
monika0.style.left = '20px';
monika0.style.bottom = '-180px'; // Fully hidden below
monika0.style.display = 'block';
monika0.style.transition = 'bottom 0.3s ease-in-out';
monika1.style.display = 'none'; // Hide slide-in Monika
monikaJumpscare.style.display = 'none'; // Hide jumpscare Monika
monikaPointing.style.display = 'none'; // Hide pointing Monika

// Function to make Monika jump up 4 times
function jumpMonika() {
    if (jumpCount < 4) {
        let basePosition = -180 + jumpCount * 60;
        let jumpHeight = basePosition + 40;

        monika0.src = "/funny_project/monika/Monika_Sticker_Excited.png";
        monika0.style.bottom = jumpHeight + 'px';
        
        setTimeout(() => {
            monika0.style.bottom = (basePosition + 20) + 'px';
            monika0.src = "/funny_project/monika/Monika_Sticker_Distrait.png";
        }, 300);

        jumpCount++;
        pressCount++;
        let scale = 1 + pressCount * 0.1;
        yesButton.style.transform = `scale(${scale})`;
    } else if (!hasSlidIn) {
        slideInMonika();
    } else if (!hasExpanded) {
        expandButton();
    } else if (jumpscareCount < 5) {
        triggerJumpscare();
    } else {
        showPointingMonika();
    }
}

// Function to slide Monika in from the right
function slideInMonika() {
    monika0.style.display = 'true'; // Hide jumping Monika
    monika1.style.display = 'block'; // Show sliding Monika
    monika1.style.position = 'fixed';
    monika1.style.right = '-200px'; // Start offscreen
    monika1.style.bottom = '0px';
    monika1.style.width = '640px'; // Set width to 640px
    monika1.style.height = '640px'; // Set height to 640px
    monika1.style.transition = 'right 1.8s ease-in-out';
    
    setTimeout(() => {
        monika1.style.right = '-200px'; // Slide in to position
    }, 3000);

    hasSlidIn = true;
}

// Function to expand the "Yes" button and container
function expandButton() {
    monika1.style.display = 'true'; // Hide slide-in Monika
    yesButton.style.transform = 'scale(2)'; // Instantly double the button size
    container.style.width = 'auto';
    container.style.height = 'auto';
    container.style.padding = '20px';
    hasExpanded = true;
}

// Function to trigger jumpscare
function triggerJumpscare() {
    monikaJumpscare.style.display = 'block';
    monikaJumpscare.style.position = 'fixed';
    monikaJumpscare.style.left = '50%';
    monikaJumpscare.style.top = '50%';
    monikaJumpscare.style.transform = 'translate(-50%, -50%)';
    monikaJumpscare.style.width = '700px';
    monikaJumpscare.style.height = '700px';
    
    setTimeout(() => {
        monikaJumpscare.style.display = 'none';
    }, 1000); // Hide after 1 second

    jumpscareCount++;

    // If jumpscare happens 5 times, show the pointing Monika
    if (jumpscareCount >= 5) { setTimeout(() => {
        showPointingMonika();
    }, 2000);     
    }
}

// Function to show pointing Monika near the "Yes" button
function showPointingMonika() {
    monikaPointing.style.display = 'block';
    monikaPointing.style.position = 'fixed';

    // Position it precisely to the bottom-right of the "Yes" button
    let yesButtonRect = yesButton.getBoundingClientRect();
    monikaPointing.style.left = (yesButtonRect.right - 70) + 'px';
    monikaPointing.style.top = (yesButtonRect.bottom - 170) + 'px';

    monikaPointing.style.width = '400px'; // Adjust size here
    monikaPointing.style.height = '400px'; // Adjust size here
}

// Event listener for "No" button
noButton.addEventListener('click', jumpMonika);

document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");

    // Play music after user interaction (fixes autoplay restrictions)
    document.body.addEventListener("click", function startMusic() {
        bgMusic.play();
        document.body.removeEventListener("click", startMusic); // Prevent multiple triggers
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const showContentBtn = document.getElementById("showcontent");
    const container = document.querySelector(".container");

    showContentBtn.addEventListener("click", function () {
        container.classList.add("unblurred"); // Remove blur effect
        showContentBtn.classList.add("hidden"); // Hide button after click
    });
});

