var router = require('express').Router(),
    controllers = require('../../controllers'),
    auth = require('../auth');

router
    .get('/', controllers.categories.getAll)
    .get('/:id/addProduct', controllers.products.getAddProductForm)
    .get('/:id', controllers.categories.getProductsByCategoryId)
    .post('/', controllers.categories.add)
    .post('/:id/addProduct', controllers.products.add);


module.exports = function (app) {
    app.use('/categories', router);
};
