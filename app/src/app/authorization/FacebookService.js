(function () {
    'use strict';

    angular
        .module('facebook', ['ngCookies', 'authorization'])
        .factory('facebookService', FacebookService)

    FacebookService.$inject = ['$state', '$q', '$cookies', 'AuthService']

    function FacebookService($state, $q, $cookies, AuthService) {

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
                    var token = response.authResponse.accessToken;
                    AuthService.authenticateUser(token).then(function (user) {
                        //user.data.user;
                        $cookies.put('fbToken', token);
                        deferred.resolve(response);
                    });
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

            var token = $cookies.get('fbToken');

            AuthService.authenticateUser(token).then(function (user) {
                deferred.resolve(true);
            }, function (error) {
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function logout() {
            isLogged().then(function () {
                FB.logout(function (resp) {
                    $cookies.remove('fbToken');
                    $state.go('^.^.demo', { notify: false });
                });
            }, function () {
                $state.go('^.^.demo', { notify: false });
            });
        }
    }

} ());