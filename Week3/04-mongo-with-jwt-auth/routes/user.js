const { Router } = require('express');
const router = Router();
const { User, Course } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const userMiddleware = require('../middleware/user');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
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

router.get('/courses', userMiddleware, async (req, res) => {
  try {
    const response = await Course.find({});
    res.json({ courses: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const user = await User.findOne({ username: req.username });
    if (user) {
      if (user.purchasedCourses.includes(courseId)) {
        return res.status(400).json({ message: 'Course already purchased' });
      }
      user.purchasedCourses.push(courseId);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username }).populate(
      'purchasedCourses'
    );
    res.json({ courses: user.purchasedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;