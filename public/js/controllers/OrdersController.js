(function () {
    'use strict';

    function OrdersController($http, notifier) {
        var vm = this;
        vm.addOrder = function (productId) {
            console.log(productId);
            var data = {
                productId: productId,
            };
            $http.post('http://localhost:3000/products/details/' + productId + '/order', data)
                .then(function (response) {
                    notifier.success('Your order is placed successfully');
                }, function (error) {
                    notifier.error('You cannot order product that you posted it');
                });
        }
    }


    angular.module('auction.controllers')
        .controller('OrdersController', ['$http', 'notifier', OrdersController]);
}());