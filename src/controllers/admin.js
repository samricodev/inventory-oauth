const User = require('../models/user');

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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body);
    if(!user) {
      return res.status(404).json({ message: 'User not found'});
    }
    res.status(200).json({ message: 'User updated'});

  } catch(error) {
    res.status(500).json({ message: error.message});
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser
}