var router = require('express').Router(),
    controllers = require('../../controllers'),
    auth = require('../auth');


router
    .get('/details/:id', controllers.products.getProductDetails)
    .get('/details/:id/orders', controllers.orders.getProductOrders)
    .post('/details/order', controllers.products.orderProduct);


module.exports = function (app) {
    app.use('/products', auth.isAuthenticated, router);
};
