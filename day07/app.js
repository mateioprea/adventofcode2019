let fs = require('fs');
let intcode = require('./../day05/app');

function perm(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if(!rest.length) {
            ret.push([xs[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}
let arr = [0, 1, 2, 3, 4];

//part 2
//arr = [5, 6, 7, 8, 9];

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split(",").map(x => parseInt(x));
//console.log(inData);
let permutations = perm(arr);
let th = [];

for (let i = 0; i < permutations.length; i++) {
    let a = intcode([permutations[i][0], 0], inData);
    let b = intcode([permutations[i][1], a], inData);
    let c = intcode([permutations[i][2], b], inData);
    let d = intcode([permutations[i][3], c], inData);
    let e = intcode([permutations[i][4], d], inData);
    th.push(e);
}
console.log(th.sort((a, b) => b - a)[0]);
