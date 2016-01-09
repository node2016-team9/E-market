var Category = require('mongoose').model('Category');

module.exports = {
    getAll: function (callback) {
        Category.find({}, callback);
    },
    add: function (category, callback) {
        Category.create(category, callback);
    },
    getCategoryByName: function (name, callback) {
        Category.find({name: name}, callback);
    },
    getCategoryById: function (id, callback) {
        Category.find({_id: id}, callback);
    },
    update: function (id, category, callback) {
        Category.update({_id: id}, category, callback);
    }
};
