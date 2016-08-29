function config($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, OAuthProvider) {

    $stateProvider
        .state('root', {
            url: '/',
            controller: 'HomeController as home',
            templateUrl: '../src/public/home/launch_landing.html',
            auth: 'public',
        })
        .state('demo', {
            url: '/demo',
            controller: 'HomeController as home',
            templateUrl: '../src/public/home/index.html',
            auth: 'public'
        })
        .state('home', {
            url: '/home',
            controller: "AppHomeController as appHome",
            templateUrl: "../src/app/app-home.html",
            auth: 'private'
        }).state('home.proposicoes', {
            url: "/proposicoes",
            controller: "ProposicaoController as proposicoes",
            templateUrl: "../src/app/proposicoes/view/index.html",
            auth: 'private'
        }).state('home.ranking', {
            url: "/ranking",
            controller: "RankingController as ranking",
            templateUrl: "../src/app/ranking/ranking.html",
            auth: 'private'
        }).state('home.avalie', {
            url: "/avalie",
            controller: "AvalieController as avalie",
            templateUrl: "../src/app/avalie/avalie.html",
            auth: 'private'
        }).state('home.duvidas', {
            url: "/duvidas",
            controller: "DuvidasController as duvidas",
            templateUrl: "../src/app/duvidas/duvidas.html",
            auth: 'private'
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
        });

    OAuthProvider.configure({
        baseUrl: 'https://api.website.com',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET' // optional
    });
}

run.$inject = ['$rootScope', '$location', '$window', '$state'];
function run($rootScope, $location, $window, $state) {
    // initialise google analytics
    $window.ga('create', 'UA-83144910-1', 'auto');

    // track pageview on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
        $window.ga('send', 'pageview', $location.path());
    });

    //route access
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.auth === 'public') return;

        console.log('=============== '+JSON.stringify(fromState));

        //Validate login here
        FB.getLoginStatus(function (response) {
            console.log('=============== '+JSON.stringify(response.status));
            if (!response.status || response.status !== 'connected') {
                event.preventDefault();
                $state.go('^.^.demo', { notify: false });
            }
        });
    });

    //oauth2 error handler
    $rootScope.$on('oauth:error', function (event, rejection) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === rejection.data.error) {
            return;
        }

        // Refresh token when a `invalid_token` error occurs.
        if ('invalid_token' === rejection.data.error) {
            return OAuth.getRefreshToken();
        }

        // Redirect to `/login` with the `error_reason`.
        return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
}

config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider', 'OAuthProvider'];

function MainController($scope, $mdMedia, $state) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
}

MainController.$inject = ["$scope", "$mdMedia", '$state'];


var politikei = angular
    .module('politikei', ['ui.router', 'ngMaterial', 'ngCookies', 'home', 'proposicoes', 'users', 'authorization', 'angular-oauth2'])
    .config(config)
    .run(run)
    .controller('MainController', MainController);

var configEndPoint = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIwMiwiaXNzIjoiaHR0cDpcL1wvcG9saXRpa2VpLWFwaS5oZXJva3VhcHAuY29tXC9hcGlcL3YxXC9hdXRoXC9mYWNlYm9vayIsImlhdCI6MTQ1NTczMjM2MiwiZXhwIjoxNDU1NzM1OTYyLCJuYmYiOjE0NTU3MzIzNjIsImp0aSI6IjU5MDI5MTU2MDE4MTJlYzQ0OGNmMzBmZmIxNmQ2ZGU1In0.-D5T4f2eA-l_fmKvave0n7djKihKMVgoG44GmG8scZM',
    server: 'http://politikei-api-v5.herokuapp.com/'
};

politikei.constant('app_config', configEndPoint);
