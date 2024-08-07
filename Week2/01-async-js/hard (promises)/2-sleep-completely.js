/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

async function sleep(milliseconds) {
    let res = await wait(milliseconds / 1000);
    return res;
}

module.exports = sleep;
