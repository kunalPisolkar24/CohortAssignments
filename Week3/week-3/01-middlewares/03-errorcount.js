// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// Global error-handling middleware
app.use((err, req, res, next) => {
  if (err) {
    errorCount++;
    res.status(404).send('Not Found');
  } else {
    next();
  }
});

// Route handlers
app.get('/user', function(req, res, next) {
  try {
    throw new Error("User not found");
  } catch (err) {
    next(err);
  }
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// Error handler to catch any unhandled errors
app.use((err, req, res, next) => {
  errorCount++;
  res.status(404).send('Not Found');
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
