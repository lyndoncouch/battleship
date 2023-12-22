"use strict";

const express = require("express");

const Game = require("./Game.js");
const GameInstance = require("./GameInstance.js");
const Board = require("./Board.js");

const app = express();
const port=8080;


// let board = new Board();

// board.addShip(3, "D3", Game.SHIP_DIRECTION.DOWN);
// board.addShip(4, "B7", Game.SHIP_DIRECTION.ACROSS)

// app.get("/boardString/:", (req, res) => {
// 	let b = board.shipStateString();
// 	res.send(b);
// });

// app.get("/board", (req, res) => {
// 	res.send(board.shipState());
// });

app.use(express.static('web'));
app.use(express.json());
let games = {};


app.get("/game/:guid/:player/ships", (req, res) => {
	var game = games[req.params.guid];
	if (game) {
		let player = game.players[Number(req.params.player)-1];
		res.send(player.availableShips);
	} else {
		res.status(400).send(err("Unknown game",1));
	}
})

app.get("/game/:guid/:player", (req, res) => {
	var game = games[req.params.guid];
	if (game) {
		let player = game.players[Number(req.params.player)-1];
		if(player) {
			res.send({board:player.board.shipState()});
			return;
		}

	} 
	
	res.status(400).send(err("Unknown game",1));
	

});

app.get("/game/createGame", (req, res) => {
	let game = new GameInstance();
	games[game.guid] = game;
	var guid = {guid: game.guid};
	res.send(game);
});

app.get("/games", (req, res) => {
	res.send(games);
})

app.post("/game/:guid/:player/ships", (req, res) => {
	var game = games[req.params.guid];
	if (game) {
		let player = game.players[Number(req.params.player)-1];
		if (player) {
			let body = req.body;
			let legalMove = player.addShip(body.pos, body.dir, body.type);
			if (legalMove) {
				res.sendStatus(200);
			} else {
				res.status(400).send(err("Ships Overlap",3));
			}
		} else {
			res.status(400).send(err("Unknown Player",2));
		}
	} else {
		res.status(400).send(err("Unknown game",1));
	}
	
});

app.listen(port, () => {
	console.log("listening on port :${port}...");
});

function err(string, code) {
	console.error("error", string, code);
	return JSON.stringify({error:string,code:code});
}