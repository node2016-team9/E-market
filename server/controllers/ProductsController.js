var services = require('../services');

var CONTROLLER_NAME = 'products';


var Product = require('mongoose').model('Product');
var Category = require('mongoose').model('Category');
var User = require('mongoose').model('User');
module.exports = {
    add: function (req, res) {
        var newProduct = req.body;
        var currentCategory = req.params.id;
        var user = req.user;
        newProduct.postedBy = user.username;
        newProduct.categoryId = currentCategory;
        services.products.add(newProduct).then(function (product) {

            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            services.categories.getCategoryById(currentCategory)
                .then(function (category) {
                    console.log('>>>>>>>>>>>>>>>>>>');
                    console.log(category);
                    console.log(currentCategory);
                    console.log('>>>>>>>>>>>>>>>>>>');
                    category.products.push(product.id);
                    services.categories.update(category._id, category)
                        .then(function (category) {
                            res.redirect('/');
                            res.send();

                        }, function (err) {
                            if (err) {
                                console.log('Category update error');
                            }
                        });
                }, function (err) {
                    req.status(404)
                        .send(err);
                });

        }, function (err) {
            req.status(404)
                .send(err);
        })

    },
    getAddProductForm: function (req, res) {
        console.log('fomraaa');
        res.render('products/add-product', {currentUser: req.user});
    }
}