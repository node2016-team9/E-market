var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CategoryModel = require('./Category');


module.exports.init = function () {
    var productSchema = new mongoose.Schema({
        name: {type: String, require: true},
        price: {type: Number, require: true},
        currentPrice: {type: Number, require: true},
        imageUrl: {type: String},
        description: {type: String},
        postedDate: {type: Date, default: Date.now},
        categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
        postedBy: {type: String, require: true},
        orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
    });

    productSchema.post('save', function (doc) {

        var Category = require('mongoose').model('Category');
        Category.findOne({'_id': doc.categoryId}).exec(function (err, category) {
            console.log(category);
            category.products.push(doc.id);
            Category.update({_id: category._id}, category, function (err, success) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Category updated with...waiting for user update " + doc.name + "!");
                console.log(doc);
                User.findOne({username: doc.postedBy}).exec(function (err, user) {
                    console.log(user);
                    user.postedProducts.push(doc.id);
                    User.update({_id: user._id}, user, function (err, success) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('User updated with produst' + doc.name);
                    })
                })
            });

        });

        console.log('%s has been saved', doc._id);
    });
    var Product = mongoose.model('Product', productSchema);
    var Category = require('mongoose').model('Category');
    var User = require('mongoose').model('User');

    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find products: ' + err);
            return;
        }

        if (collection.length === 0) {
            Category.find({}).exec(function (err, categories) {
                if (err) {
                    return;
                }
                User.find({}).exec(function (err, users) {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    for (var index = 0; index < 3; index++) {
                        Product.create({
                            name: 'Product' + index,
                            price: 1400,
                            imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/ff/1a/cf/ff1acfa3a71f5d85f3f35de7e9b5bc12.jpg',
                            categoryId: categories[index],
                            description: 'Some Description' + index,
                            postedBy: users[0].username,
                            currentPrice: 1400,
                            validUntil: Date.Now


                        }, function (err, product) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            categories[0].products.push(product);

                            Category.update({_id: categories[index]._id}, categories[index], function (err, category) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log('Products are added to some category');
                                }
                            });

                        });
                    }

                })

            })

            console.log('Products added to database...');
        }
    });
};
