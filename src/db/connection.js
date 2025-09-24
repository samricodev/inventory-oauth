const mongoose = require('mongoose');
const createAdminUser = require('../utils/createAdmin');

const connection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    await createAdminUser();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connection;
