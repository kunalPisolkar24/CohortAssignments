
function countUp() {
    const maxCount = 4;
    let currentCount = 0;

    function incrementCount() {
        console.clear();
        if (currentCount === maxCount) {
            clearTimeout(timer);
            return;
        }

        console.log(currentCount);
        currentCount++;
        timer = setTimeout(incrementCount, 1000);
    }

    let timer = setTimeout(incrementCount, 1000);
}

countUp();
