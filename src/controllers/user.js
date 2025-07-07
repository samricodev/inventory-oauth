const User = require('../models/user');
const hash = require('../utils/hashPassword');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: 'Users not found' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.finById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
  getUsers,
  getUser,
  createUser,
  deleteUser
}