(function () {
    'use strict';

    angular
        .module('authorization', [])
        .service('AuthService', AuthService);


    AuthService.$inject = ['$http', '$q'];

    function AuthService($http, $q) {

        var url = 'http://158.69.200.6/politikei_api_eleicoes_2016/user/me?token=';


        this.authenticateUser = function (token) {
            return $http.get(url + token).then(function (data) {
                return $q.resolve(data);
            }, function (error) {
                return $q.reject(error);
            });
        };
    }

} ());
