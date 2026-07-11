// ==========================================
// DIGITAL JAPA MALA
// ==========================================
const clearBtn = document.getElementById("clearBtn");
const popup=document.getElementById("popup");
const mala = document.getElementById("mala");
const countDisplay = document.getElementById("count");
const totalDisplay = document.getElementById("total");
const roundDisplay = document.getElementById("rounds");

const chantBtn = document.getElementById("countBtn");
const resetBtn = document.getElementById("resetBtn");

let currentCount = 0;
let totalChants = 0;
let completedRounds = 0;

const TOTAL_BEADS = 108;
const RADIUS = 240;

// ==============================
// CREATE 108 BEADS
// ==============================

for(let i=0;i<TOTAL_BEADS;i++){

    const bead=document.createElement("div");

    bead.classList.add("bead");

    if(i===107){

        bead.classList.add("guru");

    }

    const angle=(360/TOTAL_BEADS)*i;

    bead.style.left="50%";
    bead.style.top="50%";

    bead.style.transform=
    `
    rotate(${angle}deg)
    translate(${RADIUS}px)
    rotate(-${angle}deg)
    `;

    mala.appendChild(bead);

}

const beads=document.querySelectorAll(".bead");

// ==============================
// UPDATE SCREEN
// ==============================
function closePopup(){

popup.classList.remove("show");

}
function updateDisplay(){

    countDisplay.innerHTML=currentCount;

    totalDisplay.innerHTML=totalChants;

    roundDisplay.innerHTML=completedRounds;

    beads.forEach(bead=>{

        bead.classList.remove("active");

    });

    if(currentCount>0){

        beads[currentCount-1].classList.add("active");

    }

}

// ==============================
// COUNT BUTTON
// ==============================

chantBtn.addEventListener("click",()=>{

    if(currentCount<108){

        currentCount++;

        totalChants++;

        // Mobile vibration

        if(navigator.vibrate){

            navigator.vibrate(30);

        }

        updateDisplay();

    }

    if(currentCount===108){

        completedRounds++;
        popup.classList.add("show");

lotusRain();

        roundDisplay.innerHTML=completedRounds;

        setTimeout(()=>{

            alert("🌸 Haribol!\n\nYou completed one full Japa Mala!\n\nHare Krishna!");

        },300);

    }

});

// ==============================
// RESET BUTTON
// ==============================

resetBtn.addEventListener("click",()=>{

    currentCount=0;

    updateDisplay();

});

// ==============================
// INITIAL
// ==============================

updateDisplay();
function lotusRain(){

for(let i=0;i<30;i++){

const flower=document.createElement("div");

flower.className="lotus";

flower.innerHTML=Math.random()>.5?"🌸":"🪷";

flower.style.left=Math.random()*100+"vw";

flower.style.animationDuration=

2+Math.random()*3+"s";

document.body.appendChild(flower);

setTimeout(()=>{

flower.remove();

},5000);

}

}
clearBtn.addEventListener("click",()=>{

    const confirmClear = confirm(
        "Are you sure?\n\nThis will erase all your chanting data."
    );

    if(!confirmClear) return;

    currentCount = 0;
    totalChants = 0;
    completedRounds = 0;

    localStorage.removeItem("count");
    localStorage.removeItem("total");
    localStorage.removeItem("rounds");

    updateDisplay();

});
