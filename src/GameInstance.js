const Player = require("./Player");
const Game = require("./Game.js");

class GameInstance {
	constructor() {
		console.log("create game")
		// set the games id to the time asked for in millis
		this.guid = Date.now();
		console.log("Guid:", this.guid)
		this.players = [];
		this.players.push(new Player());
		this.players.push(new Player());
		this.stage = Game.STAGE.NEW;
	}

};







module.exports = GameInstance;
