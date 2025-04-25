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
    startGame(); 
});
restartButton.addEventListener("click", function() {
    startGameGame(); 
});

// Piilota peli aluksi
game.style.display = "none";

// Käynnistä peli "Start"-napista
startButton.addEventListener("click", function() {
    game.style.display = "block"; 
    startButton.style.display = "none"; 
    restartButton.style.display = "none"; 
    document.getElementById("menu").style.display = "none"; 
    score = -200; 
});

// Näytä "Pelaa uudestaan"-nappi pelin päättyessä
function gameOver() {
    let finalPoints = Math.max(0, Math.min(10, Math.floor(score / 200))); // Lasketaan pisteet

    // Tallenna pelin pistemäärä sessionStorageen
    sessionStorage.setItem("peli4", finalPoints);

    // Tarkista ja päivitä high score
    let highScore = sessionStorage.getItem("highScore");
    if (!highScore || score > highScore) {
        sessionStorage.setItem("highScore", Math.floor(score)); // Päivitä high score
        alert("Uusi ennätys! High Score: " + Math.floor(score) + "\nPisteet: " + finalPoints);
      } else {
        alert("Game Over! Your score: " + Math.floor(score) + "\nHigh Score: " + highScore);
    }

    game.style.display = "none";
    restartButton.style.display = "inline-block";
    document.getElementById("menu").style.display = "inline";
}

// Käynnistä peli uudelleen "Pelaa uudestaan"-napista
restartButton.addEventListener("click", function() {
   localStorage.setItem("lastScore", Math.floor(score));
   location.reload(); 
   document.getElementById("menu").style.display = "block"; 
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

// hyppäyksen function
function jump() {
    isJumping = true;
    let position = 130;
    let upInterval = setInterval(function() {
        if (position >= 130 + jumpHeight) {
            clearInterval(upInterval);
            let downInterval = setInterval(function() {
                if (position <= 130) {
                    clearInterval(downInterval);
                    isJumping = false; 
                }
                position -= jumpSpeed;
                character.style.bottom = position + "px";
            }, 20);
        }
        position += jumpSpeed;
        character.style.bottom = position + "px";
    }, 20);
}
function startGame() {
    let lastScore = localStorage.getItem("lastScore");


    score = -200;
    scoreElement.innerHTML = "Vuosi: " + Math.floor(score); 
    game.style.display = "block";
    startButton.style.display = "none"; 
    restartButton.style.display = "none";

    // Käynnistä törmäyksen tarkistus ja pisteiden päivitys
    if (checkDead) {
        clearInterval(checkDead); 
    }
    checkDead = setInterval(function () {
        var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        // Päivittää pisteet
        score += 0.08; 
        scoreElement.innerHTML = "Vuosi: " + Math.floor(score); 

        // Vaihtaa taustakuvan scoren mukaan
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

        // Törmäyksen tarkistus 
        if (obstacleLeft < 75 && obstacleLeft > 0 && characterBottom <= 130) {
           gameOver(); 
            clearInterval(checkDead);
        }
    }, 5); // Tarkistetaan törmäys ja päivitetään pisteet 5ms välein
}
