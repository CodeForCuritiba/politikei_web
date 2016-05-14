(function() {
    'use strict';

    var home = angular.module('home');

    home.controller('HomeController', ['$scope', '$rootScope', HomeController]);

    function HomeController($scope, $rootScope) {
        var self = this;


        $rootScope.$on('$includeContentLoaded', function() {
            JQuery(document).ready(function() {
                // This command is used to initialize some elements and make them work properly
                JQuery.material.init();
            });
        });
    }




})();
