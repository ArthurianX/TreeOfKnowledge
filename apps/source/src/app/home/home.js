angular.module('zamolxian.home', ['ionic'])

    .config(function config($stateProvider) {
        $stateProvider
            .state('sidemenu.home', {
                url: '/home',
                views: {
                    'topView': {
                        controller: 'HomeCtrl',
                        templateUrl: 'home/home.tpl.html'
                    }
                }
            })
            .state('sidemenu.home.login', {
                url: '/home/login',
                views: {
                    'homeView': {
                        controller: 'HomeCtrl',
                        templateUrl: 'home/home-login.tpl.html'
                    }
                }
            })
            .state('sidemenu.home.register', {
                url: '/home/register',
                views: {
                    'homeView': {
                        controller: 'HomeCtrl',
                        templateUrl: 'home/home-register.tpl.html'
                    }
                }
            })
            .state('sidemenu.home.coach', {
                url: '/home/coach',
                views: {
                    'homeView': {
                        controller: 'HomeCtrl',
                        templateUrl: 'home/home-coach.tpl.html'
                    }
                }
            });
    })

    .controller('HomeCtrl', function HomeController($scope) {

    })

;

