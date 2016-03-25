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
                    return response.data.proposicoes;
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
