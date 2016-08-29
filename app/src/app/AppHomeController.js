(function () {
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state', '$mdSidenav', '$window'];

    function AppHomeController($state, $mdSidenav, $window) {
        var vm = this;
        this.selected = '';
        init();

        function init() {
            $state.go('.proposicoes');
        }

        this.toggleMenu = function () {
            $mdSidenav('left').toggle();
        }

        this.menuItemSelected = function (option) {
            vm.selected = option;
            $mdSidenav('left').toggle();
        }

        this.login_logout = function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (resp) {
                        $state.go('^.^.demo', { notify: false });
                    });
                    //FB.logout(response.authResponse.accessToken);
                }
            });
        }

        this.open = function (page) {
            let url = null;

            if (page === 'contribua') {
                url = 'http://localhost:3000';
            }
            if (page === 'sobre') {
                url = 'http://localhost:3000';
            }
            if (url !== null) {
                $window.open(url);
            }
        }

    }

} ());
