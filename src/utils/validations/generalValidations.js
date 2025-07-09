const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

function isRequired(value) {
  return value !== undefined && value !== null && value !== '';
}

function isName(value) {
  return typeof value === 'string' && value.trim().length >= 3;
}

function isLastName(value) {
  return typeof value === 'string' && value.trim().length >= 4;
}

function isEmail(value) {
  return typeof value === 'string' && regexEmail.test(value);
}

function isPassword(value) {
  return typeof value === 'string' && regexPassword.test(value);
}

function isRole(value) {
  return typeof value === 'number' && !isNaN(value) && value >= 1 && value <= 5;
}

module.exports = {
  isRequired,
  isName,
  isLastName,
  isEmail,
  isPassword,
  isRole
};
