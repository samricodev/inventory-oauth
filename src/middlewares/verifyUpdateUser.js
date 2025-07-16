const response = require('../utils/response');
const User = require('../models/user');

function verifyUpdateUser(req, res, next) {
  const { id } = req.params;
  const { role } = req.body;

  if (!id) {
    return res.status(400).json(response.error(400, res.translate('Id is required')));
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json(response.error(404, res.translate('User not found')));
      } else if (role !== 2) {
        return res.status(400).json(response.error(400, res.translate('You can not change your role')));
      }
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json(response.error(500, res.translate('Internal Server Error')));
    });
}

module.exports = verifyUpdateUser;