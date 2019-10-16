const utils = require('./utils');

const arr = utils.makeIntegerArray(10, 0, 20);

console.log(arr);
const timesOfNum = [];

for(let i = 0; i < arr.length; i++) {
    if(!timesOfNum[arr[i]]) {
        timesOfNum[arr[i]] = 0;
    }

    timesOfNum[arr[i]]++;
}

let index = 0;
for(let i = 0; i < 21; i++) {
    if(!timesOfNum[i]) {
        continue;
    }
    for(let j = 0; j < timesOfNum[i]; j++) {
        arr[index++] = i;
    }
}

console.log(arr);