(function() {
    'use strict';

    var politikei = angular.module('proposicoes');

    politikei.controller('ProposicaoController', ['proposicaoService',
        function(proposicaoService) {
            var self = this;

            self.selected = null;
            self.proposicoes = [];
            self.selectProposicao = selectProposicao;
            self.votar_favor = votar_favor;
            self.votar_contra = votar_contra;

            self.loaded = false;

            proposicaoService
                .loadAllProposicoes()
                .then(function(proposicoes) {
                    self.proposicoes = [].concat(proposicoes);
                    self.selected = proposicoes[0];
                    self.loaded = true;
                });


            function selectProposicao(proposicao) {
                self.selected = angular.isNumber(proposicao) ? $scope.proposicoes[proposicao] : proposicao;
            }

            function votar_favor(proposicao) {
                if (proposicao.voto_usuario == null) {
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                    proposicao.voto_usuario = {};
                } else if (proposicao.voto_usuario.voto == 'n') {
                    proposicao.votos_contra = proposicao.votos_contra - 1;
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                }

                proposicao.voto_usuario.voto = 's';
                proposicaoService.votar('s', proposicao.id);
            }

            function votar_contra(proposicao) {
                if (proposicao.voto_usuario == null) {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                    proposicao.voto_usuario = {};
                } else if (proposicao.voto_usuario.voto == 's') {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                    proposicao.votos_favor = proposicao.votos_favor - 1;
                }

                proposicao.voto_usuario.voto = 'n';
                proposicaoService.votar('n', proposicao.id);
            }
        }
    ]);
})();
