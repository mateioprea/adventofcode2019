let fs = require('fs');

let input = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split("-").map(n => parseInt(n));
let part = process.argv[2];
let numberOfInputs = 0;
function checkRules(number) {
    let sortedNumber = number.toString().split("")
        .sort((a, b) => {
            return a > b;
        })
        .join("")
    if (part === 'part2') {
        return parseInt(sortedNumber) === number && /^((\d)\2(?!\2)\d*|\d*(\d)(?!\3)(\d)\4(?!\4)\d*)$/.test(sortedNumber);
    }
    return parseInt(sortedNumber) === number && /(.)\1+/.test(sortedNumber);
}

for (let i = input[0]; i < input[1]; i++ ) {
    checkRules(i) ? numberOfInputs++ : 0;
}

console.log(numberOfInputs);
