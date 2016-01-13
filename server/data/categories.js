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
        else {
            sort = 1;
        }
        if (sortByPrice == 'desc') {
            var sortPrice = -1;
        }
        else {
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
                    options: {limit: 6, skip: 6 * (page - 1), sort: {price: sortPrice, postedDate: sortBy}}
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
                    options: {limit: 6, skip: 6 * (page - 1), sort: {price: sortPrice, postedDate: sortBy}}
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
    }
};
