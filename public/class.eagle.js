var Creature = require("./class.creature.js");
module.exports = class Eagle extends Creature {
    constructor(x, y) {
        super(x, y)
        this.directions = [];
    }
    cordinates() {
        if (this.b == 2) {
            for (var i = n - 1; i >= 0; i--) {
                var d = [];
                d.push(this.y + i, this.x - i);
                this.directions.push(d);
            }
        }
        if (this.b == 1) {
            for (var i = 0; i <= n - 1; i++) {
                var d = [];
                d.push(this.y + i, this.x + i);
                this.directions.push(d);
            }
        }
    }
    cho(ch) {
        this.cordinates();
        return super.cho(ch);
    }

    utel(s) {
        this.b = s;
        if (wolves.length >= percent(wolvesPercent - wolvesPercent / 5)) {
            var norVandak = random(this.cho(3));
        }
        if (sheeps.length >= percent(sheepsPercent - sheepsPercent / 5)) {
            var norVandak2 = random(this.cho(2));
        }
        if (norVandak) {
            matrix[norVandak[1]][norVandak[0]] = 4;
            matrix[this.y][this.x] = 0;
            for (var i in wolves) {
                if (wolves[i].x == norVandak[0] && wolves[i].y == norVandak[1]) {
                    wolves.splice(i, 1);
                    break;
                }
            }
            this.x = norVandak[0];
            this.y = norVandak[1];
        }
        else if (norVandak2) {
            matrix[norVandak2[1]][norVandak2[0]] = 4;
            matrix[this.y][this.x] = 0;
            for (var i in sheeps) {
                if (sheeps[i].x == norVandak2[0] && sheeps[i].y == norVandak2[1]) {
                    sheeps.splice(i, 1);
                    break;
                }
            }
            this.x = norVandak2[0];
            this.y = norVandak2[1];
        }
    }
}