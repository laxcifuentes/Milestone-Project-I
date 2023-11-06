// inital board setup
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// ship position
let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}


let shipImg;
let shipVelocityX = tileSize;

// aliens 
let alienArray = [];
let alienWidth = tileSize*2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1;

// bullets
let bulletArray = [];
let bulletVelocityY = -10;

let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
}

// images
shipImg = new Image();
shipImg.src = "./ship.png";
shipImg.onload = function() {
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}

alienImg = new Image();
alienImg.src = "./alien.png";
createAliens();

requestAnimationFrame(update);
document.addEventListener("keydown", moveShip);
document.addEventListener("keyup", shoot);

function update() {
requestAnimationFrame(update);

if (gameOver) {
    return;
}

context.clearRect(0, 0, board.width, board.height);

// ship
context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

// alien
for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
        alien.x += alienVelocityX;

        // if alien touches the borders
        if (alien.x + alien.width >= board.width || alien.x <= 0) {
            alienVelocityX *= -1;
            alien.x += alienVelocityX*2;

            // move all aliens up by one row
            for (let j = 0; j < alienArray.length; j++) {
                alienArray[j].y += alienHeight;
            }
        }
        context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

        if (alien.y >= ship.y) {
            gameOver = true;
        }
    }
}