(function () {
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state', '$mdSidenav'];

    function AppHomeController($state, $mdSidenav) {
        var vm = this;
        init();

        function init() {
            $state.go('.proposicoes');
        }

        this.toggleUsersList = function() {
            $mdSidenav('left').toggle();
        }

    }

} ());