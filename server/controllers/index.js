var UsersController = require('./UsersController');
var CategoriesController = require('./CategoriesController');
var HomeController = require('./HomeController');
var ProductsController = require('./ProductsController');

module.exports = {
    users: UsersController,
    categories: CategoriesController,
    home: HomeController,
    products: ProductsController
};