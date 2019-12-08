let fs = require('fs');

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split("").map(x => parseInt(x));

let layers = [];
let width = 25,
    height = 6;

for (let i = 0; i < inData.length; i += width * height) {
    let layer = inData.slice(i, i + (width * height))
    layers.push(layer)
}
/** part 1
 *
 * @type {{twos: *, ones: *, zeros: number, layer: *}}
 */
let pixels = layers.map(layer => {
    return {
        zeros: layer.filter(l => l === 0).length,
        ones: layer.filter(l => l === 1).length,
        twos: layer.filter(l => l === 2).length,
        layer
    }
}).sort((a, b) => a.zeros - b.zeros)[0];
//console.log("Part1: ", pixels.ones * pixels.twos);

/**
 * part 2
 * @type {*[]}
 */
let image = [];
for (let i = 0; i < width * height; i++) {
    image[i] = layers.reduce((acc, cur) => {
        if (acc < 2) return acc;
        return cur[i];
    }, 2)
}

let file = fs.createWriteStream('./result')
file.on('error', function(err) { console.log(err) });
for (let i = 0; i < image.length; i += width) {
    let data = image.slice(i, i + (width));
    data = data.map(d => d === 1 ? '|' : '.')
    file.write(data.join('') + '\n')
}
file.end();
