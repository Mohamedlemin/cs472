"use strict";

const printOddNumbersOnly = (numbers) => {
    numbers.filter(num => num % 2 !== 0).forEach(oddNum => console.log(oddNum));
};


printOddNumbersOnly([1, 2, 3, 4, 5]); 