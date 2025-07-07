const bcrypt = require('bcryptjs');
const User = require('../models/user');

function verifyCredentials(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }

          res.locals.user = {
            id: user._id,
            email: user.email
          };

          next();
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Error comparing password' });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
}

module.exports = verifyCredentials;
