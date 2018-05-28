var Creature = require("./class.creature.js");
module.exports = class Grass extends Creature{
    bazmanal() {
        this.multiply++;
        var norVandak = random(this.cho(0));
        if (this.multiply >= 5 && norVandak) {
            var norGrass = new Grass(norVandak[0], norVandak[1]);
            grasses.push(norGrass);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }
}