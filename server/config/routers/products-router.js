var router = require('express').Router(),
    controllers = require('../../controllers');

router
    .get('/details/:id', controllers.products.getProductDetails)
    .post('/details/order', controllers.products.orderProduct)
    .get('/details/:id/orders', controllers.orders.getProductOrders);

module.exports = function (app) {
    app.use('/products', router);
};
