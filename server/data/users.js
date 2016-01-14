var User = require('mongoose').model('User');

module.exports = {
    getAll: function (callback) {
        User.find({}, callback);
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