const User = require('../models/user');
const hash = require('../utils/hashPassword');
const bcrypt = require('bcryptjs');

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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // create a middleware to handle this logic
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'User logged',
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.log(error);
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
  deleteUser
}