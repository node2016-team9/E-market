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
        services.categories.getProductsByCategoryId(id)
            .then(function (category) {
                res.render('category/products', {
                    products: category.products,
                    currentUser: req.user,
                    currentCategoryID: id
                });

            }, function (err) {
                console.log(err);
            });

    },
}