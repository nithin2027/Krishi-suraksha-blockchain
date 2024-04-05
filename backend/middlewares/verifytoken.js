const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ statusCode: 403, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ statusCode: 401, message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
