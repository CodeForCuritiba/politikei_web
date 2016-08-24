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

        this.toggleMenu = function() {
            $mdSidenav('left').toggle();
        }

        this.menuItemSelected = function(item, event) {
            $mdSidenav('left').toggle();
            $state.activeItem = item;
        }

    }

} ());
