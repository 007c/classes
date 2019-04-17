

function sort(a, b){
    var lenA = a.toString().length;
    var lenB = b.toString().length;
    var numberA = a * Math.pow(10, lenB) + b;
    var numberB = b * Math.pow(10, lenA) + a;

    return numberA - numberB;
}

function findMaxNumber(nums){
    nums.sort(sort);
    return nums.join('');
}

console.log(findMaxNumber([3,2,1,4,5]));