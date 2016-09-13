(function () {
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
            .then(function (ranks) {
                self.ranks = [].concat(ranks); //?
                self.loaded = true;
            });

    }

} ());
