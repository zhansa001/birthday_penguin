const start = document.getElementById("start-screen");
const start_button = document.getElementById("start-button");
const penguin = document.getElementById("penguin");
const surpriseButton = document.getElementById("surprise-button");
const walking = document.getElementById("walking-sound");

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
    // Stop using the walking GIF/ sound
    penguin.src = "assets/images/otomusu-penguin-idle.gif";
 
});

surpriseButton.addEventListener("click", function() {
    buttonSound.play();
});