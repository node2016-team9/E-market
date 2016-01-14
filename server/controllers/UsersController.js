var encryption = require('../utilities/encryption'),
    services = require('../services'),
    moment = require('moment');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register', {currentUser: req.user})
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;
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
        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                services.products.getProductsByIdArray(req.user.postedProducts)
                    .then(function (userProducts) {
                        for (var i = 0; i < userProducts.length; i += 1) {
                            var dateFromProduct = userProducts[i].postedDate;
                            var date = moment(new Date(dateFromProduct));

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

                        res.render(CONTROLLER_NAME + '/profile', {
                            currentUser: req.user,
                            currentUserProducts: userProducts,
                            categories: categories
                        });
                    });
            })
    },
    getOrders: function (req, res, next) {
        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                services.orders.getUserOrdersByUsername(req.user.username)
                    .then(function (orders) {
                        res.render('users/orders.jade', {
                            categories: categories,
                            currentUser: req.user,
                            userOrders: orders
                        });
                    }, function (err) {
                        req.session.error = 'Could not load user orders';
                        res.redirect('/');
                        console.log(err);
                    });
            });
    },
    getInformation: function (req, res, next) {
        services.categories.getAll()
            .then(function (categories) {
                res.render(CONTROLLER_NAME + '/information', {currentUser: req.user, categories: categories})
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
    },
    postInformation: function (req, res, next) {
        var newUserData = {};

        if (req.body.password.length > 0) {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
        }

        if (req.body.firstName.length > 0) {
            newUserData.firstName = req.body.firstName;
        }

        if (req.body.lastName.length > 0) {
            newUserData.lastName = req.body.lastName;
        }

        if (req.body.email.length > 0) {
            newUserData.email = req.body.email;
        }

        if (req.body.phoneNumber.length > 0) {
            newUserData.phoneNumber = req.body.phoneNumber;
        }

        if (req.body.avatarUrl.length > 0) {
            newUserData.avatar = req.body.avatarUrl;
        }

        services.users.update(req.user.username, newUserData)
            .then(function () {
                res.redirect('/profile');
            }, function (err) {
                req.session.error = 'Could not update your information';
                res.redirect('/profile/information');
                console.log(err);
            });
    }
};