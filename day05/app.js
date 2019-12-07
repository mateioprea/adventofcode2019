let fs = require('fs');

let inData = fs.readFileSync(__dirname + '/input', 'utf-8').trim().split(",").map(x => parseInt(x));
//console.log(inData);

function interpretParameter(param) {
    if (param === 4) return param.toString().padStart(5, '0').split('').map((x, i) => i === 2 ? 1 : x).join('');
    if (param === 3) return param.toString().padStart(5, '0').split('').join('');
    //console.log(param);
    return param.toString().padStart(5, '0');
}

function getOperation(input) {
    let operation = parseInt(input.split('').slice(3, 5).join(''));
    let parameters = input.split('').slice(0, 3).join('');
    return {
        operation,
        parameters,
        increment: (operation === 3 || operation === 4) ? 2 : (operation === 99 ? 1 : 4)
    }
}

function getData(inVar) {
    let input = inData.slice(0);
    let incrementValue = 4;
    for (let i = 0; i < input.length; i += incrementValue) {
        let parameter = interpretParameter(input[i]);
        let op = getOperation(parameter);
        console.log(op);

        if (op.operation === 1) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            input[input[i + 3]] = (parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) + (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]]);
            incrementValue = op.increment;
        }

        if (op.operation === 2) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            input[input[i + 3]] = (parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) * (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]]);
            incrementValue = op.increment;
        }

        if (op.operation === 3) {
            input[input[i + 1]] = inVar;
            incrementValue = op.increment;
        }

        if (op.operation === 4) {
            console.log("DONE RES", i, input[input[i+1]]);
            incrementValue = op.increment;
        }

        if (op.operation === 5) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            if ((parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) !== 0 ) {
                i = (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]]);
                incrementValue = 0;
            } else {
                incrementValue = 3;
            }
            console.log(incrementValue, (parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) !== 0, (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]]))
        }

        if (op.operation === 6) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            if ((parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) === 0) {
                i = (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]]);
                incrementValue = 0;
            } else {
                incrementValue = 3;
            }
        }

        if (op.operation === 7) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            if ((parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) < (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]])) {
                input[input[i + 3]] = 1;
            } else {
                input[input[i + 3]] = 0;
            }
            incrementValue = 4;
        }

        if (op.operation === 8) {
            let [arg3, arg2, arg1] = op.parameters.split("");
            if ((parseInt(arg1) === 1 ? input[i + 1] : input[input[i + 1]]) === (parseInt(arg2) === 1 ? input[i + 2] : input[input[i + 2]])) {
                input[input[i + 3]] = 1;
            } else {
                input[input[i + 3]] = 0;
            }
            incrementValue = 4;
        }
        if(op.operation === 99){break;}
    }
    return inVar;
}

console.log("Part 1 Data", getData(5));

