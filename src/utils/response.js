function isValidHttpCode(code) {
  return Number.isInteger(code) && code >= 100 && code < 600;
}

function error(code, message, errorCode = 0) {
  if (!isValidHttpCode(code)) {
    throw new Error(`Invalid HTTP status code for error: ${code}`);
  }
  if (typeof message !== 'string') {
    throw new Error('Error message must be a string');
  }

  return {
    status: 'error',
    code,
    message,
    errorCode: Number(errorCode) || 0
  };
}

function success(code, message, data = null) {
  if (!isValidHttpCode(code)) {
    throw new Error(`Invalid HTTP status code for success: ${code}`);
  }
  if (typeof message !== 'string') {
    throw new Error('Success message must be a string');
  }

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
};
