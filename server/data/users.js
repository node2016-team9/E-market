var User = require('mongoose').model('User'),
    Product = require('mongoose').model('Product');

module.exports = {
    getAll: function (callback) {
        User.find({}, callback);
    },
    getUserProductsByUsername: function (username, callback) {
        User.findOne({username: username})
            .populate('postedProducts')
            .exec(function (err, done) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(done);
                    return callback(null, done);
                }
            });
    },
    add: function (user, callback) {
        User.create(user, callback);
    },
    update: function (username, user, callback) {
        User.update({ username: username }, user, callback);
    },
    getUserById: function (id, callback) {
        User.findOne({ _id: id }, callback);
    },
    getUserByUsername: function (username, callback) {
        User.findOne({ username: username }, callback);
    },
    removeUserByUsername: function (username, callback) {
        User.find({username: username}).remove(callback);
    }
};