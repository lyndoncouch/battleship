"use Strict";
const Ship = require("./Ship");

const Game = {};


Game.shipSet = [];
Game.shipSet.push(new Ship("Carrier",5, "@"));
Game.shipSet.push(new Ship("Battleship",4, "#"));
Game.shipSet.push(new Ship("Cruser",3, "&"));
Game.shipSet.push(new Ship("Submarine",3, "$"));
Game.shipSet.push(new Ship("Destroyer",2, "!"));

Game.STAGE = {};
Game.STAGE.UNSTARTED = -1;
Game.STAGE.NEW = 0;
Game.STAGE.CREATED = 1;
Game.STAGE.PLAYING = 2;


Game.getShip = function(type) {
	for (let ship of Game.shipSet) {
		if (ship.name == type) {
			return ship;
		}
	}
}

Game.BOARD = {};





// Game.SHIP_DIRECTION.DOWN = 0;
// Game.SHIP_DIRECTION.ACROSS = 1;

Game.BOARD.WATER = "W";
Game.BOARD.MISS = "M";
Game.BOARD.HIT = "*";

module.exports = Game;