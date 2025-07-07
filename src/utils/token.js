const jwt = require('jsonwebtoken');

const TOKEN_SECRET_KEY = process.env;

function createToken(data, expiresIn = 0) {
  return new Promise((resolve, reject) => {
    if(data){
      jwt.sign(data, TOKEN_SECRET_KEY, { expiresIn, algorithm: 'HS256'}, (err, decoded) => {
        if(err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    } else {
      reject ( new Error('Error generating token'));
    }
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_SECRET_KEY, { algorithms: ['HS256']}, (err, decoded) => {
      if(err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {
  createToken,
  verifyToken
};
