var router = require('express').Router(),
    controllers = require('../../controllers');

router
    .get('/', controllers.categories.getAll)
    .post('/', controllers.categories.add)
    .get('/:id/addProduct', controllers.products.getAddProductForm)
    .post('/:id/addProduct', controllers.products.add)
    .get('/:id', controllers.categories.getProductsByCategoryId);

module.exports = function (app) {
    app.use('/categories', router);
}
