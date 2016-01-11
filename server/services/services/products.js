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
    }
};