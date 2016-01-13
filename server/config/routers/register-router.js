var router = require('express').Router(),
    controllers = require('../../controllers');

router
    .get('/', controllers.users.getRegister)
    .post('/', controllers.users.postRegister);

module.exports = function (app) {
    app.use('/register', router);
};
