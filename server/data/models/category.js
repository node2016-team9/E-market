var mongoose = require('mongoose');

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: {type: String, require: true, unique: true},
        products: [
            {
                name: {type: String, require: true},
                price: {type: Number, require: true},
                imageUrl: {type: String, required: true, unique: true}
            }
        ]
    });
    var Category = mongoose.model('Category', categorySchema);
};


