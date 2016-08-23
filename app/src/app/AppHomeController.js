(function(){
    'use strict';

    angular
        .module('politikei')
        .controller('AppHomeController', AppHomeController);

    AppHomeController.$inject = ['$state'];
    
    function AppHomeController($state){
        var vm = this;
        init();

        function init() {
            $state.go('.proposicoes');    
            console.log('teste');
        }

    }

}());