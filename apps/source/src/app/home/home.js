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
                templateUrl: 'home/home-list.tpl.html'
                /*,controller: 'HomeCtrl'*/
            })
            .state('sidemenu.home.login', {
                templateUrl: 'home/home-login.tpl.html'
                /*,controller: 'HomeCtrl'*/
            })
            .state('sidemenu.home.register', {
                templateUrl: 'home/home-register.tpl.html'
                /*,controller: 'HomeCtrl'*/
            })
            .state('sidemenu.home.coach', {
                templateUrl: 'home/home-coach.tpl.html'
                /*,controller: 'HomeCtrl'*/
            })
            ;
    })

    .controller('HomeCtrl', function HomeController($scope, $state, localState) {

        /**
         * ===== FIRST LOGIC =====
         **/

        //Redirect the user to the appropriate page.
        switch (localState()) {
            case "ok-local":
                $state.transitionTo('sidemenu.home.list');
                break;
            case "register":
                $state.transitionTo('sidemenu.home.register');
                break;
            case "login":
                $state.transitionTo('sidemenu.home.login');
                break;
            case "coach":
                $state.transitionTo('sidemenu.home.coach');
                break;
        }


        /**
         * ===== COACHING =====
        **/
        var coachCompleted = function(){
            //Call this function when coach has been completed or skipped to redirect to register page.
            $state.transitionTo('sidemenu.home.register');
        };
    })

;

