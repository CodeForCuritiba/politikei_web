(function() {
    'use strict';

    var home = angular.module('home');

    home.controller('ProposicoesPublicController', ['$scope', 'proposicaoService', ProposicoesPublicController]);

    function ProposicoesPublicController($scope, proposicaoService) {
        proposicaoService.loadPublicProposicoes().then(function (argument) {
            $scope.proposicoes = argument;
        })
    }

})();
