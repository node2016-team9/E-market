
var router = require('express').Router(),
    controllers = require('../../controllers'),
    auth = require('../auth');

router
    .get('/home', controllers.admin.getHome)
    .get('/categories/add', controllers.admin.getAddCategory)
    .get('/categories/:id/edit', controllers.admin.getEditCategory)
    .get('/products/:id/delete', controllers.admin.deleteProduct)
    .get('/users/all', controllers.admin.getAllUsers)
    .get('/users/:username/edit', controllers.admin.getEditUser)
    .get('/categories/delete', controllers.admin.getDeleteCategory)
    .post('/users/:username/edit', controllers.admin.postEditUser)
    .post('/categories/add', controllers.admin.postAddCategory)
    .post('/categories/delete', controllers.admin.postDeleteCategory)
    .post('/categories/:id/edit', controllers.admin.postEditCategory);


module.exports = function (app) {
    app.use('/admin', auth.isInRole('admin'), router);
};