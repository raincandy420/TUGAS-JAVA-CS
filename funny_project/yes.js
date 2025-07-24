// Select elements
const showLetterButton = document.getElementById("showLetter");
const letterContainer = document.querySelector(".card");
const letterText = document.getElementById("gushing-letter");

// Gushing letter content
const letterContent = `
My love,

Every moment with you feels like the most beautiful dream I never want to wake up from. 
From the way your laughter fills the room like a melody, to the way your presence alone makes everything brighter
I am endlessly grateful for you. 

You are the warmth in my coldest days, the light that guides me through any storm. 
I cherish every glance, every smile, every conversation that lingers in my mind long after it's ended. 
You make my world bloom in colors I never knew existed.

With you, love isn't just a word it's a feeling, a journey, a home I never want to leave. 
Thank you for being the most beautiful part of my life. 

Forever yours.
`;

// Disable multiple clicks
let isLetterShown = false;

// Button click event
showLetterButton.addEventListener("click", function () {
    if (isLetterShown) return; // Prevent multiple clicks
    isLetterShown = true;

    // Show the letter container
    letterContainer.classList.add("show");

    // Typing effect for the letter
    let index = 0;
    letterText.innerHTML = ""; // Clear existing text
    function typeLetter() {
        if (index < letterContent.length) {
            letterText.innerHTML += letterContent[index];
            index++;
            setTimeout(typeLetter, 50); // Typing speed effect
        }
    }
    typeLetter();

    // Play music
    const music = new Audio("https://l.top4top.io/m_3330wpx5c1.mp3");
    music.play();

    // Auto-scroll effect
    function autoScroll() {
        if (letterText.scrollTop < letterText.scrollHeight) {
            letterText.scrollTop += 1;
            setTimeout(autoScroll, 100);
        }
    }
    autoScroll();

    // Hide button after clicking
    showLetterButton.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const showLetterButton = document.getElementById("showLetter");
    const card = document.querySelector(".card");

    showLetterButton.addEventListener("click", function () {
        card.classList.add("unblur");
        showLetterButton.classList.add("hide"); // Hide button after click
    });
});
