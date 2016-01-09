var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.init = function () {
    var productSchema = new mongoose.Schema({
        name: {type: String, require: true},
        price: {type: Number, require: true},
        imageUrl: {type: String},
        categoryId: {type: Schema.Types.ObjectId, ref: 'Category'}
    });

    var Product = mongoose.model('Product', productSchema);
};


