(function() {
    'use strict';

    var politikei = angular.module('proposicoes');

    politikei.controller('ProposicaoController', ['proposicaoService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
        function(proposicaoService, $mdSidenav, $mdBottomSheet, $log) {
            var self = this;

            self.selected = null;
            self.proposicoes = [];
            self.selectProposicao = selectProposicao;
            self.toggleList = toggleproposicoesList;

            proposicaoService
                .loadAllProposicoes()
                .then(function(proposicoes) {
                    self.proposicoes = [].concat(proposicoes);
                    self.selected = proposicoes[0];
                });

            function toggleproposicoesList() {
                $mdSidenav('left').toggle();
            }

            function selectProposicao(proposicao) {
                self.selected = angular.isNumber(proposicao) ? $scope.proposicoes[proposicao] : proposicao;
            }

        }
    ]);
})();
