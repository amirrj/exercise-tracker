const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Token is required for access' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwt_secret'));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ msg: 'token is not valid' });
  }
};

module.exports = auth;
