var router = require('express').Router(),
    auth = require('../auth'),
    controllers = require('../../controllers');


router
    .get('/', auth.isAuthenticated, controllers.users.getProfile)
    .get('/orders', auth.isAuthenticated, controllers.users.getOrders)
    .get('/information', auth.isAuthenticated, controllers.users.getInformation)
    .post('/information', auth.isAuthenticated, controllers.users.postInformation);


module.exports = function (app) {
    app.use('/profile', router);
};