var services = require('../services');

var CONTROLLER_NAME = 'orders';

module.exports = {
    getProductOrders: function (req, res) {
        console.log('raboti');
        var productId = req.params.id;
        services.orders.getOrdersByProductId(productId)
            .then(function (product) {
                console.log('orders');
                console.log(product);
                services.categories.getAll()
                    .then(function (categories) {
                        res.render('orders/product-orders', {product: product, currentUser: req.user,categories: categories});
                    })
            })
    }

}