var categories = require('../data/categories'),
    users = require('../data/users'),
    services = require('../services'),
    encryption = require('../utilities/encryption');

var CONTROLLER_NAME = 'admin';

module.exports = {
    getHome: function (req, res) {
        services.categories.getAll()
            .then(function (categories) {
                res.render('admin/home', { categories: categories, currentUser: req.user });
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            });
    },
    getAddCategory: function (req, res) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.render('admin/add-category.jade', { categories: data, currentUser: req.user });
            }
        });
    },
    postAddCategory: function (req, res, next) {
        var category = {
            name: req.body.name
        };

        services.categories.add(category)
            .then(function (category) {
                res.redirect('/admin/home');
            }, function (err) {
                req.session.error = 'Category could not be added successfully';
                console.log(err);
                res.redirect('/admin/categories/add');
            });
    },
    getEditCategory: function (req, res) {
        var editCategoryId = req.params.id;
        var sortBy = req.query.date || 'desc';
        var sortPrice = req.query.price || 'desc';
        var username = req.query.username || '';
        var page = req.query.page || 1;

        services.categories.getProductsByCategoryId(editCategoryId, sortBy, sortPrice, username, page)
            .then(function (category) {
                return category;
            }, function (err) {
                console.log('Could not fetch the products by categoryId ' + editCategoryId + ': ' + err);
            })
            .then(function (category) {
                categories.getAll(function (err, categories) {
                    if (err) console.log('Could not fetch all categories in editCategory:' + err);
                    else {
                        res.render('admin/edit-category', { currentUser: req.user, editCategory: category, categories: categories })
                    }
                })
            });
    },
    postEditCategory: function (req, res) {
        var newCategory = {
            name: req.body.name,
            id: req.params.id
        };

        services.categories.update(newCategory.id, newCategory).then(function (categories) {
            res.redirect('/admin/home');
        }, function (err) {
            req.session.error = 'Category could not be updated successfully';
            console.log(err);
            res.redirect('/admin/home');
        });
    },
    getDeleteCategory: function (req, res) {
        categories.getAll(function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.render('admin/delete-category.jade', { categories: data, currentUser: req.user });
            }
        });
    },
    postDeleteCategory: function (req, res) {
        var categoryName = req.body.name;

        if (categoryName !== req.body.confirmName) {
            req.session.error = 'The category name and the confirmation name should match!';
            res.redirect('/admin/categories/delete');
        }

        services.categories.getCategoryByName(categoryName)
            .then(function (category) {
                return category;
            }, function (err) {
                console.log(err);
            })
            .then(function (category) {
                console.log(category);
                services.categories.removeCategoryById(category._id)
                    .then(function () {
                        res.redirect('/admin/home');
                    }, function (err) {
                        req.session.error = 'Either category could not be deleted or the products associated with it.';
                        res.redirect('/admin/home');
                        console.log(err);
                    });
            });
    },
    deleteProduct: function (req, res) {
        var productId = req.params.id;
        services.products.deleteProductById(productId)
            .then(function (err) {
                if (err) {
                    req.session.error = 'Could not delete product!';
                    console.log(err);
                }

                res.redirect('/admin/home');
            });
    },
    getAllUsers: function (req, res) {
        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                users.getAll(function (err, users) {
                    if (err) {
                        req.session.error = 'Could not retrieve users.';
                        console.log(err);
                    } else {
                        res.render('admin/all-users.jade', { users: users, categories : categories, currentUser: req.user });
                    }
                })
            });
    },
    getEditUser: function (req, res) {
        var username = decodeURIComponent(req.params.username);

        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                services.users.getUserByUsername(username)
                    .then(function (editedUser) {
                        res.render('admin/edit-user.jade', {
                            editedUser: editedUser,
                            categories: categories,
                            roles: services.users.getRoles(),
                            currentUser: req.user
                        });
                    }, function (err) {
                        req.session.error = 'Could not retrieve info about the edited user!';
                        console.log(err);
                    });
            });
    },
    postEditUser: function (req, res) {
        var newUserData = {
            username: req.body.username
        };

        var currentUsername = decodeURIComponent(req.params.username);

        services.users.getUserByUsername(currentUsername)
            .then(function (currentUserData) {
                if (req.body.role.length > 0 && currentUserData.roles.indexOf(req.body.role) < 0) {
                    newUserData.roles = [];
                    newUserData.roles.push(req.body.role);
                }
            }, function (err) {
                console.log(err);
            });

        if (req.body.password.length > 0) {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
        }

        services.users.update(currentUsername, newUserData)
            .then(function () {
                res.redirect('/admin/home');
            }, function (err) {
                req.session.error = 'Could not update user ' + req.params.username;
                console.log(err);
            });
    },
    getDeleteUser: function (req, res) {
        var username = decodeURIComponent(req.params.username);

        services.users.removeUserByUsername(username)
            .then(function () {
                res.redirect('/admin/home');
            }, function (err) {
                req.session.error = 'Could not delete user ' + req.params.username;
                console.log(err);
            });
    },
    getUserOrders: function (req, res) {
        var username = decodeURIComponent(req.params.username);

        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                services.orders.getUserOrdersByUsername(username)
                    .then(function (orders) {
                        res.render('admin/all-user-orders.jade', {
                            categories: categories,
                            currentUser: req.user,
                            userOrders: orders,
                            requestedUsername: username});
                    }, function (err) {
                        req.session.error = 'Could not load user orders';
                        res.redirect('/admin/home');
                        console.log(err);
                    });
            });
    },
    getUserProducts: function (req, res) {
        var username = decodeURIComponent(req.params.username);

        console.log('ok');
        services.categories.getAll()
            .then(function (categories) {
                return categories;
            }, function (err) {
                console.log(err);
                req.session.error = 'Could not retrieve categories!';
            })
            .then(function (categories) {
                console.log("ok");
                services.users.getUserProductsByUsername(username)
                    .then(function (products) {
                        console.log(products);
                        res.render('admin/all-user-products.jade', {
                            categories: categories,
                            currentUser: req.user,
                            userProducts: products});
                    }, function (err) {
                        req.session.error = 'Could not load user products';
                        res.redirect('/admin/home');
                        console.log(err);
                    });
            });
    }
};