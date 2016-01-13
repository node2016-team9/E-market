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
    getProductById: function (id) {
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
    getFirstNProducts: function (numberOfProducts) {
        var promise = new Promise(function (resolve, reject) {
            products.getFirstNProducts(numberOfProducts, function (err, products) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(products);
                }
            })

        });
        return promise;
    },
    getProductsByIdArray: function (idArray) {
        var userProducts = [];
        var promise = new Promise(function (resolve, reject) {

            console.log("Outside getProductsByIDArray");
                products.getProductsByIdArray(idArray, function (err, products) {
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