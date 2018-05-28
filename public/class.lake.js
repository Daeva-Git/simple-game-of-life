var Creature = require("./class.creature.js");
module.exports = class Lake extends Creature{
    constructor(x, y) {
        super(x, y);
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x + 2, this.y],
            [this.x, this.y + 2]
        ];
    }
    live(){
        var norVandak = random(this.cho(1));
        if(norVandak){
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    var norGrass = new UpgradedGrass(grasses[i].x, grasses[i].y);
                    upgradedGrasses.push(norGrass);
                    matrix[norVandak[1]][norVandak[0]] = 7;
                    grasses.splice(i, 1);
                    break;
                }
            }
        }
    }
}