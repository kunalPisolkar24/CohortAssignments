const fs = require('fs');

let cleanedData;
function fileCleanerSync() {
    try {
        const data = fs.readFileSync('./file.txt', 'utf8');
        cleanedData = data.toString().split(/\s{2,}/).join(" ");
        console.log(cleanedData); 
    } catch (err) {
        console.error(err);
    }
}

fileCleanerSync();

function fileWrite() {
    fs.writeFileSync('./file.txt', cleanedData);
    console.log("File written successfully");
}

fileWrite();
