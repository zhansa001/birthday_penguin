const confettiContainer = document.getElementById("confetti-container");
const presentLid = document.querySelector(".present-lid");
const openSound = document.getElementById("open-sound");

if (!presentLid || !(openSound instanceof HTMLAudioElement)) {
    throw new Error("Missing present lid or opening sound");
}

presentLid.addEventListener("animationstart", (event) => {
    if (event.animationName !== "openPresent") return;

    openSound.play().catch((error) => {
        console.error("Chrome blocked the opening sound:", error);
    });
});

if (!confettiContainer) {
    throw new Error("Missing #confetti-container element");
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