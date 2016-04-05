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
        .accentPalette('red')
        .backgroundPalette('grey', {
            'default': '200'
        })
});


politikei.constant('app_config', config);


politikei.controller('AppCtrl', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showHelp = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#appContainer')))
            .clickOutsideToClose(true)
            .templateUrl
            .title('Sobre o Politikei')
            .textContent('Esta é a versão web do Politikei')
            .ariaLabel('Sobre o Politikei')
            .ok('Entendi!')
            .targetEvent(ev)
        );
    }
});
