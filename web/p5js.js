let guid;

let cells = 10;
let dx, dy, startx, starty;
let letters = "ABCDEFGHIJ";
let direction = "DOWN";

let board = {};

let shadowCellX = 1,
  shadowCellY = 1;

let shipValid = true;
let game = {stage:-1};

let player = 1;

function setup() {
  createCanvas(400, 400);

  let boardWidth = width - width / cells;
  let boardHeight = height - height / cells;

  dx = boardWidth / cells;
  dy = boardHeight / cells;

  for (let i = 0; i < cells; i++) {
    board[letters.charAt(i)] = Array(10).fill("W");
  }

}
function draw() {
  background(220);

  // draw grid
  for (let i = 0; i <= cells; i++) {
    line(dx * (i + 1), dy, dx * (i + 1), height);
    line(dx, dy * (i + 1), width, dy * (i + 1));
  }

  // paint letters
  fill(0);
  textSize(16);
  for (let i = 0; i < cells; i++) {
    let y = dy * 0.7;
    let x = dx * (i + 1.35);
    text(i + 1, x, y);

    let letter = letters.charAt(i);
    if (i < 9) {
      x = dx * 0.5;
    } else {
      x = dx * 0.3;
    }
    y = dy * (i + 1.7);
    text(letter, x, y);
  }

  // paint board
  for (let i = 0; i < cells; i++) {
    let col = board[letters.charAt(i)];
	for (let j = 0; j < cells; j++) {
      let cell = col[j];
      if (cell == "W") {
        // blue square
        fill("lightblue");
        square(dx * (j + 1) + 1, dy * (i + 1) + 1, dx - 2);
      } else {
        fill(0);
        text(cell, dx * (j + 1.35), dy * (i + 1.7));
      }
    }
  }

  showShaddow(shadowCellX, shadowCellY);
  
}

function mouseMoved(event) {
  if (mouseX > width-5 || mouseY > height-5) return;
  if (mouseX > dx && mouseY > dy) {
    shadowCellX = Math.floor(mouseX / dx) - 1;
    shadowCellY = Math.floor(mouseY / dy) - 1;
  }
}


function setPlayer(p)  {
  player = p;
}

function showShaddow(x, y) {
  let direction = getDirection();
  let ship = getShip();
  let [name, size] = ship.split(":");

  if (checkValidShip()) {
    fill("grey");
    shipValid = true;
  } else {
    fill("red");
    shipValid = false;
  }

  for (let i = 0; i < size; i++) {
    if (direction == "ACROSS") {
      square(dx * (x + i + 1) + 1, dy * (y + 1) + 1, dx - 2);
    } else {
      square(dx * (x + 1) + 1, dy * (y + i + 1) + 1, dx - 2);
    }
  }
}

function checkValidShip() {
  let direction = getDirection();
  let ship = getShip();
  let [name, size] = ship.split(":");
  let cell;
  for (let i = 0; i < size; i++) {
    if (direction == "ACROSS") {
      if (shadowCellX+i >= cells) return false
      let key = letters[shadowCellY];
      cell = board[key][shadowCellX + i];
    } else {
      if (shadowCellY + i >= cells) return false;
      
      let key = letters[shadowCellY + i];
      let n = shadowCellX;

      cell = board[key][n];
    }
    if (cell != "W") return false;
  }

  return true;
}

function mousePressed(event) {
  if (mouseX > width || mouseY > height || mouseX<0 || mouseY<0) return;
  if (game.stage != 0) return;
  if (event.buttons == 1 && shipValid) {

  let ship = getShip();
  let [shipType, length] = ship.split(":");
  let direction = document.getElementById("direction").value;

	let pos = letters[shadowCellY] + (shadowCellX+1);
	let url = "/game/" + guid + "/" + player + "/ships";

	let body = {
		type: shipType,
		size: length,
		pos: pos,
		dir: getDirection()
	};

	fetch(url, {
		method: 'POST',
    	headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(body)
	})
	.then((response) => {
		getShips(player);
		fetchBoard(player);
	})
	.catch((e) => alert(e));
  }
  return true;
}


function getDirection() {
	return document.getElementById("direction").value;
}

function getShip() {
  return document.getElementById("ships").value;
}

/*
UI Bits
*/

function createGame() {
	let url = "/game/createGame";
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			game = data;
			guid = game.guid;
			getShips(1);
			fetchBoard(1);
		});
}

//"/game/:guid/:player/ship"
function getShips(player) {
	let url = "/game/" + guid + "/" + player + "/ships";
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const select = document.getElementById('ships');
			if (select) {
				select.innerHTML="";
				for(let row of data) {
					const show = row.name + " '" + row.symbol + "'";
					const value = row.name + ":" + row.shipLength;
					const el = document.createElement("option");
					el.text = show;
					el.value = value;
					select.add(el);
				}
			}
		})
		.catch((e)=> { alert(e)});
		
		
}


//"/game/:guid/:player"
function fetchBoard(player) {
	let url = "/game/" + guid + "/" + player;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
				board = data.board;
			}
		);
}

