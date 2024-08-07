const fs = require('fs');

function fileWriteSync() {
    console.time('Synchronous File Write');
    fs.writeFileSync('./file.txt', 'This file contains some text !');
    console.timeEnd('Synchronous File Write');
    console.log("File written successfully (Sync)");
}

function fileWriteAsync(callback) {
    console.time('Asynchronous File Write');
    fs.writeFile('./file.txt', 'This file contains some text !', function (err) {
        if (err) throw err;
        console.timeEnd('Asynchronous File Write');
        console.log("File written successfully (Async)");
        if (callback) callback();
    });
}

function someLengthyOperation() {
    for (let i = 0; i < 1000000000; i++) {
        let j = i * 2;
    }
}

function measureExecutionTime() {
    console.time('Lengthy Operation');
    someLengthyOperation();
    console.timeEnd('Lengthy Operation');
    
    fileWriteSync();
    
    console.log("\n");
    
    fileWriteAsync(() => {
        console.log('Finished measuring async operation.');
    });
}

measureExecutionTime();
