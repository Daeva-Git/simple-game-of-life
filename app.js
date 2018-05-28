var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.redirect("public");
});
server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

Creature = require("./public/class.creature.js");
Grass = require("./public/class.grass.js");
Eagle = require("./public/class.eagle.js");
Lake = require("./public/class.lake.js");
Sheep = require("./public/class.sheep.js");
Wolf = require("./public/class.wolf.js");
UpgradedGrass = require("./public/class.upgradedgrass.js");
PressedGrass = require("./public/class.pressedgrass.js");
Downfall = require("./public/class.downfall.js");
God = require("./public/class.god.js");

matrix = []; //matrix
grasses = []; //lime grass
sheeps = []; //yellow
wolves = []; //grey
eagles = []; //brown
pressedGrasses = []; //lighter lime grass
lakes = []; //lightblue
upgradedGrasses = []; //green 
downfalls = []; //blue || white
gods = []; //gold
var grassesStat = [];
var wovlesStat = [];
var sheepsStat = [];

var rgbR = 0;
var rgbG = 0;
var rgbB = 0;
weather = null;

n = 30;
side = 25;
wolvesPercent = 0.8;
sheepsPercent = 10;

var sixteenStep = 0;
var jsondata = [];
var classes = [];

random = function (array) {
    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

percent = function (x) {
    var amount = Math.round((n * n * x) / (100));
    return amount;
}

function downFallsCreate(num) {
    for (var i = 0; i < percent(3); i++) {
        var randX = Math.floor(Math.random() * n);
        var randY = Math.floor(Math.random() * n);
        while (matrix[randY][randX] != 0 && matrix[randY][randX] != 1 && matrix[randY][randX] != 7) {
            randX = Math.floor(Math.random() * n);
            randY = Math.floor(Math.random() * n);
        }
        if (matrix[randY][randX] == 0) matrix[randY][randX] = num;
        else if (matrix[randY][randX] == 1) {
            matrix[randY][randX] = num + 1;
            for (var i in grasses) {
                if (grasses[i].x == randX && grasses[i].y == randY) {
                    grasses.splice(i, 1);
                }
            }
        }
        else if (matrix[randY][randX] == 7) {
            matrix[randY][randX] = num + 2;
            for (var i in grasses) {
                if (grasses[i].x == randX && grasses[i].y == randY) {
                    grasses.splice(i, 1);
                }
            }
        }
        downfalls.push(new Downfall(randX, randY));
    }
}

function colorClass(r, g, b, creature) {
    if (creature == true) {
        rgbR = Math.round(rgbR / 5);
        rgbG = 0;
        rgbB = Math.round(rgbB / 2);
    }
    if (r + rgbR > 255) r = 255;
    else if (r + rgbR < 0) r = 0;
    else r = r + rgbR;
    if (g + rgbG > 255) g = 255;
    else if (g + rgbG < 0) g = 0;
    else g = g + rgbG;
    if (b + rgbB > 255) b = 255;
    else if (b + rgbB < 0) B = 0;
    else b = b + rgbB;
    return 'rgb(' + (r) + ',' + (g) + ',' + (b) + ')';
}

function generateClasses(amount, type) {
    for (i = 0; i < amount; i++) {
        var randx = Math.round(Math.random() * (n - 1));
        var randy = Math.round(Math.random() * (n - 1));
        if (matrix[randy][randx] == 1 || matrix[randy][randx] == 0) {
            matrix[randy][randx] = type;
        }
        else {
            i--;
        }
    }
}

function generateLakes(amount) {
    amount = Math.round(amount / 7);
    for (var a = 0; a < amount; a++) {
        var x = Math.round(Math.random() * (n - 5));
        var y = Math.round(Math.random() * (n - 5));
        var directions = [
            [x, y],
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
        for (var i in directions) {
            var found = [];
            for (var i in directions) {
                var x = directions[i][0];
                var y = directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == 1 || matrix[y][x] == 0) {
                        found.push(directions[i]);
                        var d = Math.floor(Math.random() * 9);
                        if (d == 1) {
                            matrix[y][x] = 6;
                        }
                    }
                }
            }
        }
    }
}

