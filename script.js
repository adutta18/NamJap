// ======================================
// DIGITAL JAPA MALA
// ======================================

// HTML Elements
const mala = document.getElementById("mala");
const countDisplay = document.getElementById("count");
const totalDisplay = document.getElementById("total");
const roundDisplay = document.getElementById("rounds");

const chantBtn = document.getElementById("countBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearBtn");

const popup = document.getElementById("popup");
const bgMusic = document.getElementById("bgMusic");

// Sounds
const bell = new Audio("sound/bell.mp3");
bell.volume = 0.6;

// Variables
const TOTAL_BEADS = 108;

let currentCount = parseInt(localStorage.getItem("count")) || 0;
let totalChants = parseInt(localStorage.getItem("total")) || 0;
let completedRounds = parseInt(localStorage.getItem("rounds")) || 0;

let musicStarted = false;

// ======================================
// Responsive Radius
// ======================================

function getRadius() {

    if (window.innerWidth <= 480) return 120;

    if (window.innerWidth <= 768) return 145;

    return 220;

}

// ======================================
// Create Mala
// ======================================

function createBeads() {

    mala.innerHTML = "";

    const radius = getRadius();

    for (let i = 0; i < TOTAL_BEADS; i++) {

        const bead = document.createElement("div");

        bead.classList.add("bead");

        if (i === 107) {

            bead.classList.add("guru");

        }

        const angle = (360 / TOTAL_BEADS) * i;

        bead.style.left = "50%";
        bead.style.top = "50%";

        bead.style.transform =
            `rotate(${angle}deg)
             translate(${radius}px)
             rotate(-${angle}deg)`;

        mala.appendChild(bead);

    }

}

createBeads();

let beads = document.querySelectorAll(".bead");

// ======================================
// Save Data
// ======================================

function saveData() {

    localStorage.setItem("count", currentCount);
    localStorage.setItem("total", totalChants);
    localStorage.setItem("rounds", completedRounds);

}

// ======================================
// Update Screen
// ======================================

function updateDisplay() {

    countDisplay.textContent = currentCount;
    totalDisplay.textContent = totalChants;
    roundDisplay.textContent = completedRounds;

    beads.forEach(bead => bead.classList.remove("active"));

    if (currentCount > 0) {

        beads[currentCount - 1].classList.add("active");

    }

    saveData();

}

updateDisplay();

// ======================================
// Play Bell
// ======================================

function playBell() {

    bell.pause();

    bell.currentTime = 0;

    bell.play().catch(() => { });

}

// ======================================
// Close Popup
// ======================================

function closePopup() {

    popup.classList.remove("show");

}

// ======================================
// Lotus Animation
// ======================================

function lotusRain() {

    for (let i = 0; i < 30; i++) {

        const flower = document.createElement("div");

        flower.className = "lotus";

        flower.innerHTML = Math.random() > 0.5 ? "🌸" : "🪷";

        flower.style.left = Math.random() * 100 + "vw";

        flower.style.animationDuration = (2 + Math.random() * 3) + "s";

        document.body.appendChild(flower);

        setTimeout(() => {

            flower.remove();

        }, 5000);

    }

}

// ======================================
// Chant Button
// ======================================

chantBtn.addEventListener("click", () => {

    if (currentCount >= TOTAL_BEADS) return;

    // Start background music once

    if (!musicStarted && bgMusic) {

        bgMusic.volume = 0.25;

        bgMusic.play().catch(err => console.log(err));

        musicStarted = true;

    }

    currentCount++;
    totalChants++;

    playBell();

    if (navigator.vibrate) {

        navigator.vibrate([20, 20, 20]);

    }

    updateDisplay();

    if (currentCount === TOTAL_BEADS) {

        completedRounds++;

        updateDisplay();

        popup.classList.add("show");

        lotusRain();

    }

});

// ======================================
// Reset Current Round
// ======================================

resetBtn.addEventListener("click", () => {

    currentCount = 0;

    updateDisplay();

});

// ======================================
// Clear Everything
// ======================================

clearBtn.addEventListener("click", () => {

    const ok = confirm("Do you want to clear all chanting history?");

    if (!ok) return;

    currentCount = 0;
    totalChants = 0;
    completedRounds = 0;

    localStorage.removeItem("count");
    localStorage.removeItem("total");
    localStorage.removeItem("rounds");

    updateDisplay();

});

// ======================================
// Window Resize
// ======================================

window.addEventListener("resize", () => {

    createBeads();

    beads = document.querySelectorAll(".bead");

    updateDisplay();

});
