const mongoose = require('mongoose');
const createAdminUser = require('./utils/createAdmin');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    require('./models/user');
    await createAdminUser();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connection;
