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


            //http://localhost:8080/politikei_api/api/v1/proposicoes/votar/1?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwXC9wb2xpdGlrZWlfYXBpXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTU4MjU2NSwiZXhwIjoxNDU1NTg2MTY1LCJuYmYiOjE0NTU1ODI1NjUsImp0aSI6IjEwMjVhMzE3ZDhhZjc5ZjI1OWNlZTEwYmNhN2VkMjJhIn0.TtBpzmJzHzcUkescEnpDPAEF1l7hcUKr4GxMePaSdnA&voto_usuario=s&user_id=122863

        }
    ]);
})();
