const adminController = require('../controllers/admin');
const AdminRouter = require('express').Router();

AdminRouter.get('/users', [ adminController.getUsers ]);
AdminRouter.get('/users/:id', [ adminController.getUser ]);
AdminRouter.put('/users/:id', [ adminController.updateUser ]);
AdminRouter.delete('/users/:id', [ adminController.deleteUser ]);

module.exports = AdminRouter;