const response = require('../utils/response');
const registerUtils = require('../utils/validations/generalValidations');

function verifyRegister(req, res, next) {
  const {
    name,
    lastName,
    email,
    password,
    role
  } = req.body;

  if (!registerUtils.isRequired(name)) {
    return res.status(400).json(response.error(400, 'Name is required'));
  }
  if (!registerUtils.isRequired(lastName)) {
    return res.status(400).json(response.error(400, 'LastName is required'));
  }
  if (!registerUtils.isRequired(email)) {
    return res.status(400).json(response.error(400, 'Email is required'));
  }
  if (!registerUtils.isRequired(password)) {
    return res.status(400).json(response.error(400, 'Password is required'));
  }
  if (!registerUtils.isRequired(role)) {
    return res.status(400).json(response.error(400, 'Role is required'));
  }

  if (!registerUtils.isName(name)) {
    return res.status(400).json(response.error(400, 'Name must have at least 3 characters'));
  }
  if (!registerUtils.isLastName(lastName)) {
    return res.status(400).json(response.error(400, 'LastName must have at least 4 characters'));
  }
  if (!registerUtils.isEmail(email)) {
    return res.status(400).json(response.error(400, 'Invalid email format'));
  }
  if (!registerUtils.isPassword(password)) {
    return res.status(400).json(response.error(400, 'Password must be 8-16 characters, with at least one uppercase letter, one lowercase letter, and one digit'));
  }
  if (!registerUtils.isRole(role)) {
    return res.status(400).json(response.error(400, 'Invalid role'));
  }
  if (role === 1) {
    return res.status(400).json(response.error(400, 'You cannot assign admin role'));
  }

  next();
}

module.exports = verifyRegister;
