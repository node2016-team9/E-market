var services = require('../services');

var CONTROLLER_NAME = 'categories';
module.exports = {
    getAll: function () {
        services.categories.getAll()
            .then(function (categories) {
                res.send(data);
            }, function (err) {
                res.status(404)
                    .send(err);
            })
    },
    add: function (req, res) {
        var newCategory = req.body;
        services.categories.add(newCategory)
            .then(function (category) {
                res.send(category);
            }, function (err) {
                console.log(err);
            });

    },
    getProductsByCategoryId: function (req, res) {

        var id = req.params.id;
        console.log(id);
        var sortBy = req.query.date || 'desc';
        var sortPrice = req.query.price || 'desc';
        var username = req.query.username || '';
        var page = req.query.page || 1;
        services.categories.getProductsByCategoryId(id, sortBy, sortPrice, username, page)
            .then(function (category) {
                return category;
            }).then(function (category) {
                services.categories.getAll()
                    .then(function (categories) {
                        res.render('category/products', {
                            products: category.products,
                            currentUser: req.user,
                            currentCategoryID: id,
                            categories: categories

                        });
                    }, function (err) {
                        console.log(err);
                    })


                console.log(err);
            });

    },
}