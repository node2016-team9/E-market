var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/profile', controllers.users.getProfile);
    app.get('/profile/orders', controllers.users.getOrders);

    app.get('/categories', controllers.categories.getAll);
    app.post('/categories', controllers.categories.add);
    app.get('/categories/:id/addProduct', controllers.products.getAddProductForm);
    app.post('/categories/:id/addProduct', controllers.products.add);
    app.get('/categories/:id', controllers.categories.getProductsByCategoryId);

    app.get('/products/details/:id', controllers.products.getProductDetails);

    app.post('/products/details/order', controllers.products.orderProduct);

    app.get('/products/details/:id/orders', controllers.orders.getProductOrders);

    app.get('/', controllers.home.getAllData);

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};