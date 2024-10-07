const isPrime = (n) => {
    return new Promise((resolve, reject) => {
        if (n <= 1) {
            reject({ prime: false });
        }
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) {
                reject({ prime: false });
                return;
            }
        }
        resolve({ prime: true });
    });
};

(async () => {
    console.log('start');
    try {
        const result = await isPrime(7);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    console.log('end');
})();