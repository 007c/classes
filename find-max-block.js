function findMaxBlock(width, height) {

    let min = Math.min(width, height);
    let max = Math.max(width, height);

    if (max % min === 0) {
        return min;
    }

    return findMaxBlock(min, max % min);
}

console.log(findMaxBlock(1680, 40));