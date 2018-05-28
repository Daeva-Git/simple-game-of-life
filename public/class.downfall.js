var Creature = require("./class.creature.js");
module.exports = class Downfall extends Creature {
    constructor(x, y, num) {
        super(x, y);
        this.energy = 2;
    } 
    live(i) {
        var norVandak = random(this.cho(6));
        if (norVandak) {
            if (matrix[this.y][this.x] == 11 || matrix[this.y][this.x] == 21) {
                for (var i in grasses) {
                    if (grasses[i].x == this.x && grasses[i].y == this.y) {
                        grasses.splice(i, 1);
                    }
                }
            }
            else if (matrix[this.y][this.x] == 12 || matrix[this.y][this.x] == 22) {
                for (var i in upgradedGrasses) {
                    if (upgradedGrasses[i].x == this.x && upgradedGrasses[i].y == this.y) {
                        upgradedGrasses.splice(i, 1);
                    }
                }
            }
            var norLake = new Lake(this.x, this.y);
            lakes.push(norLake);
            downfalls.splice(i, 1);
            matrix[this.y][this.x] = 6;
        }
        else {
            if (this.energy <= 0) {
                downfalls.splice(i, 1);
                var norGrass = new Grass(this.x, this.y);
                grasses.push(norGrass);
                matrix[this.y][this.x] = 1;
            }
            else {
                this.energy--;
            }
        }
    }/*
    live(i) {
        if (this.energy <= 0) {
            if (matrix[this.y][this.x] == 11 || matrix[this.y][this.x] == 21) {
                downfalls.splice(i, 1);
                matrix[this.y][this.x] = 1;
                var norGrass = new Grass(this.x, this.y);
                grasses.push(norGrass);
            }
            else if (matrix[this.y][this.x] == 12 || matrix[this.y][this.x] == 22) {
                downfalls.splice(i, 1);
                matrix[this.y][this.x] = 7;
                var norGrass = new UpgradedGrass(this.x, this.y);
                upgradedGrasses.push(norGrass);
            }
            else if (matrix[this.y][this.x] == 10 || matrix[this.y][this.x] == 20) {
                downfalls.splice(i, 1);
                matrix[this.y][this.x] = 0;
            }
            else {  
                downfalls.splice(i, 1);
                matrix[this.y][this.x] = 0;
            }
        }
        else {
            this.energy--;
        }
    } */
} 