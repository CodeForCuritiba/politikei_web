function config($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>"
        })
        .state('public.site', {
            controller: 'SiteController as site',
            templateUrl: 'src/public/site/index.html'
        })
        .state('public.site.home', {
            url: '/',
            controller: 'HomeController  as home',
            templateUrl: 'src/public/home/index.html'
        })
        .state('public.site.proposicoes', {
            url: "/proposicoes",
            controller: 'ProposicaoController as proposicoes',
            templateUrl: "src/app/proposicoes/view/index.html"
        });

    /*$stateProvider
        .state('app', {
            abstract: true,
            template: "<ui-view/>"
        })
        .state('app.site', {
            url: '/app',
            controller: 'AppCtrl as app',
            templateUrl: 'src/app/home/_admin.html'
        })
        .state('app.site.proposicoes', {
            url: "/proposicoes",
            controller: 'ProposicaoController as proposicoes',
            templateUrl: "src/public/proposicoes/view/index.html"
        });*/

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
        .accentPalette('red')
        .backgroundPalette('grey', {
            'default': '200'
        })
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider'];


function MainController($scope, $mdMedia, $state) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
}

MainController.$inject = ["$scope", "$mdMedia", '$state'];



var politikei = angular
    .module('politikei', ['ui.router', 'ngMaterial', 'ngCookies', 'home', 'site', 'proposicoes', 'users'])
    .config(config)
    .controller('MainController', MainController);

var config = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIwMiwiaXNzIjoiaHR0cDpcL1wvcG9saXRpa2VpLWFwaS5oZXJva3VhcHAuY29tXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTczMjM2MiwiZXhwIjoxNDU1NzM1OTYyLCJuYmYiOjE0NTU3MzIzNjIsImp0aSI6IjU5MDI5MTU2MDE4MTJlYzQ0OGNmMzBmZmIxNmQ2ZGU1In0.-D5T4f2eA-l_fmKvave0n7djKihKMVgoG44GmG8scZM',
    server: 'http://politikei-api.herokuapp.com/api/v1'
};

politikei.constant('app_config', config);