(function(){
    'use strict';

    angular
        .module('politikei')
        .controller('HeaderController', HeaderController)

    HeaderController.$inject = [];

    function HeaderController(){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());