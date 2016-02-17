(function() {
    'use strict';

    var proposicoes = angular.module('proposicoes');

    proposicoes.service('proposicaoService', ['$http', 'userService', 'app_config', ProposicaoService]);

    var token = '';
    var server = '';

    function ProposicaoService($http, $userService, app_config) {
        // Promise-based API
        return {
            loadAllProposicoes: function() {
                var user_id = $userService.get();
                return $http({
                    method: 'GET',
                    url: app_config.server + '/api/v1/proposicoes/' + user_id + '?token=' + app_config.token
                }).then(function successCallback(response) {
                    $userService.save(response.data.user);
                    var proposicoes = [];
                    angular.forEach(response.data.proposicoes, function(value, key) {
                        var proposicao = {
                            id: value.id,
                            tipo: value.tipo,
                            descricao: value.tipo_descricao,
                            codigo: value.nome,
                            ementa: value.ementa,
                            resumo: value.resumo,
                            iniciativa: value.parlamentar.nome,
                            avatar_url: value.parlamentar.avatar_url,
                            votos_favor: value.votos_favor,
                            votos_contra: value.votos_contra,
                            voto_usuario: value.voto_usuario
                        };

                        this.push(proposicao);
                    }, proposicoes);

                    return proposicoes;
                });
            },
            votar: function(voto, id) {
                var user_id = $userService.get();
                return $http({
                    method: 'POST',
                    url: app_config.server + '/api/v1/proposicoes/votar/' + id + '?user_id=' + user_id + '&voto_usuario=' + voto + '&token=' + app_config.token
                })
            }
        };

    }

})();
