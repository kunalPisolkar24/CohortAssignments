const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

// Middleware
app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

// Error Handling Middleware (Add this!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});