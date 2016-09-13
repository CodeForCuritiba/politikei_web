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
            self.votar_neutro = votar_neutro;

            self.loaded = false;

            proposicaoService
                .loadAllProposicoes()
                .then(function (proposicoes) {
                    self.proposicoes = [].concat(proposicoes);
                    self.selected = proposicoes[0];
                    self.loaded = true;
                });


            function selectProposicao(proposicao) {
                self.selected = angular.isNumber(proposicao) ? $scope.proposicoes[proposicao] : proposicao;
            }

            function votar_neutro(proposicao) {
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == '2') {
                    proposicao.votos_favor = proposicao.votos_favor - 1;
                } else if (proposicao.voto_usuario.voto == '1') {
                    proposicao.votos_contra = proposicao.votos_contra - 1;
                }

                proposicao.voto_usuario.voto = '0';
                proposicaoService.votar('0', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
            }

            function votar_favor(proposicao) {
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == null || proposicao.voto_usuario.voto == 0) {
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                } else if (proposicao.voto_usuario.voto == '1') {
                    proposicao.votos_contra = proposicao.votos_contra - 1;
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                }

                proposicao.voto_usuario.voto = '2';
                proposicaoService.votar('2', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
            }

            function votar_contra(proposicao) {
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == null || proposicao.voto_usuario.voto == 0) {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                } else if (proposicao.voto_usuario.voto == '2') {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                    proposicao.votos_favor = proposicao.votos_favor - 1;
                }

                proposicao.voto_usuario.voto = '1';
                proposicaoService.votar('1', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
            }

            /*
            *   Proposição Dialog
            */

            this.showProposicao = function (ev, proposicao) {
                $mdDialog.show({
                    locals: {
                        prop: proposicao
                    },
                    controller: DialogController,
                    controllerAS: 'ctrl',
                    templateUrl: '../../src/app/proposicoes/proposicao-full.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                    .then(function (answer) {
                        //console.log('You said the information was "' + answer + '".');
                    }, function () {
                        //console.log('You cancelled the dialog.');
                    });
            };

            DialogController.$inject = ['$scope', '$mdDialog', '$window', 'prop'];

            function DialogController($scope, $mdDialog, $window, prop) {

                $scope.proposicao = prop;

                $scope.submit = function (answer) {
                    $mdDialog.hide();
                };

                $scope.viewLink = function (proposicao) {
                    $window.open(proposicao.link);
                }

                $scope.$on("$locationChangeStart", function (evt) {
                    evt.preventDefault();
                    $mdDialog.hide();
                });
            };
        }
    ]);
})();
