let fs = require('fs');

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').split(",").map(x => parseInt(x)).filter(x => !isNaN(x));
let part = process.argv[2];

function getData(one, two) {
    let input = inData.slice(0);
    input[1] = one;
    input[2] = two;
    for (let i = 0; i < input.length; i += 4) {
        let operation = input[i];
        if (operation === 1) input[input[i + 3]] = input[input[i + 2]] + input[input[i + 1]];
        if (operation === 2) input[input[i + 3]] = input[input[i + 2]] * input[input[i + 1]];
    }
    return input[0];
}

console.log("Part 1", getData(12, 2));

if (part === 'part2') {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let n = getData(i, j);
            if (n === 19690720) {
                console.log("Part 2", i, j, 100 * i + j)
            }
        }
    }
}

