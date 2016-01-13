var services = require('../services');

var CONTROLLER_NAME = 'home';
module.exports = {
    getAllData: function (req, res, next) {
        services.categories.getAll()
            .then(function (data) {
                services.products.getFirstNProducts(10)
                    .then(function (products) {
                        res.render('index', {categories: data, currentUser: req.user, products: products});
                    }, function (err) {
                        console.log(err);
                    })


            }, function (err) {
                if (err) {
                    console.log('error');
                }
            });
    }

}