(function() {
    'use strict';

    var ranking = angular.module('ranking');

    ranking.service('rankingService', ['$http', '$q', '$cookies', 'userService', 'app_config', RankingService]);

    var token = '';
    var server = 'http://158.69.200.6/politikei_api/vote/ranking?token=';

    function RankingService($http, $q, $cookies, $userService, app_config) {
        // Promise-based API
        return {
            loadRanking: function() {
                return $http({
                    method: 'POST',
                    url: server + $cookies.get('fbToken')
                }).then(function successCallback(response) {
                    console.log(response.data.ranking);
                    return response.data.ranking;
                });
            },
            mockRankingData: function() {
                // Ranks:
                var result = $q.when([
                {
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Stica',
                        partido: 'PDL',
                        numero: '123',
                        propostas_votadas: 28
                    },
                    match_votos_favor: 11,
                    match_votos_contra: 12,
                    match_proposicoes: 25,
                    total_proposicoes: 30,
                    perc_positivo: 30
                },
                {
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Walker',
                        partido: 'PDLs',
                        numero: '1234',
                        propostas_votadas: 24
                    },
                    match_votos_favor: 6,
                    match_votos_contra: 13,
                    match_proposicoes: 22,
                    total_proposicoes: 30
                }]);

                return result;
            }
        };
    }

})();
