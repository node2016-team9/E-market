var mongoose = require('mongoose');

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: {type: String, require: '{PATH} is required', unique: true}
    });

    var Category = mongoose.model('Category', categorySchema);
};


