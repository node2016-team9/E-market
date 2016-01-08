var users = require('../data/categories');

var CONTROLLER_NAME = 'categories';
module.exports = {
    getAll: function (req, res, next) {
        users.getAll(function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log(data);
            }
        });
        res.send('response');
    }
}