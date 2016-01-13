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
    },
    getOrdersByIdArray: function (idArray) {
        var userProducts = [];
        var promise = new Promise(function (resolve, reject) {

            console.log("Outside getProductsByIDArray");
            orders.getOrdersByIdArray(idArray, function (err, products) {
                if (err) {
                    reject(err);
                }
                else{
                    console.log("Result of getProductsByIDArray");
                    console.log(products);
                    resolve(products);
                }
            })
        });
        return promise;
    }
};