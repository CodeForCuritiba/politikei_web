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

                $scope.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat dolor, congue a tristique sit amet, posuere eu tortor. Fusce hendrerit nulla metus, vel gravida orci molestie vel. Suspendisse tempus in quam vitae facilisis. Proin condimentum justo et ex ullamcorper molestie. Quisque a nisl diam. Morbi erat velit, condimentum sit amet eleifend eu, faucibus at ipsum. Integer augue tortor, tempor eget congue at, cursus sit amet massa. Aenean imperdiet et neque sit amet semper. Suspendisse vitae nisi dictum, iaculis neque ut, venenatis justo. Integer semper mi a orci rutrum, sed imperdiet arcu fringilla. Mauris tortor velit, laoreet sed tortor eget, dictum condimentum nibh. In hendrerit enim vel maximus imperdiet. Suspendisse blandit, neque vel imperdiet egestas, ante nunc volutpat mauris, id fermentum mi ex eget leo. Cras facilisis egestas suscipit. Proin a faucibus erat, nec dapibus mi. Ut sem sapien, semper iaculis ante eu, aliquet gravida magna. Morbi et ligula a lorem efficitur venenatis. Aenean mauris lectus, aliquam non tellus sit amet, molestie condimentum libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse sollicitudin diam eget condimentum faucibus. Aenean sem elit, imperdiet ac enim ac, convallis ultrices velit. Sed non justo porttitor, facilisis ligula nec, maximus justo. Suspendisse orci elit, fringilla sit amet pharetra non, cursus feugiat velit. Sed in quam ut diam sollicitudin tristique. Ut non lorem diam. In mollis volutpat pretium. Aenean ornare a neque non mattis. Aliquam molestie ipsum et magna tempor, vel pellentesque dolor lacinia.Vestibulum pulvinar fringilla purus, eu rhoncus ligula varius non. Fusce accumsan venenatis justo, at molestie lorem tristique in. Aliquam eu lorem tempor orci tempus blandit et id sem. Vivamus vehicula libero metus, vel sollicitudin nulla elementum rhoncus. Quisque erat lectus, convallis non orci vel, faucibus lobortis lectus. Sed in nulla facilisis, dictum lectus non, luctus velit. Cras sed dictum magna.Cras sodales diam aliquam magna tincidunt venenatis. Etiam elementum justo quam, accumsan mattis quam interdum nec. Aliquam in tellus hendrerit, interdum tellus quis, ullamcorper risus. Fusce ac auctor eros. Duis accumsan dolor tellus, quis vestibulum tellus gravida id. Vestibulum tempus porta magna sollicitudin vehicula. Integer varius, tellus sed dapibus congue, elit ex vestibulum nisl, sed lobortis tellus turpis vel justo. Quisque fermentum ex dolor, id vehicula metus luctus eget. Aliquam vel neque ut urna suscipit posuere sit amet vitae nisl.Sed malesuada turpis ac lacus hendrerit porta. Proin consectetur tincidunt diam, sit amet congue ligula sollicitudin in. Proin eget posuere augue, nec tempus nisl. Nulla sagittis massa ut massa viverra, sit amet tempus metus commodo. Suspendisse laoreet leo eu nibh dignissim, et commodo libero molestie. Donec maximus fermentum tortor sit amet auctor. Nulla ultricies gravida hendrerit. Suspendisse scelerisque sapien in justo rutrum, at tristique metus tincidunt.'

                $scope.submit = function (answer) {
                    $mdDialog.hide(answer);
                };
            };
        }
    ]);
})();
