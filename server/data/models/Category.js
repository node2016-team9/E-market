var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.init = function () {
    var categorySchema = new mongoose.Schema({
        name: {type: String, require: true, unique: true},
        products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
    });
    var Category = mongoose.model('Category', categorySchema);

    Category.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find categories: ' + err);
            return;
        }

        if (collection.length === 0) {

            Category.create({name: 'First Category'});
            Category.create({name: 'Second Category'});
            Category.create({name: 'Third Category'});
            Category.create({name: 'Fourth Category'});
            console.log('Categories added to database...');
        }
    });

    categorySchema.pre('remove', function (next) {
        this.model('Product').remove({ categoryId: this._id }, next);
    });
};