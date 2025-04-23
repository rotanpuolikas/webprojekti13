console.log("Script is working!");

var character = document.getElementById("character");
var papukaija = document.getElementById("papukaija");
var obstacle = document.getElementById("obstacle");
var scoreElement = document.getElementById("score");
var isJumping = false; // tarkistaa, onko hahmo hyppäämässä
var jumpHeight = 200; // Hyppykorkeus
var jumpSpeed = 6; // Nopeus, jolla hahmo liikkuu ylös ja alas
var score = -200; // Pisteet
var startButton = document.getElementById("startButton");
var restartButton = document.getElementById("restartButton");
var game = document.getElementById("game");
var checkDead; // Muuttuja törmäyksen tarkistamiseen

startButton.addEventListener("click", function() {
    startGame(); // Käynnistä peli
});
restartButton.addEventListener("click", function() {
    startGameGame(); // Käynnistä peli uudelleen
});

// Piilota peli aluksi
game.style.display = "none";

// Käynnistä peli "Start"-napista
startButton.addEventListener("click", function() {
    game.style.display = "block"; // Näytä peli
    startButton.style.display = "none"; // Piilota "Start"-nappi
    restartButton.style.display = "none"; // Piilota "Pelaa uudestaan"-nappi
    document.getElementById("menu").style.display = "none"; // Piilota menu
    score = -200; // Nollaa pisteet
});

// Näytä "Pelaa uudestaan"-nappi pelin päättyessä
function gameOver() {
    alert("Game Over! Your score: " + Math.floor(score));
    localStorage.removeItem("lastScore"); // Poista tallennettu pistemäärä
    game.style.display = "none"; // Piilota peli
    restartButton.style.display = "inline-block"; // Näytä "Pelaa uudestaan"-nappi
    document.getElementById("menu").style.display = "inline"; // Näytä menu
}

// Käynnistä peli uudelleen "Pelaa uudestaan"-napista
restartButton.addEventListener("click", function() {
   localStorage.setItem("lastScore", Math.floor(score)); // Tallenna paras tulos
   location.reload(); // Lataa sivu uudelleen
   document.getElementById("menu").style.display = "block"; // Näytä menu uudelleen
});

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
function startGame() {
    // Tarkista, onko tallennettu pistemäärä olemassa
    let lastScore = localStorage.getItem("lastScore");
    if (lastScore) {
        alert("Edellinen pistemäärä: " + lastScore); // Näytä edellinen pistemäärä
    }

    score = -200; // Nollaa pisteet
    scoreElement.innerHTML = "Vuosi: " + Math.floor(score); // Päivitä pisteet
    game.style.display = "block"; // Näytä peli
    startButton.style.display = "none"; // Piilota "Start"-nappi
    restartButton.style.display = "none"; // Piilota "Pelaa uudestaan"-nappi

    // Käynnistä törmäyksen tarkistus ja pisteiden päivitys
    if (checkDead) {
        clearInterval(checkDead); // Varmista, ettei vanha intervalli jää päälle
    }
    checkDead = setInterval(function () {
        var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        // Päivitä pisteet
        score += 0.08; // Lisää 0.05 pistettä jokaisella päivityksellä
        scoreElement.innerHTML = "Vuosi: " + Math.floor(score); // Näytä vain kokonaisluvut

        // Vaihda taustakuva scoren mukaan
        if (score >= -200 && score < 200) {
            document.getElementById("sky").style.backgroundImage = "url('/img/vanha-aika.png')";
        } else if (score >= 200 && score < 500) {
            document.getElementById("sky").style.backgroundImage = "url('/img/rooma.png')";
        } else if (score >= 500 && score < 900) {
            document.getElementById("sky").style.backgroundImage = "url('/img/linna.png')";
        } else if (score >= 900 && score < 1300) {
            document.getElementById("sky").style.backgroundImage = "url('/img/viikinkikylä.png')"; 
        } else if (score >= 1200 && score < 1500) {
            document.getElementById("sky").style.backgroundImage = "url('/img/renesanssi.png')"; 
        } else if (score >= 1500 && score < 1700) {
            document.getElementById("sky").style.backgroundImage = "url('/img/löytöretket.png')"; 
        } else if (score >= 1700 && score < 1850) {
            document.getElementById("sky").style.backgroundImage = "url('/img/teollinen.png')";
        } else if (score >= 1900 && score < 2000) {
            document.getElementById("sky").style.backgroundImage = "url('/img/1sota.png')";
        } else if (score >= 2000 && score < 2150) {
            document.getElementById("sky").style.backgroundImage = "url('/img/nykyaika.png')";
        } else if (score >= 2150) {
            document.getElementById("sky").style.backgroundImage = "url('/img/tulevaisuus.png')";
        }

        // Törmäyksen tarkistus (jos käytössä)
        if (obstacleLeft < 75 && obstacleLeft > 0 && characterBottom <= 130) {
           gameOver(); // Kutsu pelin päättymisfunktiota
            clearInterval(checkDead);
        }
    }, 5); // Tarkistetaan törmäys ja päivitetään pisteet 50ms välein
}
