const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET_KEY;
function createToken(data, expiresIn = 0) {
  return new Promise((resolve, reject) => {
     if (!secret) {
      return reject(new Error('TOKEN_SECRET_KEY is not defined'));
    }
    if(data){
      jwt.sign(data, secret, { expiresIn, algorithm: 'HS256'}, (err, decoded) => {
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
     if (!secret) {
      return reject(new Error('TOKEN_SECRET_KEY is not defined'));
    }
    jwt.verify(token, secret, { algorithms: ['HS256']}, (err, decoded) => {
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
