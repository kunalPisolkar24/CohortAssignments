const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const newAdmin = await Admin.create({ username: username, password: password });
    res.json({ message: 'Admin created successfully', adminId: newAdmin._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await Admin.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  try {
    const newCourse = await Course.create({
      title: req.body.title,
      description: req.body.description,
      imageLink: req.body.imageLink,
      price: req.body.price,
    });
    res.json({ message: 'Course created successfully', courseId: newCourse._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const response = await Course.find({});
    res.json({ courses: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;