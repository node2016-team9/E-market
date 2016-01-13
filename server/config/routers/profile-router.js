var router = require('express').Router(),
    controllers = require('../../controllers');


router
    .get('/', controllers.users.getProfile)
    .get('/orders', controllers.users.getOrders);


module.exports = function (app) {
    app.use('/profile', router);
};