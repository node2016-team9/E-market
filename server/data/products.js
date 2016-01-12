var Product = require('mongoose').model('Product');
module.exports = {
    add: function (product, callback) {
        Product.create(product, callback);
    },
    getProductById: function (id, callback) {
        Product.findOne({_id: id}, callback);
    },
    getFirstNProducts: function (numberOfProducts, callback) {
        Product.find({})
            .limit(numberOfProducts)
            .exec(callback);
    },
    getProductsByIdArray: function (idArray, callback) {
        Product
            .find({})
            .where("_id")
            .in(idArray)
            .exec(callback);
    }
};
