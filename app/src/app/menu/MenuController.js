(function(){
    'use strict';

    angular
        .module('politikei')
        .controller('MenuController', MenuController)
    
    MenuController.$inject = [];

    function MenuController(){
        var vm = this;
        var options = [];
        init();

        function init() {
            vm.options = ["Projetos de Lei", "Vereadores", "Ranking"];
        }

    }

}());