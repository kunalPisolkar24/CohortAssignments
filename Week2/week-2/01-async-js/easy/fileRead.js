const fs = require('fs');

// Synchronous File Read
function fileReadSync() {
    console.time('Synchronous File Read');
    try {
        const data = fs.readFileSync('./file.txt', 'utf8');
        console.log("File content (Sync):", data);
    } catch (err) {
        console.error(err);
    }
    console.timeEnd('Synchronous File Read');
}

// Asynchronous File Read
function fileReadAsync(callback) {
    console.time('Asynchronous File Read');
    fs.readFile('./file.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File content (Async):", data);
        console.timeEnd('Asynchronous File Read');
        if (callback) callback();
    });
}

// Lengthy Operation
function someLengthyOperation() {
    console.time('Lengthy Operation');
    for (let i = 0; i < 1000000000; i++) {
        let j = i * 2;
    }
    console.timeEnd('Lengthy Operation');
}

// Measure Execution Time
function measureExecutionTime() {
    someLengthyOperation();

    fileReadSync();
    console.log("\n");
    // Ensure the async function completes before finishing measurement
    fileReadAsync(() => {
        console.log('Finished measuring async operation.');
    });
}

measureExecutionTime();
