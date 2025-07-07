const config = require('config');
const User = require('../models/user');
const hash = require('../utils/hashPassword');
const { createToken } = require('../utils/token');
const tokenLoginExpires = config.get('tokenLoginExpires');

const createUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      role,
    } = req.body;

    if (role === 1) {
      return res.status(400).json({ message: 'You can not register with this role' });
    }

    let passwordHashed = await hash.hashPassword(password);
    let idRole = 2;

    const newUser = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: passwordHashed,
      role: idRole
    });

    await newUser.save();
    res.status(201).json({ message: 'User created succesfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const token = createToken({
      email: user.email
    }, tokenLoginExpires);
    
    res.status(200).json({
      message: 'User logged',
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: token
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json('Id not found');
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('User not found');
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await User.remove(user);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser
}