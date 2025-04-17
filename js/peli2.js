// Haetaan canvas ja sen konteksti piirtämistä varten
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
// Peli nopeuden säätö
var count = 0;
var score = 0; // Pistelaskuri

// Hedelmien/marjojen lista
var fruitImages = [
    { name: "Mansikka", file: "Mansikka.jpg" },
    { name: "Avokado", file: "Avokado.jpg" },
    { name: "Banaani", file: "Banaani.jpg" },
    { name: "Kirsikka", file: "Kirsikka.jpg" },
    { name: "Mandariini", file: "Mandariini.jpg" },
    { name: "Ananas", file: "Ananas.jpg" },
    { name: "Vadelma", file: "Vadelma.jpg" },
    { name: "Vesimeloni", file: "Vesimeloni.jpg" }
];

var currentFruit = null;
var fruitImage = new Image();

// Käärmeen alkuperäinen sijainti, suunta ja koko
var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

// Omenan alkuperäinen sijainti, tulee vaihtumaan jpg kuviin
var apple = {
    x: 320,
    y: 320
};

// Randon luku generaattori joka laittaa omenan satunnaiseen paikkaan ruudulla
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Asettaa satunnaisen hedelmän tai marjan ja paikan
function placeNewFruit() {
    currentFruit = fruitImages[getRandomInt(0, fruitImages.length)];
    fruitImage.src = "./img/" + currentFruit.file;
    apple.x = getRandomInt(0, canvas.width / grid) * grid;
    apple.y = getRandomInt(0, canvas.height / grid) * grid;
}

// Piirtää hedelmän kuvan kun se on ladattu
fruitImage.onload = () => {
    context.drawImage(fruitImage, apple.x, apple.y, grid, grid);
};

// Näyttää kysymyksen mikä marja/hedelmä syötiin
function askQuestion() {
    let answer = prompt("Minkä hedelmän tai marjan söit?");
    if (answer && answer.toLowerCase() === currentFruit.name.toLowerCase()) {
        score++;
        alert("Oikein! Pisteet: " + score + "/8");
    } else {
        alert("Väärin! Oikea vastaus oli: " + currentFruit.name);
    }

    if (score >= 8) {
        alert("Onneksi olkoon! Sait 8/8 oikein!");
        location.reload(); // Aloittaa pelin uudelleen
    }

    placeNewFruit();
}

// Pää luuppi
function loop() {
    requestAnimationFrame(loop); // Jatkuva peliluuppi

    // Hidastaa peliä jotta se ei mene liian nopeasti
    if (++count < 4) return;
    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height); // Tyhjentää ruudun

    // Päivittää käärmeen sijainnin pelissä
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Estää käärmeen menemästä ruudun ulkopuolelle ja tulee toiselta puolelta takaisin
    if (snake.x < 0) snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width) snake.x = 0;

    if (snake.y < 0) snake.y = canvas.height - grid;
    else if (snake.y >= canvas.height) snake.y = 0;

    // Lisää käärmeen päähän uusi osa
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) snake.cells.pop(); // Poistaa viimeisen jos on liian pitkä

    // Piirretään hedelmä tai marja ruudulle
    context.drawImage(fruitImage, apple.x, apple.y, grid, grid);

    // Piirretään käärme
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Tarkistaa käärmeen kohtaamisen hedelmän kanssa
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++; // Pidentää käärmettä
            setTimeout(askQuestion, 100); // Pieni viive ennen kysymystä
        }

        // Tarkistaa kohtaako käärme itseään -> peli alkaa alusta
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                score = 0;
                placeNewFruit(); // Asettaa uuden satunnaisen hedelmän
            }
        }
    });
}

// Addevent listener joka toimii käärmeen ohjaimena
document.addEventListener('keydown', function (e) {
    // Vasemmalle
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // Ylös
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // Oikealle
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // Alas
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

// Skaalaa canvas automaattisesti ruutukohtaisesti
function resizeCanvas() {
    canvas.width = Math.floor(window.innerWidth * 0.9 / grid) * grid;
    canvas.height = Math.floor(window.innerHeight * 0.7 / grid) * grid;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Käynnistää pelin
placeNewFruit();
requestAnimationFrame(loop);
