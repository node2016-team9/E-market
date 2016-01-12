var encryption = require('../utilities/encryption');
var services = require('../services');
var moment = require('moment');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register', {currentUser: req.user})
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;
        console.log(newUserData);
        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            services.users.create(newUserData)
                .then(function (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            res.status(400);
                            return res.send({reason: err.toString()}); // TODO
                        }
                        else {
                            res.redirect('/');
                        }
                    })
                }, function (err) {
                    req.session.error = 'Failed to register new user';
                    res.redirect('/register');
                    console.log('Failed to register new user: ' + err);
                    return;
                });
        }
    },
    getLogin: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    },
    getProfile: function (req, res, next) {

        services.products.getProductsByIdArray(req.user.postedProducts)
            .then(function (userProducts) {

                console.log("BeforeFor");
                console.log(userProducts);
                for (var i = 0; i < userProducts.length; i += 1) {
                    console.log(i);
                    console.log(userProducts[i].postedDate);
                    var dateFromProduct = userProducts[i].postedDate;
                    var date = moment(new Date(dateFromProduct));
                    console.log(date.format("LL"));

                    userProducts[i] = {
                        price: userProducts[i].price,
                        postedDate: date.format("LL"),
                        postedBy: userProducts[i].postedBy,
                        description: userProducts[i].description,
                        imageUrl: userProducts[i].imageUrl,
                        name: userProducts[i].name,
                        _id: userProducts[i]._id,
                        orders: userProducts[i].orders,
                        __v: userProducts[i].__v,
                        categoryId: userProducts[i].categoryId
                    };

                }
                console.log("AfterFor");

                console.log(userProducts[0]);
                res.render(CONTROLLER_NAME + '/profile', {
                    currentUser: req.user,
                    currentUserProducts: userProducts
                });
            });
    }
};