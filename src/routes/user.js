const userController = require('../controllers/user');
const UserRouter = require('express').Router();

UserRouter.post('/register', [ userController.createUser ]);
UserRouter.post('/login', [ userController.loginUser]);
UserRouter.delete('/:id', [ userController.deleteUser ]);

module.exports = UserRouter;