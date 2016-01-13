var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.init = function () {
    var orderSchema = new mongoose.Schema({
        orderedBy: {type: String, require: true},
        productId: {type: Schema.Types.ObjectId, ref: 'Product'},
        orderDate: {type: Date, default: Date.now}
    });

    var Order = mongoose.model('Order', orderSchema);

    orderSchema.post('save', function (doc) {
        console.log(doc.productId);
        var Product = require('mongoose').model('Product');
        var User = require('mongoose').model('User');
        Product.findOne({'_id': doc.productId}).exec(function (err, product) {
            product.orders.push(doc.id);
            Product.update({_id: product._id}, product, function (err, success) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Product updated with bid...waiting for user update " + doc + "!");

                User.findOne({username: doc.orderedBy}).exec(function (err, user) {

                    user.orders.push(product);
                    User.update({_id: user._id}, user, function (err, success) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('User updated with bid products' + product.name);
                    })
                })
            });

        });

        console.log('%s has been saved', doc._id);
    });

};
