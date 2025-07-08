const bycript = require('bcryptjs');

function hashPassword( password) {
  return new Promise((resolve, reject) => {
    bycript.genSalt(10, (errSalt, salt)=> {
      if (errSalt){
        reject(errSalt);
      } else {
        bycript.hash(password, salt, (errHash, hash) => {
          errHash ? reject(errHash) : resolve(hash); 
        })
      }
    });
  });
}

module.exports = {
  hashPassword
}