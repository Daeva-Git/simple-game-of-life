var socket = io.connect('http://localhost:3000');
matrix = [[]];
function get_matrix(new_matrix) {
    matrix = new_matrix;
}
socket.on("matrix", get_matrix);
function get_vars(new_vars) {
    grassColor = new_vars[0];
    sheepColor = new_vars[1];
    sheepColorF = new_vars[2];
    wolfColor = new_vars[3];
    wolfColorF = new_vars[4];
    eagleColor = new_vars[5];
    lakeColor = new_vars[6];
    pressedGrassColor = new_vars[7];
    upgradedGrassColor = new_vars[8];
    n = new_vars[9];
    side = new_vars[10];
}
socket.on("vars", get_vars);

var n = 30;
var side = 25;
function setup() {
    noStroke();
    frameRate(20);
    createCanvas(n * side + 1, n * side + 1);
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(grassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill(sheepColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2.5) {
                fill(sheepColorF);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(wolfColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3.5) {
                fill(wolfColorF);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill(eagleColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill(pressedGrassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill(lakeColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill(upgradedGrassColor);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 10 || matrix[y][x] == 11 || matrix[y][x] == 12) {
                fill('#A39CBD');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 20 || matrix[y][x] == 21 || matrix[y][x] == 22) {
                fill('#fffafa');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 9) {
                fill('gold');
                rect(x * side, y * side, side, side);
            }
            else {
                fill('#ffffcc');
                rect(x * side, y * side, side, side);
            }
        }
    }
}