

function sort(a, b){
    var lenA = a.toString().length;
    var lenB = b.toString().length;
    var numberA = a * Math.pow(10, lenB) + b;
    var numberB = b * Math.pow(10, lenA) + a;

    return numberB - numberA;
}

function findMaxNumber(nums){
    nums.sort(sort);
    return nums.join('');
}

console.log(findMaxNumber([12, 3, 4, 5, 6, 0, 7, 19231, 45]));