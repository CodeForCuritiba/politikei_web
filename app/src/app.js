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
    .module('politikei', ['ui.router', 'ngMaterial', 'ngCookies', 'home', 'site'])
    .config(config)
    .controller('MainController', MainController);
