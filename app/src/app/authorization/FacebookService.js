(function () {
    'use strict';

    angular
        .module('facebook', ['ngCookies', 'authorization'])
        .factory('facebookService', FacebookService)

    FacebookService.$inject = ['$state', '$q', '$cookies', 'AuthService']

    function FacebookService($state, $q, $cookies, AuthService) {

        return {
            isLogged: isLogged,
            loginRegister: loginRegister,
            logout: logout,
            getName: getName,
            getPicture : getPicture
        }

        function getName() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: ['first_name']
            }, function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }

        function getPicture() {
            var deferred = $q.defer();
            FB.api(
                "/me/picture",
                {
                    "redirect": false,
                    "type": "small"
                },
                function (response) {
                    if (response && !response.error) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject(response);
                    }
                }
            );

            return deferred.promise;
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
            }, { scope: "email" });

            return deferred.promise;
        }

        function isLogged() {
            var deferred = $q.defer();

            var token = $cookies.get('fbToken');

            if (token) {
                AuthService.authenticateUser(token).then(function (user) {
                    deferred.resolve(true);
                }, function (error) {
                    deferred.reject(false);
                });
            } else {
                deferred.reject(false);
            }


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