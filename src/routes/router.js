const router = require('express').Router();
const UserRouter = require('./user');

router.use('/users', UserRouter);

module.exports = router;