var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');

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
        Category.findOne({_id: id}, callback);
    },
    update: function (id, category, callback) {
        Category.update({_id: id}, category, callback);
    },
    getProductsByCategoryId: function (id, sortBy, sortByPrice, username, page, callback) {
        console.log('>>>>>>>>>>>>');
        console.log(sortBy);
        console.log(username);
        console.log('>>>>>>>>>>>>');
        if (sortBy == 'desc') {
            var sort = -1;
        }
        else if (sortBy == 'asc') {
            sort = 1;
        }

        if (sortByPrice == 'desc') {
            var sortPrice = -1;
        }
        else if (sortByPrice == 'asc') {
            sortPrice = 1;
        }

        console.log(username);
        if (username != '') {
            console.log('username');
            console.log(username);
            console.log(page);

            Category.findOne({_id: id})
                .populate({
                    path: 'products',
                    match: {postedBy: username},
                    options: {limit: 6, skip: 6 * (page - 1), sort: {price: sortPrice, postedDate: -1}}
                })
                .exec(function (err, done) {
                    console.log(done);
                    if (err) {
                        callback(err);
                    }
                    else {
                        console.log(done);
                        return callback(null, done);
                    }
                })
        }
        else {
            Category.findOne({_id: id})
                .populate({
                    path: 'products',
                    options: {limit: 3, skip: 3 * (page - 1), sort: {price: sortPrice, postedDate: -1}}
                })
                .sort({postedDate: sort})
                .exec(function (err, done) {

                    if (err) {
                        callback(err);
                    }
                    else {
                        return callback(null, done);
                    }
                })
        }
    },
    getCountOfProductsbyCategoryId: function (id, callback) {
        Category.findOne({_id: id})
            .populate('products')
            .exec(function (err, done) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('couuuuuuuuuuuunt' + done.products.length);
                    return callback(null, done.products.length);
                }
            })
    }
};
