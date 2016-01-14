(function () {
    'use strict';

    angular.module('auction.services', []);
    angular.module('auction.controllers', ['auction.services']);
    angular.module('auction', ['auction.controllers'])
        .value('toastr', toastr)
        .constant('baseServiceUrl', 'http://localhost:3000');
}());