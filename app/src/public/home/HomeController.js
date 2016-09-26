(function() {
    'use strict';

    var home = angular.module('home');

    home.controller('HomeController', ['$scope', '$state', '$mdDialog', 'facebookService', function($scope, $state, $mdDialog, facebookService) {
        var self = this;

        $scope.content_loaded = function() {
            $(function() {
                // This command is used to initialize some elements and make them work properly
                $.material.init();
            });

            // Verify if the user already has visited the site before
            if (localStorage.hasVisited)
                return

            // Show welcome dialog
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#container')))
                .clickOutsideToClose(true)
                .title('Bem-vindo')
                .textContent('Bem-vindo ao Politikei! Se você é de Curitiba, temos uma ferramenta especial para lhe ajudar a saber quais candidatos a vereador(a) se posicionam de forma mais parecida com você! Para começar, clique em “Entrar" no canto superior direito.')
                .ariaLabel('Bem-vindo')
                .ok('Entendi!')
            );

            localStorage.hasVisited = true

        };

        this.login_fb = function() {

            facebookService.loginRegister().then(function(response) {
                $state.go('home', { notify: false });
            }, function() {
                console.log('not logged: ');
            });

        };

        $scope.status = '  ';

        this.showLogin = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    //controllerAS: 'ctrl',
                    templateUrl: 'src/public/home/login-modal.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    console.log('You said the information was "' + answer + '".');
                }, function() {
                    console.log('You cancelled the dialog.');
                });
        };

        DialogController.$inject = ['$scope', '$mdDialog'];

        function DialogController($scope, $mdDialog) {
            $scope.submit = function(answer) {
                $mdDialog.hide(answer);
            };
        };
    }]);
})();
