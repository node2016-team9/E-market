var passport = require('passport');

module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                // Render template with error popup here instead
                res.send({success: false})
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.send({success: true, user: user});
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            // Redirect to unauthorized page here
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(role) {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        }
    }
}