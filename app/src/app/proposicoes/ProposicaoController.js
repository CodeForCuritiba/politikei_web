(function () {
    'use strict';

    var politikei = angular.module('proposicoes');

    politikei.controller('ProposicaoController', ['proposicaoService', '$mdDialog',
        function (proposicaoService, $mdDialog) {
            var self = this;

            self.selected = null;
            self.proposicoes = [];
            self.selectProposicao = selectProposicao;
            self.votar_favor = votar_favor;
            self.votar_contra = votar_contra;

            self.loaded = false;

            proposicaoService
                .loadPublicProposicoes()
                .then(function (proposicoes) {
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

            /*
            *   Proposição Dialog
            */

            this.showProposicao = function (ev) {
                console.log('yar');
                $mdDialog.show({
                    controller: DialogController,
                    //controllerAS: 'ctrl',
                    templateUrl: '../../src/app/proposicoes/proposicao-full.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        console.log('You said the information was "' + answer + '".');
                    }, function () {
                        console.log('You cancelled the dialog.');
                    });
            };

            DialogController.$inject = ['$scope','$mdDialog'];

            function DialogController($scope, $mdDialog) {

                $scope.text = 'Aqui é Body Builder Ipsum PORRA! Vem porra! Ó o homem ali porra!, é 13 porra! Sabe o que é isso daí? Trapézio descendente é o nome disso aí. Não vai dá não. Aqui nóis constrói fibra, não é água com músculo. Boraaa, Hora do Show Porra.Sai filho da puta! Birl! É esse que a gente quer, é ele que nóis vamo buscar. Aqui nóis constrói fibra, não é água com músculo. Bora caralho, você quer ver essa porra velho. É 13 porra!Eita porra!, tá saindo da jaula o monstro! Sabe o que é isso daí? Trapézio descendente é o nome disso aí. Vai subir árvore é o caralho porra! Vamo monstro! Negativa Bambam negativa. É nóis caraio é trapezera buscando caraio!Não vai dá não. Ele tá olhando pra gente. É nóis caraio é trapezera buscando caraio! Eu quero esse 13 daqui a pouquinho aí. É verão o ano todo vem cumpadi. Eita porra!, tá saindo da jaula o monstro! Ó o homem ali porra!, é 13 porra! Vai subir árvore é o caralho porra! Aqui nóis constrói fibra, não é água com músculo. Aqui é bodybuilder porra! Tá comigo porra. Não vai dá não. Aqui é bodybuilder porra! É esse que a gente quer, é ele que nóis vamo buscar. Negativa Bambam negativa. Sabe o que é isso daí? Trapézio descendente é o nome disso aí. Sai filho da puta! É 13 porra!'

                $scope.submit = function (answer) {
                    $mdDialog.hide(answer);
                };
            };
        }
    ]);
})();
