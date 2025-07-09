const response = require('../utils/response');
const User = require('../models/user');

function verifyUpdateUser(req, res, next) {
  const { id } = req.params;
  const { role } = req.body;

  const user = User.findById(id);

  if(!user){
    return res.status(404).json(response.error(404, 'User not found'));
  }

  if(role === 1){
    return res.status(400).json(response.error(400, 'You can not change your role'));
  }
  
  next();

}

module.exports = verifyUpdateUser;