const userController = require('../controllers/user');
const UserRouter = require('express').Router();

UserRouter.get('/', [ userController.getUsers ]);
UserRouter.get('/:id', [ userController.getUser ]);
UserRouter.post('/', [ userController.createUser ]);
UserRouter.delete('/:id', [ userController.deleteUser ]);

module.exports = UserRouter;