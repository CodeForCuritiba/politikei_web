(function () {
    'use strict';

    var ranking = angular.module('ranking');

    ranking.service('rankingService', ['$http', '$q', '$cookies', 'userService', 'app_config', RankingService]);

    var server = 'http://158.69.200.6/politikei_api/vote/ranking';

    function RankingService($http, $q, $cookies, $userService, app_config) {
        // Promise-based API
        return {
            loadRanking: function () {
                return $http({
                    method: 'POST',
                    url: server,
                    data: {
                        token: $cookies.get('fbToken')
                    }
                }).then(function successCallback(response) {
                    //console.log(response.data.ranking);
                    return response.data.ranking;
                });
            },
            mockRankingData: function () {
                // Ranks:
                var result = $q.when([
                    {
                        Nao: "50.00",
                        NaoSei: "30.00",
                        QtdeProposicoes: "5",
                        Sim: "20.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Teste",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "0.00",
                        NaoSei: "60.00",
                        QtdeProposicoes: "2",
                        Sim: "40.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Teste",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "30.00",
                        NaoSei: "30.00",
                        QtdeProposicoes: "2",
                        Sim: "40.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Testolino",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "0.00",
                        NaoSei: "90.00",
                        QtdeProposicoes: "2",
                        Sim: "10.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Jose",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "40.00",
                        NaoSei: "60.00",
                        QtdeProposicoes: "2",
                        Sim: "0.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Potato",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "34.00",
                        NaoSei: "33.00",
                        QtdeProposicoes: "2",
                        Sim: "33.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Teste123",
                        partido_sigla: "CODE"
                    },
                    {
                        Nao: "30.00",
                        NaoSei: "30.00",
                        QtdeProposicoes: "2",
                        Sim: "40.00",
                        parlamentar_id: "1",
                        parlamentar_nome: "Gsus",
                        partido_sigla: "CODE"
                    }
                    ]);

                return result;
            }
        };
    }

})();
