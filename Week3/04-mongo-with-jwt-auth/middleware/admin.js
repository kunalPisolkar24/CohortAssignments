const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const words = token.split(' ');
  const jwtToken = words[1];
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({ msg: 'Token is not valid' });
    }
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = adminMiddleware;