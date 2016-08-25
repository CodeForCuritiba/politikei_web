(function () {
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state', '$mdSidenav'];

    function AppHomeController($state, $mdSidenav) {
        var vm = this;
        this.selected = '';
        init();

        function init() {
            $state.go('.proposicoes');
        }

        this.toggleMenu = function() {
            $mdSidenav('left').toggle();
        }

        this.menuItemSelected = function(option) {
            vm.selected = option;
            $mdSidenav('left').toggle();
        }

    }

} ());
