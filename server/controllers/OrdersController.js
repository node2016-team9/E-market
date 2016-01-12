var services = require('../services');

var CONTROLLER_NAME = 'orders';

module.exports = {
    getProductOrders: function (req, res) {
        console.log('raboti');
        var productId = req.params.id;
        services.orders.getOrdersByProductId(productId)
            .then(function (orders) {
                res.render('orders/product-orders', {orders: orders, currentUser: req.user});
            })

    }

}