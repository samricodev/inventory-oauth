const User = require('../models/user');
const response = require('../utils/response');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json(response.error(404, 'Users not found'));
    res.status(200).json(response.success(200, 'Users information obtained successfully', users));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.finById(req.params.id);
    if (!user) return res.status(404).json(response.error(404, 'User not found'));
    res.status(200).json(response.success(200, 'User information obtainded successfulluy', user));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body);
    if(!user) {
      return res.status(404).json(response.error(404, 'User not found'));
    }
    res.status(200).json(response.success(4200, 'User updated', user));

  } catch(error) {
    res.status(500).json(response.error(500, error.message));
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser
}