var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CategoryModel = require('./Category');


module.exports.init = function () {
    var productSchema = new mongoose.Schema({
        name: {type: String, require: true},
        price: {type: Number, require: true},
        imageUrl: {type: String},
        categoryId: {type: Schema.Types.ObjectId, ref: 'Category'}
    });

    var Product = mongoose.model('Product', productSchema);
    var Category = require('mongoose').model('Category');
    Product.find({}).exec(function (err, collection) {//
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }

        if (collection.length === 0) {
            Category.find({}).exec(function (err, category) {
                Product.create({
                    name: 'First Product',
                    price: 1400,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[0]._id
                }, function (err, product) {
                    category[0].products.push(product._id);
                    console.log(category[0]);
                    Category.update({_id: category[0]._id}, category[0], function (err, category) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('Products are added to some category');
                        }
                    });
                });
                Product.create({
                    name: 'Second Product',
                    price: 1500,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[0]._id
                });
                Product.create({
                    name: 'Third Product',
                    price: 1600,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[0]._id
                });
                Product.create({
                    name: 'First Product',
                    price: 1400,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[0]._id
                });
                Product.create({
                    name: 'Second Product',
                    price: 1600,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[0]._id
                });
                Product.create({
                    name: 'Alex Product',
                    price: 1600,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[1]._id
                });
                Product.create({
                    name: 'First Product',
                    price: 1400,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[1]._id
                });
                Product.create({
                    name: 'Second Product',
                    price: 1600,
                    imgUrl: 'https://www.google.bg/search?q=img&espv=2&biw=1517&bih=714&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjYv82qpp3KAhWLiiwKHQ0jAjUQ_AUIBigB&dpr=0.9#imgrc=C2u-x63JfFtlPM%3A',
                    categoryId: category[1]._id
                });

            })

            console.log('Products added to database...');
        }
    });
};


