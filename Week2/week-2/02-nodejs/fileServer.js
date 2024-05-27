/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filesDirectory = path.join(__dirname, 'files');

// Endpoint to list all files in the './files' directory
app.get('/files', (req, res) => {
    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read files directory' });
        }
        res.status(200).json(files);
    });
});

// Endpoint to get the content of a specific file
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(filesDirectory, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('File not found');
            }
            return res.status(500).send('Error reading file');
        }
        res.status(200).send(data);
    });
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
