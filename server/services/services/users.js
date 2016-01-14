var users = require('../../data/users');

module.exports = {
    create: function (user) {
        var promise = new Promise(function (resolve, reject) {
            users.add(user, function (err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            })

        });
        return promise;
    },
    update: function (id, user) {
        var promise = new Promise(function (resolve, reject) {
            users.update(id, user, function (err, done) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(done);
                }
            })
        });
        return promise;
    },
    getUserByUsername: function (username) {
        var promise = new Promise(function (resolve, reject) {
            users.getUserByUsername(username, function (err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            })

        });
        return promise;
    },
    getUserById: function (id) {
        var promise = new Promise(function (resolve, reject) {
            users.getUserById(id, function (err, user) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
            })

        });
        return promise;
    },
    getRoles: function () {
        // Magic here
        return ['admin', 'standard user'];
    },
    removeUserByUsername: function (username) {
        var promise = new Promise(function (resolve, reject) {
            users.removeUserByUsername(username, function (err, removeCount) {
                if (err) {
                    reject(err);
                } else {
                    resolve(removeCount);
                }
            })
        });

        return promise;
    }
};