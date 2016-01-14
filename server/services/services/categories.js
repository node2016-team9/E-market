var categories = require('../../data/categories');
module.exports = {
    getAll: function () {
        var promise = new Promise(function (resolve, reject) {
            categories.getAll(function (err, categories) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(categories);
                }
            })

        });
        return promise;
    },
    add: function (category) {
        var promise = new Promise(function (resolve, reject) {
            categories.add(category, function (err, category) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(category);
                }
            })
        });

        return promise;
    },
    getCategoryByName: function (name) {
        var promise = new Promise(function (resolve, reject) {
            categories.getCategoryByName(name, function (err, category) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(category);
                }
            })

        });
        return promise;
    },
    getCategoryById: function (id) {
        var promise = new Promise(function (resolve, reject) {
            categories.getCategoryById(id, function (err, category) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(category);
                }
            })

        });
        return promise;
    },
    update: function (id, category) {
        var promise = new Promise(function (resolve, reject) {
            categories.update(id, category, function (err, categories) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(categories);
                }
            });
        });

        return promise;
    },
    getProductsByCategoryId: function (id, sortBy, sortPrice, username, page) {
        var promise = new Promise(function (resolve, reject) {
            categories.getProductsByCategoryId(id, sortBy, sortPrice, username, page, function (err, category) {
                if (err) {
                    console.log('err');
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(category);
                }
            })
        });
        return promise;
    },
    getCountOfProductsbyCategoryId:function(id)
    {
        var promise = new Promise(function (resolve, reject) {
            categories.getCountOfProductsbyCategoryId(id, function (err, count) {
                if (err) {
                    console.log('err');
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(count);
                }
            })
        });
        return promise;
    },
    removeCategoryById: function (id) {
        var promise = new Promise(function (resolve, reject) {
            console.log(id);
            categories.remove(id, function (err, removedCount) {
                if (err) {
                    reject(err);
                } else {
                    resolve(removedCount);
                }
            });
        });

        return promise;
    }
}