(function () {
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state', '$mdSidenav', '$window', 'facebookService'];

    function AppHomeController($state, $mdSidenav, $window, facebookService) {
        var vm = this;
        this.selected = '';
        this.userName = '';
        this.userPicture = '';
        init();

        facebookService.getPicture().then(function (resp) {
            vm.userPicture = resp.data.url;
        }, function (err) {
            console.log(err);
        });

        facebookService.getName().then(function (resp) {
            vm.userName = resp.first_name;
        }, function (err) {
            console.log(err);
        });

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
            facebookService.logout();
        }

        this.open = function (page) {
            var url = null;

            if (page === 'contribua') {
                url = 'http://www.politikei.org';
            }
            if (page === 'sobre') {
                url = 'http://www.politikei.org';
            }
            if (url !== null) {
                $window.open(url);
            }
        }

    }

} ());
