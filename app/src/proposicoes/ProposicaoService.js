(function() {
    'use strict';

    var proposicoes = angular.module('proposicoes');

    proposicoes.service('proposicaoService', ['$http', 'userService', ProposicaoService]);

    function ProposicaoService($http, $userService) {
        // Promise-based API
        return {
            loadAllProposicoes: function() {
                var user_id = $userService.get();
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8080/politikei_api/api/v1/proposicoes/' + user_id + '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwXC9wb2xpdGlrZWlfYXBpXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTU4MDkxMywiZXhwIjoxNDU1NTg0NTEzLCJuYmYiOjE0NTU1ODA5MTMsImp0aSI6IjA3MGIwMWNiN2Q3YzNhYWU1NWNmNmMwY2I3MjMxYWY0In0.A_4Sq_UUccgUtQRY4E-i2fhhBdLzRCBG3kM99EBWtOU'
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
                            iniciativa: 'Autor teste',
                            avatar_url: './assets/img/default_avatar.png'
                        };

                        this.push(proposicao);
                    }, proposicoes);

                    return proposicoes;
                });
            }
        };
    }

})();
