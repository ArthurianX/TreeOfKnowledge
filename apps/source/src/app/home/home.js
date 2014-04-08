angular.module('zamolxian.home', ['zamolxian.state', 'ionic'])

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
            .state('sidemenu.home.list', {
                url: '/list',
                templateUrl: 'home/home-list.tpl.html',
                controller: 'ListCtrl'
            })
            .state('sidemenu.home.login', {
                url: '/login',
                templateUrl: 'home/home-login.tpl.html',
                controller: 'LoginCtrl'
            })
            .state('sidemenu.home.register', {
                url: '/register',
                templateUrl: 'home/home-register.tpl.html',
                controller: 'RegisterCtrl'
            })
            .state('sidemenu.home.coach', {
                url: '/coach',
                templateUrl: 'home/home-coach.tpl.html',
                controller: 'CoachCtrl'
            })
        ;
    })

    .run(function($rootScope){


    })

    .controller('HomeCtrl', function HomeController($scope, $rootScope, $state, $location, localState) {

        /**
         * EVENT EMITTERS
         * @event:auth-loginSuccess - Login has been succesfull, let everybody know.
         * @event:auth-loginFailed  - Login has failed, do something.
         * @event:auth-okServer     - Server challenge ok, user is logged in.
         * @event:auth-okLocal      - Local challenge ok, user appears to be logged in.
         * @event:auth-login        - Go to login
         * @event:general-coach     - Start the coach
         **/


        /**
         * ===== FIRST LOGIC =====
         *
         * redirection and such.
         **/

        localState.listen('event:auth-okLocal', function(e, data) {
            //console.log('EVENT: auth-okLocal has been triggered');
            $state.transitionTo('sidemenu.home.list');
            //$location.path('/sidemenu/home/list');
        });


        localState.listen('event:auth-login', function(e, data) {
            //console.log('EVENT: auth-login has been triggered');
            //$state.transitionTo('sidemenu.home.login');
            //$location.path('/sidemenu/home/login');
        });


        localState.listen('event:general-coach', function(data) {
            //console.log('EVENT: general-coach has been triggered');
            //$state.transitionTo('sidemenu.home.coach');
            //$location.path('/sidemenu/home/coach');
        });



        //After we have all the listeners in place do the checking & broadcasting.
        localState.check();







        /**
         * ===== COACHING =====
         **/
        var coachCompleted = function(){
            //Call this function when coach has been completed or skipped to redirect to register page.
            //$state.transitionTo('sidemenu.home.register');
            $location.path('/sidemenu/home/register');
        };



        /**
         * ===== REGISTER =====
         **/



        /**
         * ===== LOGIN =====
         **/



        /**
         * ===== LISTING =====
         **/
    })

    .controller('ListCtrl', function ListController($scope, $location, $state, localState) {
        console.log('Hello from listCtrl');
        //$state.transitionTo('sidemenu.home.login');
        $scope.doLogin = function(){
            $state.transitionTo('sidemenu.home.login');
        };
    })
    .controller('LoginCtrl', function LoginController($scope, $state, localState) {
        console.log('Hello from loginCtrl');
    })
    .controller('RegisterCtrl', function RegisterController($scope, $state, localState) {
        console.log('Hello from registerCtrl');
    })
    .controller('CoachCtrl', function CoachController($scope, $state, localState) {
        console.log('Hello from coachCtrl');
    })

;

