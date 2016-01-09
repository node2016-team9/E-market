var categories = require('../data/categories');

var CONTROLLER_NAME = 'categories';
module.exports = {
    getAll: function (req, res, next) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log(data);
            }
            res.send(data);
        });

    },
    add: function (req, res) {
        var newCategory = req.body;
        categories.add(newCategory, function (err, category) {
            if (err) {
                console.log('Failed to add new category: ' + err);
                return;
            }
            console.log(category);
            res.send(category);
        });

    },
    getCurrentCategoryProducts: function (req, res) {
        var id = req.params.id;
        categories.getCurrentCategoryProducts(id, function (err, category) {
            if (err) {
                console.log('Error getting current category');
                return;
            }
            res.send(category);
        })
    }
}