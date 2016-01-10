var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CategoryModel = require('./Category');


module.exports.init = function () {
    var productSchema = new mongoose.Schema({
        name: {type: String, require: true},
        price: {type: Number, require: true},
        imageUrl: {type: String},
        categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
        postedBy: {type: String, require: true}
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
            Category.find({}).exec(function (err, category) {
                User.find({}).exec(function (err, users) {
                    Product.create({
                        name: 'First Product',
                        price: 1400,
                        imageUrl: 'https://s-media-cache-ak0.pinimg.com/236x/ff/1a/cf/ff1acfa3a71f5d85f3f35de7e9b5bc12.jpg',
                        categoryId: category[0]._id,
                        postedBy: users[0].username

                    }, function (err, product) {
                        users[0].postedProducts.push(product._id);
                        category[0].products.push(product._id);

                        Category.update({_id: category[0]._id}, category[0], function (err, category) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('Products are added to some category');
                            }
                        });
                        User.update({_id: users[0]._id}, users[0], function (err, user) {
                            if (err) {
                                console.log('error in addind product to some user');
                            }
                            else {
                                console.log('Products are added to the user');
                            }
                        })
                    });
                    Product.create({
                        name: 'Second Product',
                        price: 1500,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[0]._id,
                        postedBy: users[0].username
                    });
                    Product.create({
                        name: 'Third Product',
                        price: 1600,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[0]._id,
                        postedBy: users[0].username
                    });
                    Product.create({
                        name: 'First Product',
                        price: 1400,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[0]._id,
                        postedBy: users[0].username
                    });
                    Product.create({
                        name: 'Second Product',
                        price: 1600,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[0]._id,
                        postedBy: users[0].username
                    });
                    Product.create({
                        name: 'Alex Product',
                        price: 1600,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[1]._id,
                        postedBy: users[1].username
                    });
                    Product.create({
                        name: 'First Product',
                        price: 1400,
                        imageUrl: 'http://www.queeniebridesmaid.co.uk/images/product/hot-style-purple-bridesmaid-dress-bnnaj0006-6647-3.jpg',
                        categoryId: category[1]._id,
                        postedBy: users[1].username
                    });
                    Product.create({
                        name: 'Second Product',
                        price: 1600,
                        imageUrl: 'neshto',
                        categoryId: category[1]._id,
                        postedBy: users[0].username
                    });
                })


            })

            console.log('Products added to database...');
        }
    });
};


