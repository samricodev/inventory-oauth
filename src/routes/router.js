const router = require('express').Router();
const UserRouter = require('./user');
const AdminRouter = require('./admin');

router.use('/users', UserRouter);
router.use('/admin', AdminRouter);

module.exports = router;