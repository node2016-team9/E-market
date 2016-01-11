module.exports = function routeConfig(app) {
    require('fs')
        .readdirSync('./server/config/routers')
        .filter(function (file) {
            return file !== 'routes-loader.js'
        })
        .forEach(function (file) {
            var filePath = './' + file;
            require(filePath)(app)
        });
};