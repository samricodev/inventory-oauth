const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

async function createAdminUser() {
  const existingAdmin = await User.findOne({ role: '1' });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = new User({
    name: 'Mr.',
    lastName: 'Robot',
    email: adminEmail,
    password: hashedPassword,
    role: '1',
  });

  await admin.save();
  console.log('✅ Admin user created successfully');
}

module.exports = createAdminUser;
