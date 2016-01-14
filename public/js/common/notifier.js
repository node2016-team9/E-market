(function () {
    'use strict';

    angular.module('auction.services')
        .factory('notifier', ['toastr', function (toastr) {
        return {
            success: function (msg) {
                toastr.success(msg);
            },
            error: function (msg) {
                toastr.error(msg);
            }
        }
    }])
}());