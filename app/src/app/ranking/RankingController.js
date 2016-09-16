(function() {
    'use strict';

    angular
        .module('ranking')
        .controller('RankingController', RankingController)

    RankingController.$inject = ['rankingService']

    function RankingController(rankingService) {
        var self = this;
        self.ranks = [];
        self.loaded = false;
        rankingService
            .loadRanking()
            //.mockRankingData()
            .then(function(ranks) {
                self.ranks = [].concat(ranks);
                self.loaded = true;
            });

        self.percentualIgual = function(rank) {
            return Math.round(100*rank.igual/(rank.total_votos_usuario-rank.neutro))
        }
        self.percenhtualDiferente = function(rank) {
            return Math.round(100*rank.diferente/(rank.total_votos_usuario-rank.neutro))
        }
        self.percentualNeutro = function(rank) {
            return Math.round(100*rank.indiferente/(rank.total_votos_usuario-rank.neutro))
        }

    }

}());
