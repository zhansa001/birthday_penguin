const start = document.getElementById("start-screen");
const start_button = document.getElementById("start-button");
const penguin = document.getElementById("penguin");
const surpriseButton = document.getElementById("surprise-button");
const walking = document.getElementById("walking-sound");
const button = document.getElementById("button-sound");

start_button.addEventListener("click", function() {
    //Hides it
    start.classList.add("hidden");

    walking.play()
        .then(() => {
            console.log("Sound works");
        })
        .catch(error => {
            console.log("Audio error: ", error);
        });

    penguin.style.animation = "walkIn 4s ease forwards";
});

// Wait until the penguin finishes walking
penguin.addEventListener("animationend", function() {
    // Change to idle penguin
    penguin.src = "assets/images/otomusu-penguin-idle.gif";
    document.getElementById("greeting").classList.add("show");
    document.getElementById("speech-bubble").classList.add("show");
    document.querySelector(".instruction").classList.add("show");
    surpriseButton.classList.add("show");
});

surpriseButton.addEventListener("click", (event) => {
    event.preventDefault();

    button.currentTime = 0;
    button.addEventListener("ended", () => {
        window.location.href = surpriseButton.href;
    }, { once: true });

    button.play().catch((error) => {
        console.error("Could not play the button sound:", error);
        window.location.href = surpriseButton.href;
    });
});