(function () {
    'use strict';

    angular
        .module('authorization', [])
        .service('AuthService', AuthService)


    AuthService.$inject = [];

    function AuthService() {

        this.fn = function() {

        }
    }

} ());