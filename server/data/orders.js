var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');

module.exports = {
    add: function (order, callback) {
        Order.create(order, callback);
    },
    getAllByProductId: function (id, callback) {
        Product.find({_id: id})
            .populate({
                path: 'orders',
                options: {limit: 10}
            })
            .exec(callback);
    }
};