function weatherColor() {
    var grassColor = colorClass(50, 205, 50, false);
    var sheepColor = colorClass(205, 133, 63, true);
    var sheepColorF = colorClass(244, 144, 96, true);
    var wolfColor = colorClass(150, 150, 150, true);
    var wolfColorF = colorClass(128, 128, 128, true);
    var eagleColor = colorClass(165, 42, 42, true);
    var lakeColor = colorClass(32, 178, 170, false);
    var pressedGrassColor = colorClass(152, 251, 152, false);
    var upgradedGrassColor = colorClass(60, 180, 60, false);
    var sendingArray = [];
    sendingArray.push(grassColor, sheepColor, sheepColorF, wolfColor, wolfColorF, eagleColor, lakeColor, pressedGrassColor, upgradedGrassColor, n, side);
    return sendingArray;
}
setInterval(function () {
    if (weather == null) {
        rgbR = 20;
        rgbG = 20;
        rgbB = 70;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Winter";
    }
    else if (weather == "Winter") {
        rgbR = 40;
        rgbG = 10;
        rgbB = 10;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Spring";
    }
    else if (weather == "Spring") {
        rgbR = 70;
        rgbG = 0;
        rgbB = 0;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Summer";
    }
    else if (weather == "Summer") {
        rgbR = 40;
        rgbG = 10;
        rgbB = 10;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Autumn";
    }
    else if (weather == "Autumn") {
        rgbR = 20;
        rgbG = 20;
        rgbB = 70;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Winter";
    }
    else if (weather == "Winter") {
        rgbR = 0;
        rgbG = 70;
        rgbB = 0;
        var sendingArray = weatherColor();
        io.sockets.emit('vars', sendingArray);
        weather = "Spring";
    }
}, 4000);
function diagram() {
    fs.readFile('diagram.json', 'utf8', function (err, data) {
        if (err) throw err;
        var parData = JSON.parse(data);

        var grassesLength = Object.keys(parData.grassesStat).length;
        var wolvesLength = Object.keys(parData.wolvesStat).length;
        var sheepsLength = Object.keys(parData.sheepsStat).length;

        var grassesObj = {};
        grassesObj[++grassesLength] = grasses.length;
        parData.grassesStat.push(grassesObj);

        var wolvesObj = {};
        wolvesObj[++wolvesLength] = wolves.length;
        parData.wolvesStat.push(wolvesObj);

        var sheepsObj = {};
        sheepsObj[++sheepsLength] = sheeps.length;
        parData.sheepsStat.push(sheepsObj);

        fs.writeFile('diagram.json', JSON.stringify(parData), function (err) {
            if (err) throw err;
            console.log('Data is saved!');
        });

        io.emit('diagram', parData);
    });
}
io.on('connection', function (socket) {
    var sendingArray = weatherColor();
    io.sockets.emit('vars', sendingArray);
    for (var y = 0; y < n; y++) {
        var arr = [];
        for (var x = 0; x < n; x++) {
            arr[x] = Math.floor(Math.random() * 2);
        }
        matrix[y] = arr;
    }
    //two eagles in the corners
    matrix[0][0] = 4;
    matrix[0][n - 1] = 4;
    var center = Math.floor(n / 2);
    matrix[center][center] = 9;  //The God

    generateClasses(percent(sheepsPercent), 2); //ships
    generateClasses(percent(wolvesPercent), 3); //wolves
    generateLakes(percent(4)); //lakes
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grasses.push(new Grass(x, y));
            }
            else if (matrix[y][x] == 2) {
                var z = (Math.round(Math.random())) / 2;
                sheeps.push(new Sheep(x, y, z));
                matrix[y][x] += z;
            }
            else if (matrix[y][x] == 3) {
                var z = (Math.round(Math.random())) / 2;
                wolves.push(new Wolf(x, y, z));
                matrix[y][x] += z;
            }
            else if (matrix[y][x] == 4) {
                eagles.push(new Eagle(x, y));
            }
            else if (matrix[y][x] == 5) {
                pressedGrasses.push(new PressedGrass(x, y));
            }
            else if (matrix[y][x] == 6) {
                lakes.push(new Lake(x, y));
            }
            else if (matrix[y][x] == 7) {
                upgradedGrasses.push(new UpgradedGrass(x, y));
            }
            else if (matrix[y][x] == 9) {
                gods.push(new God(x, y));
            }
            else if (matrix[y][x] == 10 || matrix[y][x] == 11 || matrix[y][x] == 12 || matrix[y][x] == 20 || matrix[y][x] == 21 || matrix[y][x] == 22) {
                downfalls.push(new Downfall(x, y));
            }
        }
    } 
    diagram();
    io.sockets.emit('matrix', matrix);
});
var setInter = 800;
function drawInServer() {
    if (weather == 'Spring') {
        setinter = setInter - 500;
    }
    if (weather == 'Summer') {
        setInter = setInter + 200;
    }
    if (weather == 'Autumn') {
        setInter = setInter - 200;
        downFallsCreate(10);
    }
    if (weather == 'Winter') {
        setInter = setInter + 500;
        downFallsCreate(20);
    }
    for (var i in downfalls) {
        downfalls[i].live(i);
    }
    if (weather != 'Winter') {
        for (var i in grasses) {
            grasses[i].bazmanal();
        }
        for (var i in pressedGrasses) {
            pressedGrasses[i].live(i);
        }
        for (var i in lakes) {
            lakes[i].live();
        }
        for (var i in upgradedGrasses) {
            upgradedGrasses[i].bazmanal(i);
        }
    }
    if (eagles[0]) eagles[0].utel(1);
    if (eagles[1]) eagles[1].utel(2);
    if (wolves.length <= 2) {
        if (gods[0]) gods[0].createWolf();
    }
    else if (sheeps.length <= 10) {
        if (gods[0]) gods[0].createSheep();
    }
    else if (grasses.length <= 10) {
        if (gods[0]) gods[0].createGrass();
    }
    for (var i in sheeps) {
        if (sheeps[i].energy >= 6) {
            if (weather != 'Winter') sheeps[i].bazmanal();
            sheeps[i].energy = 3;
        }
        else if (sheeps[i].energy <= 0) {
            sheeps[i].die();
        }
        else {
            sheeps[i].utel();
        }
    }
    for (var i in wolves) {
        if (wolves[i].energy >= 50) {
            if (weather != 'Winter') wolves[i].bazmanal();
            wolves[i].energy = 15;
        }
        else if (wolves[i].energy <= 0) {
            wolves[i].die();
        }
        if (wolves[i] && wolves[i].energy <= 80) wolves[i].utel();
    } 
    if (sixteenStep == 60) {
        diagram();
        sixteenStep = 0;
    }
    else {
        sixteenStep++;
    }
    io.sockets.emit('matrix', matrix);
}
setInterval(drawInServer, setInter);