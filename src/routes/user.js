const userController = require('../controllers/user');
const verifyCredentials = require('../middlewares/verifyCredentials');
const verifyUpdateUser = require('../middlewares/verifyUpdateUser');
const verifyToken = require('../middlewares/verifyToken');
const UserRouter = require('express').Router();

UserRouter.post('/register', [ 
    userController.createUser 
]);
UserRouter.post('/login', [ 
    verifyCredentials,
    userController.loginUser
]);
UserRouter.get('/me/:id', [ 
    verifyToken,
    userController.getUser 
]);
UserRouter.put('/:id', [
    verifyUpdateUser, 
    verifyToken,
    userController.updateUser 
]);
UserRouter.delete('/:id', [ 
    verifyToken,
    userController.deleteUser 
]);

module.exports = UserRouter;