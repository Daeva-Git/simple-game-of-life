module.exports = class Creature {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.multiply = 0;
        this.sex = (this.z == Math.round(this.z)) ? "male" : "female";
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    cho(ch) {
        var found = [];
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
    bazmanal() {
        var secondHalf = random(this.cho(this.z - 0.5));
        if (this.sex == "female" && secondHalf) {
            if (random(this.cho(0))) {
                var norVandak = random(this.cho(0));
            }
            else if (random(this.cho(1))) {
                var norVandak = random(this.cho(1));
                for (var i in grasses) {
                    if (grasses[i].x == norVandak[0] && grasses[i].y == norVandak[1]) {
                        grasses.splice(i, 1);
                        break;
                    }
                }
            }
            if(norVandak) {
                if (this.z == 3.5) {
                    wolves.push(new Wolf(norVandak[0], norVandak[1]));
                    matrix[norVandak[1]][norVandak[0]] = (Math.round(Math.random()))/2 + 3;
                }
                else if (this.z == 2.5) {
                    sheeps.push(new Sheep(norVandak[0], norVandak[1]));
                    matrix[norVandak[1]][norVandak[0]] = (Math.round(Math.random()))/2 + 2;
                }
            }
        }
    }
}