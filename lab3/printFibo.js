"use strict";

function printFibo(n, a, b) {
    let fiboSequence = [a, b];
    for (let i = 2; i < n; i++) {
        fiboSequence.push(fiboSequence[i - 1] + fiboSequence[i - 2]);
    }
    console.log(fiboSequence.slice(0, n).join(", "));
}

printFibo(6, 0, 1);