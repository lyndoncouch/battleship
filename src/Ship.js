class Ship {
	constructor(name, length, symbol) {
		this.name = name;
		this.shipLength = length;
		this.symbol = symbol;
	}

}

Ship.DIRECTION = {};
Ship.DIRECTION.DOWN = "DOWN";
Ship.DIRECTION.ACROSS = "ACROSS";



module.exports = Ship;