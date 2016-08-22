(function(){
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = [];
    
    function AppHomeController(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());