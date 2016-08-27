(function() {
    'use strict';

    angular
        .module('ranking')
        .controller('RankingController', ['rankingService',
            function(rankingService) {
                var self = this;
                self.ranks = [];
                self.loaded = false;
                rankingService
                    .mockRankingData()
                    .then(function(ranks) {
                        self.ranks = [].concat(ranks); //?
                        self.loaded = true;
                    });
            }
        ]);

}());
