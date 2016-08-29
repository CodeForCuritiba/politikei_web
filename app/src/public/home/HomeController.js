(function () {
    'use strict';

    var home = angular.module('home');

    home.controller('HomeController', ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
        var self = this;

        $scope.content_loaded = function () {
            $(function () {
                // This command is used to initialize some elements and make them work properly
                $.material.init();

                $.init_menu();
            });
        };

        this.login_fb = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me', function (response) {                        
                        //passar token API
                        console.log(JSON.stringify(response));

                        $state.go('home', { notify: false });
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'email',return_scopes: true});
        };

        $scope.status = '  ';

        this.showLogin = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                //controllerAS: 'ctrl',
                templateUrl: 'src/public/home/login-modal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    console.log('You said the information was "' + answer + '".');
                }, function () {
                    console.log('You cancelled the dialog.');
                });
        };

        DialogController.$inject = ['$scope', '$mdDialog'];

        function DialogController($scope, $mdDialog) {
            $scope.submit = function (answer) {
                $mdDialog.hide(answer);
            };
        };
    }]);
})();