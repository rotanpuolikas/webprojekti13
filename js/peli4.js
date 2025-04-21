console.log("Script is working!");

var character = document.getElementById("character");
var papukaija = document.getElementById("lokki");
var block = document.getElementById("block");
var scoreElement = document.getElementById("score");
var isJumping = false; // Flag to check if the character is jumping
var jumpHeight = 150; // Hyppykorkeus
var jumpSpeed = 5; // Nopeus, jolla hahmo liikkuu ylös ja alas
var score = 0; // Pisteet


document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true; // Estää uuden hyppy kesken hypyn
    let position = 130; // Hahmon aloituskorkeus (bottom)
    let upInterval = setInterval(function() {
        if (position >= 130 + jumpHeight) {
            // Kun hahmo saavuttaa maksimikorkeuden, lopeta ylösliike
            clearInterval(upInterval);
            let downInterval = setInterval(function() {
                if (position <= 130) {
                    // Kun hahmo palaa alkuperäiseen korkeuteen, lopeta alasliike
                    clearInterval(downInterval);
                    isJumping = false; // Salli uusi hyppy
                }
                position -= jumpSpeed; // Liikuta hahmoa alaspäin
                character.style.bottom = position + "px";
            }, 20);
        }
        position += jumpSpeed; // Liikuta hahmoa ylöspäin
        character.style.bottom = position + "px";
    }, 20);
}

var checkDead = setInterval(function() {
    var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 70 && blockLeft > 0 && characterBottom <= 130) {
        alert("Game Over! Your score: " + score); // Näytä pelin päättymisilmoitus
        clearInterval(checkDead);
    } else {
        score+= 0.05; // Lisää 0.05 pistettä jokaisella päivityksellä
        scoreElement.innerHTML = "Score: " + Math.floor(score); // Näytä vain kokonaisluvut
    }
}, 5); // Tarkistetaan törmäys 5ms välein