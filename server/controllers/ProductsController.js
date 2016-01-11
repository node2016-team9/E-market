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
            res.redirect('/');
        }, function (err) {
            req.status(404)
                .send(err);
        })

    },
    getAddProductForm: function (req, res) {
        services.categories.getAll()
            .then(function (categories) {
                res.render('products/add-product', {currentUser: req.user, categories: categories});
            });

    },
    getProductDetails: function (req, res) {
        services.products.getProductById(req.params.id)
            .then(function (product) {
                services.categories.getAll()
                    .then(function (categories) {
                        res.render('products/product-details', {
                            product: product,
                            currentUser: req.user,
                            categories: categories
                        })
                    }, function (err) {
                        console.log(err);
                    });
            }, function (err) {
                res.status(404)
                    .send(err);
            });
    }
}