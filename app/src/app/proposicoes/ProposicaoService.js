(function() {
    'use strict';

    var proposicoes = angular.module('proposicoes');

    proposicoes.service('proposicaoService', ['$http', '$q', '$cookies', 'userService', 'app_config', ProposicaoService]);

    var server = 'http://158.69.200.6/politikei_api/propositions?token=';

    function ProposicaoService($http, $q, $cookies, $userService, app_config) {
        // Promise-based API
        return {
            loadAllProposicoes: function () {
                return $http({
                    method: 'GET',
                    url: server + $cookies.get('fbToken')
                }).then(function successCallback(response) {
                    return response.data.proposicoes;
                });
            },
            votar: function(voto, id) {
                var user_id = $userService.get();
                return null/*$http({
                    method: 'POST',
                    url: app_config.server + '/proposicoes/votar/' + id + '?user_id=' + user_id + '&voto_usuario=' + voto + '&token=' + app_config.token
                })*/
            },
            loadPublicProposicoes: function() {
                return $q.when([{
                    ementa: "teste de proposicoes",
                    tipo: 'PL',
                    nome: 'Projeto de Lei Mobilidade',
                    votos_contra: 10,
                    votos_favor: 15,
                    resumo: 'A Lei da Bicicleta foi aprovada em primeiro turno nesta terça-feira (16) pela Câmara Municipal de Curitiba e volta à pauta da casa nesta quarta-feira (17).',
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Stica'
                    }
                }, {
                    ementa: "teste de proposicoes",
                    tipo: 'PL',
                    nome: 'Projeto de Lei Mobilidade',
                    votos_contra: 10,
                    votos_favor: 15,
                    resumo: 'A Lei da Bicicleta foi aprovada em primeiro turno nesta terça-feira (16) pela Câmara Municipal de Curitiba e volta à pauta da casa nesta quarta-feira (17).',
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Stica'
                    }
                }]);
            }
        };
    }

})();
