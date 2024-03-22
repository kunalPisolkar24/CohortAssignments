
// Counter problem

function solve1() {
    let i = 30;

    let counter = setInterval(function () {
        console.log(i);
        if (i === 0) {
            clearInterval(counter);
        }
        i--;
    }, 1000)

}

// Time it takes between a setTimeout and the inner function

function timeTaken(func, delay) {
    let start = Date.now();
    setTimeout(function() {
        func();
        let end = Date.now();
        console.log("Time Taken: " + (end - start));
    }, delay);
}

timeTaken(function() {
    console.log("Hello");
}, 1000);

// Clock

function clock() {
    setInterval(function() {
        console.clear();
        let hour = new Date().getHours();
        let min = new Date().getMinutes();
        let sec = new Date().getSeconds();
        console.log(hour + ":" + min + ":" + sec);
    }, 1000);
}

clock();