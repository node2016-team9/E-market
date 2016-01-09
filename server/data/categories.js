var Category = require('mongoose').model('Category');

module.exports = {
    getAll: function (callback) {
        Category.find({}, callback);
    },
    add: function (category, callback) {
        Category.create(category, callback);
    },
    getCurrentCategoryProducts: function (id, callback) {
        Category.find({_id: id}, callback);
    }
};
