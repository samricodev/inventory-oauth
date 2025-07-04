function error(code, message, errorCode = 0) {
  return {
    status: 'error',
    code,
    message,
    errorCode
  };
}

function success(code, message, data = null) {
  return {
    status: 'success',
    code,
    message,
    data
  };
}

module.exports = {
  error,
  success
}