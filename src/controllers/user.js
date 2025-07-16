const config = require('config');
const User = require('../models/user');
const userUtils = require('../utils/user');
const { createToken } = require('../utils/token');
const response = require('../utils/response');
const tokenLoginExpires = config.get('tokenLoginExpires');

const createUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
    } = req.body;

    let passwordHashed = await userUtils.hashPassword(password);
    let idRole = 2;

    const newUser = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: passwordHashed,
      role: idRole
    });

    await newUser.save();
    res.status(201).json(response.success(201, res.translate('User created'), newUser));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(response.error(404, res.translate('User not found')));
    }

    const token = createToken(
      { id: user._id, email: user.email },
      tokenLoginExpires
    );

    res.status(200).json(response.success(
      200,
      res.translate('User logged successfully'),
      {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: token
      }
    ));
  } catch (error) {
    console.error(error);
    res.status(500).json(response.error(500, error.message));
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(response.error(400, res.translate('Id not found')));
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json(response.error(404, res.translate('User not found')));
    }
    return res.status(200).json(response.success(200, res.translate('User information successfully obtained', user)));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      lastName,
      email,
      password,
      role
    } = req.body;
 
    const hashPassword = await userUtils.hashPassword(password);

    const updatedUser = {
      name: name,
      lastName: lastName,
      email: email,
      password: hashPassword,
      role: role
    }

    const user = await User.findByIdAndUpdate(id, updatedUser);
    res.status(200).json(response.success(200, res.translate('User updated'), user));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json(response.error(404, res.translate('User not found')));
    res.status(200).json(response.success(200, res.translate('User deleted', user)));
  } catch (error) {
    res.status(500).json(response.error(500, error.message));
  }
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
}