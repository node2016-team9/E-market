var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

var env = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(config.PORT);
console.log('Node.js server running on port ' + config.PORT);