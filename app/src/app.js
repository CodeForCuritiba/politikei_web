function config($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {

    $stateProvider
        .state('root', {
            url: '/',
            controller: 'HomeController  as home',
            templateUrl: 'src/public/home/index.html'
        })
        .state('home', {
            url: '/home',
            controller: "AppHomeController as appHome",
            templateUrl: "src/app/app-home.html"
        }).state('home.proposicoes', {
            url: "/prop",
            controller: "ProposicaoController as proposicoes",
            templateUrl: "src/app/proposicoes/view/index.html"
        }).state('home.teste', {
            url: "/teste",
            controller: "ProposicaoController as proposicoes",
            templateUrl: "src/app/proposicoes/view/index.html"
        });
    //$urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
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
    .module('politikei', ['ui.router', 'ngMaterial', 'ngCookies', 'home', 'proposicoes', 'users'])
    .config(config)
    .controller('MainController', MainController);

var configEndPoint = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIwMiwiaXNzIjoiaHR0cDpcL1wvcG9saXRpa2VpLWFwaS5oZXJva3VhcHAuY29tXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTczMjM2MiwiZXhwIjoxNDU1NzM1OTYyLCJuYmYiOjE0NTU3MzIzNjIsImp0aSI6IjU5MDI5MTU2MDE4MTJlYzQ0OGNmMzBmZmIxNmQ2ZGU1In0.-D5T4f2eA-l_fmKvave0n7djKihKMVgoG44GmG8scZM',
    server: 'http://politikei-api-v5.herokuapp.com/'
};

politikei.constant('app_config', configEndPoint);
