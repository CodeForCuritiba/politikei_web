(function() {
    'use strict';

    var home = angular.module('home');

    home.controller('HomeController', ['$scope', '$rootScope', HomeController]);

    function HomeController($scope, $rootScope) {
        var self = this;

        $scope.content_loaded = function() {
            $(function() {
                // This command is used to initialize some elements and make them work properly
                $.material.init();

                $.init_menu();
            });
        }

    }

})();
