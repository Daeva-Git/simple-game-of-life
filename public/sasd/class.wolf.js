var Creature = require("./class.creature.js");
module.exports = class Wolf extends Creature{
    constructor(x, y) {
        super(x, y);
        this.energy = 50;
    }
    stanalNorKordinatner() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x - 1, this.y + 2],
            [this.x, this.y - 2],
            [this.x, this.y - 1],
            [this.x, this.y],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2]
        ];
    }
    cho(ch) {
        var found = [];
        if(ch == 3){
            super.stanalNorKordinatner();
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == ch) {
                        found.push(this.directions[i]);
                    }
                }
                return found;
            }
        }

        this.stanalNorKordinatner();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        if(this.energy > 100){
            this.energy = 100;
        }
        var norVandak = random(this.cho(1));
        if(norVandak){
            for (var i in grasses) {
                if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                    grasses.splice(i, 1);
                }
            }
            var norGrass = new PressedGrass(this.x, this.y);
            pressedGrasses.push(norGrass); 
            matrix[this.y][this.x] = 5; 
            this.svaboda = 1;
            this.x = norVandak[0];
            this.y = norVandak[1];
            matrix[this.y][this.x] = 3;
        }
        else{
            var norVandak = random(this.cho(0));
            matrix[this.y][this.x] = 0;
        }
        this.energy--;
    }

    utel() {
        var norVandak = random(this.cho(2));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.x = norVandak[0];
            this.y = norVandak[1];
            for (var i in sheeps) {
                if (sheeps[i].x == this.x && sheeps[i].y == this.y) {
                    sheeps.splice(i, 1);
                }
            }
            this.energy+=25;
        }
        else {
            this.move();
        }
    }

    bazmanal() {
        var norVandak = random(this.cho(1));
        var secondHalf = random(this.cho(3));
        if (norVandak && secondHalf) {
            wolves.push(new Wolf(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.energy = 100;
        }
        var norVandak = random(this.cho(0));
         if (norVandak && secondHalf) {
            wolves.push(new Wolf(norVandak[0], norVandak[1]));
            matrix[norVandak[1]][norVandak[0]] = 3;
            this.energy = 25;
        }
    }

    die() {
        for (var i in wolves) {
            if (wolves[i].x == this.x && wolves[i].y == this.y) {
                if(this.svaboda == 1){
                    var norGrass = new Grass(wolves[i].y, wolves[i].x);
                    grasses.push(norGrass);
                    matrix[wolves[i].y][wolves[i].x] = 1;
                }
                else{
                    matrix[wolves[i].y][wolves[i].x] = 0;
                }
                wolves.splice(i, 1);
            }
        }
    }
}