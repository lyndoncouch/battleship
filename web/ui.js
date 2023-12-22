"use strict";

let player;
let guid;

function createGame() {
	let url = "/game/createGame";
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			guid = data.guid;
			getShips(1);
			fetchBoard(1);
		});
}

function addShip(player) {
	let val = getValue('ships');
	let dir = getValue('direction');
	let pos = getValue('position');
	console.log(val, dir);
	setShip(1, val, dir, pos );
}

function setShip(player, type, direction, pos) {
	let url = "/game/" + guid + "/" + player + "/ships";
	let [shipType, length] = type.split(":");
	let body = {
		type: shipType,
		size: length,
		pos: pos,
		dir: direction
	};
	console.log("body", body);
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
}



//"/game/:guid/:player/ship"
function getShips(player) {
	let url = "/game/" + guid + "/" + player + "/ships";
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log("ships data", data)
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
		});
}

//"/game/:guid/:player"
function fetchBoard(player) {
	let url = "/game/" + guid + "/" + player;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const board = document.getElementById("board1");
			if (board) {
				board.innerHTML = data.board;
			}
		})
}

function getValue(id) {
	return document.getElementById(id).value;
}



document.addEventListener("DOMContentLoaded", (event)=> {
	
})