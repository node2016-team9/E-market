var Product = require('mongoose').model('Product');
module.exports = {
    add: function (product, callback) {
        Product.create(product, callback);
    }

};
