var politikei = angular.module('politikei', ['ui.router', 'proposicoes', 'ngCookies']);

politikei.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {

    $urlRouterProvider.otherwise("/proposicoes");

    $stateProvider
        .state('proposicoes', {
            url: "/proposicoes",
            templateUrl: "src/proposicoes/view/index.html",
            controller: 'ProposicaoController as proposicoes'
        });

    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24)
        .icon("share", "./assets/svg/share.svg", 24)
        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
        .icon("twitter", "./assets/svg/twitter.svg", 512)
        .icon("phone", "./assets/svg/phone.svg", 512);

    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
            'default': '700',
        })
        .accentPalette('red');
});


politikei.constant('app_config', config);