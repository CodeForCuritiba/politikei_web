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
            self.voteCount = 0;

            self.loaded = false;

            proposicaoService
                .loadAllProposicoes()
                .then(function (proposicoes) {
                    self.proposicoes = [].concat(proposicoes);
                    self.selected = proposicoes[0];
                    self.loaded = true;
                }).then(function () {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#container')))
                            .clickOutsideToClose(true)
                            .title('Proposições')
                            .textContent('A Gazeta do Povo e o grupo Primavera Cidadã selecionaram as 16 proposições mais debatidas na Câmara Municipal de Curitiba, nesta última gestão. Você pode se posicionar sobre elas aqui nessa página, e em seguida o nosso site vai gerar um ranking mostrando quais candidatos (dos que se cadastraram conosco) se posicionaram de forma mais parecida com você.')
                            .ariaLabel('Proposições')
                            .ok('Endendi!')
                    );
                });


            function selectProposicao(proposicao) {
                self.selected = angular.isNumber(proposicao) ? $scope.proposicoes[proposicao] : proposicao;
            }

            function votar_neutro(proposicao) {
                self.voteCount += 1;
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == '1') {
                    proposicao.votos_favor = proposicao.votos_favor - 1;
                } else if (proposicao.voto_usuario.voto == '0') {
                    proposicao.votos_contra = proposicao.votos_contra - 1;
                }

                proposicao.voto_usuario.voto = '2';
                proposicaoService.votar('2', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
                self.modal();
            }

            function votar_favor(proposicao) {
                self.voteCount += 1;
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == null || proposicao.voto_usuario.voto == 0) {
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                } else if (proposicao.voto_usuario.voto == '0') {
                    proposicao.votos_contra = proposicao.votos_contra - 1;
                    proposicao.votos_favor = proposicao.votos_favor + 1;
                }

                proposicao.voto_usuario.voto = '1';
                proposicaoService.votar('1', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
                self.modal();
            }

            function votar_contra(proposicao) {
                self.voteCount += 1;
                proposicao.disable = true;
                if (!proposicao.voto_usuario) {
                    proposicao.voto_usuario = {};
                }
                if (proposicao.voto_usuario.voto == null || proposicao.voto_usuario.voto == 0) {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                } else if (proposicao.voto_usuario.voto == '1') {
                    proposicao.votos_contra = proposicao.votos_contra + 1;
                    proposicao.votos_favor = proposicao.votos_favor - 1;
                }

                proposicao.voto_usuario.voto = '0';
                proposicaoService.votar('0', proposicao.id).then(function (resp) {
                    //console.log(resp);
                    proposicao.disable = false;
                }, function (err) {
                    //console.log(err);
                    proposicao.disable = false;
                });
                self.modal();
            }


            this.modal = function () {
                if (checkVotes) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#container')))
                            .clickOutsideToClose(true)
                            .title('Proposições')
                            .textContent('Já terminou de se posicionar? Clique em “Ranking" para ver quais candidatos - dos que se cadastraram com a gente - se posicionaram de forma mais parecida com você.')
                            .ariaLabel('Proposições')
                            .ok('Endendi!')
                    );
                }
            }

            function checkVotes() {
                
                for (var vote in proposicao.voto_usuario.voto) {
                    var count = 0;
                    if (vote) {
                        count++;
                    }
                }
                if (count === 16) {
                    return true;
                }
                return false;
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
                $scope.votar_favor = votar_favor;
                $scope.votar_contra = votar_contra;
                $scope.votar_neutro = votar_neutro;
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
