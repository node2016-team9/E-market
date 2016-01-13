var router = require('express').Router(),
    controllers = require('../../controllers'),
    auth = require('../auth');

router
    .get('/', controllers.users.getLogin)
    .post('/', auth.login)
    .get('/', auth.logout);

module.exports = function (app) {
    app.use('/login', router);
};
