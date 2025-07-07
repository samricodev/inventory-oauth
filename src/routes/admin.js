const adminController = require('../controllers/admin');
const AdminRouter = require('express').Router();

AdminRouter.get('/users', [ adminController.getUsers ]);
AdminRouter.get('/users/:id', [ adminController.getUser ]);

module.exports = AdminRouter;