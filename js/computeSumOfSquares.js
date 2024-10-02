
"use strict";

const computeSumOfSquares = (numbers) => {
    return numbers.map(num => num * num).reduce((acc, curr) => acc + curr, 0);
};

// Example usage:
console.log(computeSumOfSquares([1, 2, 3]));