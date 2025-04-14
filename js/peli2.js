
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
// Peli nopeuden säätö
var count = 0;

// Käärmeen alkuperäinen sijainti, suunta ja koko
var snake = {
    x: 160, // Starting x-coordinate
    y: 160, // Starting y-coordinate
    dx: grid, // Horizontal movement (1 grid cell per frame)
    dy: 0, // Vertical movement (none initially)
    cells: [], // Array to track snake body parts
    maxCells: 4 // Initial length of the snake
};

// Omenan alkuperäinen sijainti, tulee vaihtumaan jpg kuviin mutta se ei vielä toimi
var apple = {
    x: 320,
    y: 320 
};

// Randon luku generaattori joka laittaa omenan satunnaiseen paikkaan ruudulla
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Pää luuppi
function loop() {
    requestAnimationFrame(loop); // Continuously call the loop function

    // Hidastaa peliä jotta se ei mene liian nopeasti, ei kukaan jaksa katsoa 1000 fps nopeudella menevää matoa
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Päivittää käärmeen sijainnin pelissä
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Estää käärmeen menemästä ruudun ulkopuolelle ja tulee toiselta puolelta takaisin
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // Sama kun ylempi mutta yläsuunnassa
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Lisää käärmeen päähän uusi osa kun syö omenan
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Poistaa viimeisen osan käärmeestä jos se on liian pitkä
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Omenan piirtäminen ruudulle
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Käärmeen piirtäminen ruudulle, värin pidän alkuperäisenä mutta voin vaihtaa sen myöhemmin
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Tarkistaa käärmeen kohtaamisen omenan kanssa
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++; // Increase the snake's length
            // Move the apple to a random position
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // Tarkistaa käärmeen kohtaamisen itsensä kanssa ja jos osuu peli loppuu ja alkaa alusta
        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                // Liikuttaaa omenan satunnaiseen paikkaan ruudulla kun uusi peli alkaa
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// Addevent listener joka toimii käärmeen ohjaimena
document.addEventListener('keydown', function (e) {
    // Vasemmalle
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid; // Move left
        snake.dy = 0;
    }
    // Ylös
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid; // Move up
        snake.dx = 0;
    }
    // Oikealle
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid; // Move right
        snake.dy = 0;
    }
    // Alas
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid; // Move down
        snake.dx = 0;
    }
});

// Aloittaa pelin
requestAnimationFrame(loop);