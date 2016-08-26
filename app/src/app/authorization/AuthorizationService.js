(function () {
    'use strict';

    angular
        .module('authorization', ['users'])
        .service('AuthService', AuthService);


    AuthService.$inject = ['$http', '$q','userService'];

    function AuthService($http, $q, userService) {

        let url = '';

        /*
         *  @user {id:'email'
         *         pswd:'pass'
         *        }
         *  @return {user.id: 'name', toke:'token'}
         */
        this.loginUser = function (user) {
            return $http.post(url, user).success((data) => {
                userService.save_user(data);
                return data;
            }).error((error) => {
                return $q.reject(error);
            });
        };

        this.registerUser = function (user) {
            return $http.post(url, user).success((data) => {
                userService.save_user(data);
                return data;
            }).error((error) => {
                return $q.reject(error);
            });
        }
    }

} ());