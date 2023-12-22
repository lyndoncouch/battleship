"use strict";
const Game = require("./Game.js");
const Ship = require("./Ship.js");

const letters = "ABCDEFGHIJ";



class Board {
	constructor() {
		this.board = {};
		for (let i = 0; i<10; i++) {
			let key = letters.charAt(i);
			this.board[key] = Array(10).fill(Game.BOARD.WATER);
			// this.board[key] = Array(10).fill("W");
		}

	}

	_testShip(size, x, y, dir) {
		if (dir == Ship.DIRECTION.DOWN) {
			for (let i=0; i<size; i++) {
				if (this.board[letters[x]][y+i] != Game.BOARD.WATER) return false;
			}
		} else {
			for (let i=0; i<size; i++) {
				if (this.board[letters.charAt(x+ i)][y] != Game.BOARD.WATER) return false;
			}
		}

		return true;
	}


	addShip(head, dir, type) {
		let ship = Game.getShip(type);
		let size = ship.shipLength;

		console.log("addShip", head, dir, type);

		const letter = head.charAt(0);
		const x = letters.indexOf(letter);
		const y = Number(head.charAt(1)) - 1;

		if (this._testShip(size, x, y, dir)) {
			if (dir == Ship.DIRECTION.DOWN) {
				for (let i=0; i<size; i++) {
					this.board[letters.charAt(x+ i)][y] = ship.symbol;
				}
			} else {
				for (let i=0; i<size; i++) {
					console.log("setting", letters.charAt(x), (y+i))
					this.board[letters.charAt(x)][y+i] = ship.symbol;
				}
			}
			return true;
		}
		return false;
	}


	shipStateString() {
		let response = "  " + letters + "\n<br>";
		for (let y = 0; y<10; y++) {
			let row= (y+1) + " ";
			for (let x = 0; x<10; x++) {
			let column = this.board[letters.charAt(x)];
				let b = column[y];
				if (b == Game.BOARD.WATER) row +="~";
				else if (b == Game.BOARD.MISS) row +="v";
				else if (b == Game.BOARD.HIT) row +="*";
				else row+=b;
			}
			response += row +"\n<br/>";
		}
		return response;
	}

	shipState() {
		return this.board;
	}


}

module.exports = Board;