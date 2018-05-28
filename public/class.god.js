var Creature = require("./class.creature.js");
module.exports = class God extends Creature {
    constructor(x, y) {
        super(x, y);
    }
    createWolf() {
        var norVandak = random(this.cho(1));
        if (norVandak) {
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    grasses.splice(i, 1);
                }
            }
            matrix[norVandak[1]][norVandak[0]] = Math.round(Math.random()) / 2 + 3;
            wolves.push(new Wolf(norVandak[0], norVandak[1]));
        }
    }
    createSheep() {
        var norVandak = random(this.cho(1));
        if (norVandak) {
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    grasses.splice(i, 1);
                }
            }
            matrix[norVandak[1]][norVandak[0]] = Math.round(Math.random()) / 2 + 2;
            sheeps.push(new Sheep(norVandak[0], norVandak[1]));
        }
    }
    createGrass() {
        var norVandak = random(this.cho(0));
        if (norVandak) {
            grasses.push(new Grass(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 1;
        }

    }
}