(function() {
    'use strict';

    var ranking = angular.module('ranking');

    ranking.service('rankingService', ['$http', '$q', 'userService', 'app_config', RankingService]);

    var token = '';
    var server = '';

    function RankingService($http, $q, $userService, app_config) {
        // Promise-based API
        return {
            loadAllParlamentares: function() {
                return $http({
                    method: 'GET',
                    url: app_config.server + 'ranking/'
                }).then(function successCallback(response) {
                    return response.data.parlamentares;
                });
            },
            mockRankingData: function() {
                // Ranks:
                return $q.when([
                {
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Stica'
                    },
                    match_votos_favor: 11,
                    match_votos_contra: 12,
                    match_proposicoes: 25,
                    total_proposicoes: 30
                },
                {
                    parlamentar: {
                        avatar_url: 'http://cicerocattani.com.br/wp-content/uploads/2015/03/jonny-Stica.jpg',
                        nome: 'Johnny Walker'
                    },
                    match_votos_favor: 6,
                    match_votos_contra: 13,
                    match_proposicoes: 22,
                    total_proposicoes: 30
                }]);
            }
        };
    }

})();
