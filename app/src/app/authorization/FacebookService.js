(function () {
    'use strict';

    angular
        .module('facebook', [])
        .factory('facebookService', FacebookService)

    FacebookService.$inject = ['$state', '$q']

    function FacebookService($state, $q) {

        return {
            getMyLastName: getMyLastName,
            isLogged: isLogged,
            loginRegister: loginRegister,
            logout: logout
        }

        function loginRegister() {
            var deferred = $q.defer();
            
            FB.login(function (response) {
                if (response.authResponse) {
                        //passar token API
                        deferred.resolve(response);
                } else {
                    deferred.reject('User cancelled login or did not fully authorize.');
                }
            });

            return deferred.promise;
        }

        function getMyLastName() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function isLogged() {
            var deferred = $q.defer();

            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    console.log('isLogged: ' );
                    deferred.resolve(response);
                } else {
                    console.log('notLogged: ');
                    deferred.reject();
                }
            }, true);
            return deferred.promise;
        }

        function logout() {
            isLogged().then(function () {
                FB.logout(function (resp) {
                    $state.go('^.^.demo', { notify: false });
                });
            }, function () {
                $state.go('^.^.demo', { notify: false });
            })
        }
    }

} ());