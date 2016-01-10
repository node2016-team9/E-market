var categories = require('../data/categories'),
    products = require('../data/products');

var CONTROLLER_NAME = 'products';

module.exports = {
    add: function (req, res) {
        var newProduct = req.body;
        var category = req.params.id;
        var user = req.user;
        newProduct.postedBy = user.username;
        newProduct.categoryId = category;
        products.add(newProduct, function (err, product) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(category + 'category name');
                categories.getCategoryById(category, function (err, category) {
                    category[0].products.push(product.id);
                    categories.update(category[0]._id, category[0], function (err, category) {
                        if (err) {
                            console.log('Category update error');
                        }
                        else {
                            res.send(product);
                        }
                    });

                });
            }
        })

    },
    getProductsByCategoryId: function (req, res) {
        var id = req.params.id;
        products.getProductsByCategoryId(id, function (err, products) {
            categories.getAll(function (err, data) {
                if (err) {
                    console.log('error');
                }
                else {
                    console.log(data);
                }
                res.render('category/products', {
                    products: products,
                    categories: data,
                    currentUser: req.user,
                    currentCategoryID: id
                });
            });

        });

    },
    getAddProductForm: function (req, res) {
        console.log('fomraaa');
        res.render('products/add-product', {currentUser: req.user});
    }
}