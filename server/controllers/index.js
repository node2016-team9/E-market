var UsersController = require('./UsersController');
var CategoriesController = require('./CategoriesController');
var HomeController = require('./HomeController');
var ProductsController = require('./ProductsController');
var OrdersController = require('./OrdersController');

module.exports = {
    users: UsersController,
    categories: CategoriesController,
    home: HomeController,
    products: ProductsController,
    orders: OrdersController
};