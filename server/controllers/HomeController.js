var categories = require('../data/categories');

var CONTROLLER_NAME = 'home';
module.exports = {
    getAllData: function (req, res, next) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                res.render('index', {categories: data, currentUser: req.user});
            }

        });

    }
}