var categories = require('../data/categories');

var CONTROLLER_NAME = 'categories';
module.exports = {
    getAll: function (req, res, next) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                res.send(data);
            }

        });

    },
    add: function (req, res) {
        var newCategory = req.body;
        categories.add(newCategory, function (err, category) {
            if (err) {
                console.log('Failed to add new category: ' + err);
                return;
            }
            res.send(category);
        });

    }
}