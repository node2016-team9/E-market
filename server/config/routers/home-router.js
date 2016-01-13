var router = require('express').Router(),
    controllers = require('../../controllers'),
    auth = require('../auth');

router
    .get('/', controllers.home.getAllData)
    .get('/logout', auth.logout);

module.exports = function (app) {
    app.use('/', router);
};

