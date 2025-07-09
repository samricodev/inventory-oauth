const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

function createToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET_KEY);
}

module.exports = { createToken, verifyToken };
