var UsersController = require('./UsersController');
var CategoriesController = require('./CategoriesController');
var HomeController = require('./HomeController');

module.exports = {
    users: UsersController,
    categories: CategoriesController,
    home:HomeController
};