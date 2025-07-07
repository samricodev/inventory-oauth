const userController = require('../controllers/user');
const verifyCredentials = require('../middlewares/verifyCredentials');
const UserRouter = require('express').Router();

UserRouter.post('/register', [ userController.createUser ]);
UserRouter.post('/login', [ 
    verifyCredentials,
    userController.loginUser
]);
UserRouter.get('/me/:id', [ userController.getUser ]);
UserRouter.delete('/:id', [ userController.deleteUser ]);

module.exports = UserRouter;