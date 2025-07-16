const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || 'mi_clave_super_secreta';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json(response.error(401, res.translate('Missing Authorization header')));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json(response.error(401, res.translate('Token not provided')));
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(response.error(401, res.translate('Invalid or expired token')));
  }
}

module.exports = authMiddleware;
