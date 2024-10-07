class Meditation {
    constructor(duration) {
        this.duration = duration;
    }

    start() {
        console.log('Start meditation');
        let count = this.duration;
        const intervalId = setInterval(() => {
            if (count > 0) {
                console.log(count);
                count--;
            } else {
                console.log('Jay Guru Dev');
                clearInterval(intervalId);
            }
        }, 1000);
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();