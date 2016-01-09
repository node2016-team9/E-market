var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: {type: String, require: true, unique: true},
        products: [{type: Schema.Types.ObjectId, ref: 'Products'}]
    });
    var Category = mongoose.model('Category', categorySchema);
};


