angular.module('politikei', ['ui.router'])
    .config(['$stateProvider, $urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/proposicoes");

        $stateProvider
            .state('proposicoes', {
                url: "/proposicoes",
                templateUrl: "proposicoes/view/index.html"
            });
    }]);
