(function () {
    'use strict';

    function config($routeProvider) {
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        angular.module('auction.services', []);
        angular.module('auction.directives', []);
        angular.module('auction.filters', []);
        angular.module('auction.controllers', ['auction.services', 'auction.directives', 'auction.filters']);
        angular.module('auction', ['ngRoute', 'ngCookies', 'auction.controllers', 'kendo.directives']).
            config(['$routeProvider', config])
            .value('toastr', toastr)
            .constant('baseServiceUrl', 'http://localhost:3000');
    }
}());