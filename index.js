const LedMatrix = require("node-rpi-rgb-led-matrix");
const width = 128,
    height = 32,
    Canvas = require('canvas'),
    canvas = new Canvas(width, height),
    ctx = canvas.getContext('2d');

const matrix = new LedMatrix(height, width/height);

ctx.fillStyle="rgba(255, 255, 255, 0.5)";
ctx.font = '13px Impact';
ctx.rotate(0.2);
ctx.fillText("Awesome", 5, 15);
ctx.rotate(-0.2);

function getColorFromPos(x, y, con) {
    let point = con.getImageData(x,y,1,1).data;
    let RGBA = { red: point[0], green: point[1], blue: point[2], alpha: point[3] };
    return [
        Math.floor(RGBA.red * (RGBA.alpha / 255)),
        Math.floor(RGBA.green * (RGBA.alpha / 255)),
        Math.floor(RGBA.blue * (RGBA.alpha / 255))
    ] //rgb
}

function draw(con) {
    matrix.clear();
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            matrix.setPixel(x, y, ...getColorFromPos(x, y, con));
        }
    }
}

draw(ctx);