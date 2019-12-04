let fs = require('fs');

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split("\n");

getPositions = (wire) => {
    // use a set for part 1

    let panel = new Map();
    let position = {x: 0, y: 0};
    let steps = 0;
    wire.map(op => {
        let direction = op[0],
            distance = parseInt(op.split("").slice(1).join(""));
        return {
            direction,
            distance
        }
    }).map(d => {
        for (let i = 1; i <= d.distance; i++) {
            if (d.direction === "R") position.x += 1;
            if (d.direction === "L") position.x -= 1;
            if (d.direction === "U") position.y += 1;
            if (d.direction === "D") position.y -= 1;
            panel.set(`${position.x}, ${position.y}`, ++steps);
        }
    });
    return panel;
};
let wireOne = inData[0].split(","),
    wireTwo = inData[1].split(",");
let w1 = getPositions(wireOne);
let w2 = getPositions(wireTwo);

let x = [...w2].filter(([pos]) => w1.has(pos))
    .map(([pos, steps]) => {
        console.log(pos, steps, w1.get(pos))
        return w1.get(pos) + steps
    })
    .sort((a, b) => a - b);
console.log(x)
