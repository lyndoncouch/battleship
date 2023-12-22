const Board = require("./Board");
const Game = require("./Game.js");

class Player {
	constructor(player) {
		this.board = new Board();
		this.availableShips = [...Game.shipSet];
		this.player = player;
		this.status = Player.STATUS.DESIGNING;
	}

	addShip(head, dir, type) {
		if (this.board.addShip(head, dir, type)) {
			let remove = -1;
			for (let i=0; i < this.availableShips.length; i++) {
				let ship = this.availableShips[i];
				if (ship.name == type) {
					remove = i;
					break;
				}
			}
			this.availableShips.splice(remove,1);
		return true;
		}

		return false;
	}

}

Player.STATUS = {};
Player.STATUS.DESIGNING = 0;
Player.STATUS.PLAYING = 1;

module.exports = Player;