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
    }
};