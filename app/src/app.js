function config($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {

    $stateProvider
        .state('root', {
            url: '/',
            controller: 'HomeController as home',
            templateUrl: '../src/public/home/launch_landing.html',
            auth:'public',
        })
        .state('demo', {
            url: '/demo',
            controller: 'HomeController as home',
            templateUrl: '../src/public/home/index.html',
            auth:'public'
        })
        .state('home', {
            url: '/home',
            controller: "AppHomeController as appHome",
            templateUrl: "../src/app/app-home.html",
            auth:'public'
        }).state('home.proposicoes', {
            url: "/proposicoes",
            controller: "ProposicaoController as proposicoes",
            templateUrl: "../src/app/proposicoes/proposicoes.html",
            auth:'public'
        }).state('home.ranking', {
            url: "/ranking",
            controller: "RankingController as ranking",
            templateUrl: "../src/app/ranking/ranking.html",
            auth:'public'
        }).state('home.avalie', {
            url: "/avalie",
            controller: "AvalieController as avalie",
            templateUrl: "../src/app/avalie/avalie.html",
            auth:'public'
        }).state('home.duvidas', {
            url: "/duvidas",
            controller: "DuvidasController as duvidas",
            templateUrl: "../src/app/duvidas/duvidas.html",
            auth:'public'
        });
    $urlRouterProvider.otherwise("/");

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

    var pkGreen = $mdThemingProvider.extendPalette('teal', {
        '400': '#23C9BB',
        '500': '#11ADA0',
        '600': '#11A294',
        'contrastDefaultColor': 'light'
    });
    var pkDarkBlueGrey = $mdThemingProvider.extendPalette('blue-grey', {
        '50': '#E9F2F1',
        '500': '#354C5E',
        '800': '#2E4152',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50']
    });
    $mdThemingProvider.definePalette('pkGreen', pkGreen);
    $mdThemingProvider.definePalette('pkDarkBlueGrey', pkDarkBlueGrey);
    $mdThemingProvider.theme('default')
        .primaryPalette('pkGreen', {
            'default': '400',
            'hue-1': '500',
            'hue-2': '600'
        })
        .accentPalette('pkDarkBlueGrey', {
            'default': '500',
            'hue-1': '800',
            'hue-2': '50'
        })
        .backgroundPalette('pkDarkBlueGrey', {
            'default': '50'
        })

}

run.$inject = ['$rootScope', '$location', '$window', '$state'];
function run($rootScope, $location, $window, $state) {
    // initialise google analytics
    $window.ga('create', 'UA-83144910-1', 'auto');

    // track pageview on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
        if (document.location.hostname.search("politikei.org") !== -1) {
            $window.ga('send', 'pageview', $location.path());
        }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.auth === 'public') return;

        //Validate login here
        event.preventDefault();
        $state.go('^.^.root', {notify: false});

    });
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider'];


function MainController($scope, $mdMedia, $state) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
}

MainController.$inject = ["$scope", "$mdMedia", '$state'];


var politikei = angular
    .module('politikei', ['ui.router', 'ngMaterial', 'ngCookies', 'home', 'proposicoes', 'users', 'authorization'])
    .config(config)
    .run(run)
    .controller('MainController', MainController);

var configEndPoint = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIwMiwiaXNzIjoiaHR0cDpcL1wvcG9saXRpa2VpLWFwaS5oZXJva3VhcHAuY29tXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTczMjM2MiwiZXhwIjoxNDU1NzM1OTYyLCJuYmYiOjE0NTU3MzIzNjIsImp0aSI6IjU5MDI5MTU2MDE4MTJlYzQ0OGNmMzBmZmIxNmQ2ZGU1In0.-D5T4f2eA-l_fmKvave0n7djKihKMVgoG44GmG8scZM',
    server: 'http://politikei-api-v5.herokuapp.com/'
};

politikei.constant('app_config', configEndPoint);
