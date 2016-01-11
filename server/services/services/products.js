var products = require('../../data/products');

module.exports = {
    add: function (product) {
        var promise = new Promise(function (resolve, reject) {
            products.add(product, function (err, product) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(product);
                }
            })

        });
        return promise;
    },
    getProductById:function(id){
        var promise = new Promise(function (resolve, reject) {
            products.getProductById(id, function (err, product) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(product);
                }
            })

        });
        return promise;
    },
    deleteProductById: function (id) {
        var promise = new Promise(function (resolve, reject) {
            products.deleteProductById(id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        return promise;
    }
};