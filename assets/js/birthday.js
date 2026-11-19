const confettiContainer = document.getElementById("confetti-container");
const presentLid = document.querySelector(".present-lid");
const openSound = document.getElementById("open-sound");

// Replay
const replayBtn = document.getElementById("replay-button");
const present = document.querySelector(".present");
const presentContent = document.querySelector(".present-content");

let replaying = false;

// Starting the functions

if (!confettiContainer ||!presentLid || !(openSound instanceof HTMLAudioElement) || !replayBtn) {
    throw new Error("Missing confetti element, present lid or opening sound or replay button");
}

presentLid.addEventListener("animationstart", (event) => {
    if (event.animationName !== "openPresent" || replaying) return;

    openSound.play().catch((error) => {
        console.error("Chrome blocked the opening sound:", error);
    });
});

function replayCelebration(element) {
    element.style.animation = "none";
    void element.offsetWidth;
    element.style.animation = "";
}

function launchConfetti() {
    const colors = ["#ff518b", "#ffe27a", "#7bdff2", "#b2f7a1", "#ffffff"];
    const pieces = document.createDocumentFragment();

    for (let i = 0; i < 90; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.setProperty("--size", `${6 + Math.random() * 7}px`);
        piece.style.setProperty("--drift", `${Math.random() * 240 - 120}px`);
        piece.style.setProperty("--duration", `${3 + Math.random() * 2}s`);
        piece.style.setProperty("--delay", `${Math.random() * 0.8}s`);
        piece.addEventListener("animationend", () => piece.remove(), { once: true });
        pieces.append(piece);
    }

    confettiContainer.append(pieces);
}

window.setTimeout(launchConfetti, 1800);

replayBtn.addEventListener("click", function() {
    replaying = true;

    openSound.pause();
    openSound.currentTime = 0;
    openSound.play().catch((error) => {
        console.error("Could not replay the opening sound:", error);
    });

    confettiContainer.replaceChildren();

    replayCelebration(presentLid);
    replayCelebration(presentContent);
    replayCelebration(present);

    window.setTimeout(launchConfetti, 1800);

    window.setTimeout(() => {
        replaying = false;
    }, 2500);
});