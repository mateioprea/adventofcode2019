let fs = require('fs');

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split("\n");
//can be done with bfs and trees. maybe some day :)
let d = {};
inData.map(orbit => {
    let [center, orbiter] = orbit.split(")");
    d[orbiter] = center;
});

function getData(cur, acc = 0) {
    return d[cur] ?  1 + getData(d[cur]) : acc;
}

let x = Object.keys(d).map(getData).reduce((acc, cur) => acc + cur);
console.log(x);

