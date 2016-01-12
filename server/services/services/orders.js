var orders = require('../../data/orders');

module.exports = {
    create: function (order) {
        var promise = new Promise(function (resolve, reject) {
            orders.add(order, function (err, order) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(order);
                }
            })

        });
        return promise;
    },
    getOrdersByProductId: function (productId) {

        var promise = new Promise(function (resolve, reject) {
            orders.getAllByProductId(productId, function (err, orders) {
                console.log(orders);
                if (err) {
                    reject(err);
                }
                else {

                    resolve(orders);
                }
            })

        });
        return promise;
    }
};