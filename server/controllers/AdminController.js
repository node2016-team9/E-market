var categories = require('../data/categories');
var services = require('../services');

var CONTROLLER_NAME = 'admin';

module.exports = {
    getHome: function (req, res, next) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                res.render('admin/home', { categories: data });
            }
        });
    },
    getAddCategory: function (req, res, next) {
        res.render('admin/add-category.jade');
    },
    postAddCategory: function (req, res, next) {
        var category = {
            name: req.body.name
        };

        services.categories.add(category)
            .then(function (category) {
                res.redirect('/admin/home');
            }, function (err) {
                req.session.error = 'Category could not be added successfully: ' + err;
                res.redirect('/admin/categories/add');
            });
    },
    getEditCategory: function (req, res, next) {
        var editCategoryId = req.params.id;
        services.categories.getProductsByCategoryId(editCategoryId)
            .then(function (category) {
                return category;
            }, function (err) {
                console.log('Could not fetch the products by categoryId ' + editCategoryId + ': ' + err);
            })
            .then(function (category) {
                categories.getAll(function (err, categories) {
                    if (err) console.log('Could not fetch all categories in editCategory:' + err);
                    else {
                        res.render('admin/edit-category', { editCategory: category, categories: categories })
                    }
                })
            });
    },
    postEditCategory: function (req, res, next) {
        var newCategory = {
            name: req.body.name,
            id: req.params.id
        };

        services.categories.update(newCategory.id, newCategory).then(function (categories) {
            res.redirect('/admin/home');
        }, function (err) {
            req.session.error = 'Category could not be updated successfully: ' + err;
            res.redirect('/admin/home');
        })
    },
    deleteProduct: function (req, res, next) {
        var productId = req.params.id;
        services.products.deleteProductById(productId)
            .then(function (err) {
                if (err) {
                    req.session.error = 'Could not delete product: ' + err;
                }

                res.redirect('/admin/home');
            });
    }
};