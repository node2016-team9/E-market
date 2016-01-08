var User = require('mongoose').model('Category');

module.exports = {
    getAll: function (callback) {
        User.find({}, callback);
    }
};