const User = require('../models/user');
const response = require('../utils/response')

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if(!users) return response.error(404, 'Users not found');
    return response.success(200, 'Users found success', users);
  } catch(error){
    response.error(500, error.message);
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.finById(req.params.id);
    if(!user) return response.error(404, 'User not found');
    response.success(200, 'User found', user);
  } catch(error){
    response.error(500, error.message);
  }
}

const createUser = async (req, res) => {
  try{
    const newUser = new User(req.body);
    await newUser.save();
    response.success(201, 'User created succesfully', newUser);
  } catch(error) {
    response.error(500, error.message);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser
}