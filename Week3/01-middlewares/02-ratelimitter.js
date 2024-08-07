
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second


const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();

// Object to store the number of requests per user
let numberOfRequestsForUser = {};

// Clear the number of requests for each user every second
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

// Global middleware for rate limiting
app.use((req, res, next) => {
    const userId = req.header('user-id');

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required in the header' });
    }

    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 0;
    }

    numberOfRequestsForUser[userId]++;

    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).send('Too many requests');
    }

    next();
});

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;

