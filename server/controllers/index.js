var UsersController = require('./UsersController');
var CategoriesController = require('./CategoriesController');
var HomeController = require('./HomeController');
var ProductsController = require('./ProductsController');
var AdminController = require('./AdminController');
var OrdersController = require('./OrdersController');

module.exports = {
    users: UsersController,
    categories: CategoriesController,
    home: HomeController,
    products: ProductsController,
    admin: AdminController,
    orders: OrdersController
};