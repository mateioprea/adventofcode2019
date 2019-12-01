let fs = require('fs');

let input = fs.readFileSync(__dirname + '/input', 'utf-8').split("\n");
let part = process.argv[2];

let getRequiredFuel = (fuel) => {
    let requiredFuel = (Math.floor(fuel / 3) - 2);
    let sum = requiredFuel;
    /*
        If part 2 is passed, add the fuel until requiredFuel <= 0
        Otherwise just return the sum
     */
    if (part === 'part2') {
        while (requiredFuel > 0) {
            requiredFuel = (Math.floor(requiredFuel / 3) - 2)
            sum += (requiredFuel < 0 ? 0 : requiredFuel);
        }
    }
    return sum;
};

/**
 * Webstorm adds an extra \n so we need to check if the parsed input is a number first
 *
 * @type {number}
 */
let sum = input.map(x => parseInt(x)).filter(x => !isNaN(x)).reduce((acc, currentValue) => {
    let val = getRequiredFuel(currentValue);
    acc += val;
    return acc;
}, 0);
console.log(sum);
