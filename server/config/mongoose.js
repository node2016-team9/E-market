var mongoose = require('mongoose'),
    UserModel = require('../data/models/User'),
    CategoryModel = require('../data/models/Category'),
    ProductModel = require('../data/models/Product'),
    OrderModel = require('../data/models/Order');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });

    UserModel.init();
    CategoryModel.init();
    ProductModel.init();
    OrderModel.init();


};