var Creature = require("./class.creature.js");
module.exports = class PressedGrasse extends Creature{
    constructor(x, y) {
        super(x, y);
        this.energy = 1;
    }
    live(i) {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1;
            var norGrass = new Grass(this.x, this.y);
            grasses.push(norGrass);
            pressedGrasses.splice(i, 1);
        }
        else {
            this.energy--;
        }
    }
} 