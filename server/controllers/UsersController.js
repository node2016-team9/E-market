var encryption = require('../utilities/encryption');
var services = require('../services');

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
    }
};