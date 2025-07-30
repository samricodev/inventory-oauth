const User = require('../models/user');
const response = require('../utils/response');

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const [users, toal] = await Promise.all([
      User.find()
        .skip(skip)
        .limit(parsedLimit),
      User.countDocuments()
    ]);
      
    const result = {
      users,
      total: toal,
      page: parsedPage,
      limit: parsedLimit
    };

    if (!users) return res.status(404).json(response.error(404, res.translate('Users not found')));
    res.status(200).json(response.success(200, res.translate('Users information obtained successfully'), result));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.finById(req.params.id);
    if (!user) return res.status(404).json(response.error(404, res.translate('User not found')));
    res.status(200).json(response.success(200, res.translate('User information obtainded successfulluy'), user));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body);
    if (!user) {
      return res.status(404).json(response.error(404, res.translate('User not found')));
    }
    res.status(200).json(response.success(4200, res.translate('User updated'), user));

  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json(response.error(404, res.translate('User not found')));
    }
    res.status(200).json(response.success(200, res.translate('User deleted successfully')));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
}