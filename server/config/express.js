var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.ROOT_PATH + '/server/views');

    app.use(morgan('combined'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: '42',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.ROOT_PATH + '/public'));
}
