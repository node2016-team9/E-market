var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');

module.exports = {
    add: function (order, callback) {
        Order.create(order, callback);
    },
    getAllByProductId: function (id, callback) {
        Product.findOne({_id: id})
            .populate({
                path: 'orders',
                options: {limit: 10}
            })
            .exec(callback);
    },
    getOrdersByIdArray: function (idArray, callback) {
        Product
            .find({})
            .where("_id")
            .in(idArray)
            .exec(callback);
    },
    getUserOrdersByUsername: function (username, callback) {
        Order.find({ orderedBy: username })
            .populate('productId')
            .exec(callback);
    }
};
