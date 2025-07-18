const bcrypt = require('bcryptjs');
const User = require('../models/user');
const response = require('../utils/response');

function verifyCredentials(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json(response.error(404, res.translate('User not registered')));
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json(response.error(400, res.translate('Invalid credentials' )));
          }

          res.locals.user = {
            id: user._id,
            email: user.email
          };

          next();
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json(response.error(500, res.translate('Error comparing password' )));
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(response.error(500, res.translate('Internal server error')));
    });
}

module.exports = verifyCredentials;
