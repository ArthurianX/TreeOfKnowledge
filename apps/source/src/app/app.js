angular.module('zamolxian', [
        'templates-app',
        'templates-common',
        'zamolxian.fakebackend', //TODO: Remove this when done...
        /*VVV App Config VVV*/
        'zamolxian.config',
        /*VVV Ionic VVV*/
        'ionic',
        /*VVV Providers VVV*/
        'zamolxian.authorization',
        'zamolxian.datasource',
        /*VVV Factories VVV*/
        'zamolxian.globalnotification',
        'zamolxian.usernotification',
        'zamolxian.listingfactory',
        /*VVV Services VVV*/
        'zamolxian.achievements',
        'zamolxian.coaching',
        'zamolxian.context',
        'zamolxian.listing',
        'zamolxian.notification',
        'zamolxian.preferences',
        'zamolxian.search',
        'zamolxian.statistics',
        /*VVV Directives VVV*/
        //
        /*VVV Pages VVV*/
        'zamolxian.home',
        'zamolxian.docs',
        'zamolxian.tutorials',
        'zamolxian.community',
        'zamolxian.tips',
        'zamolxian.modules',
        'zamolxian.reading',
        'zamolxian.books',
        'zamolxian.irc',
        'zamolxian.settings',
        'zamolxian.myaccount'

    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            // setup an abstract state for the sidemenu directive
            .state('sidemenu', {
                url: "/sidemenu",
                abstract: true,
                templateUrl: "templates/sidemenu.tpl.html"
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sidemenu/home');

    })

    /*.config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, $anchorScrollProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $logProvider.debugEnabled(false);

        $urlRouterProvider.otherwise('/home');

        $anchorScrollProvider.disableAutoScrolling();

    })*/

    /*.run(function run($rootScope) {
        //Set body class for individual route pages.
        $rootScope.$on('$stateChangeSuccess', function (event, currentState) {
            $rootScope.getCurrentLocation = function () {
                return currentState.name + '-page';
            };
            if ($rootScope.debugStatus === true) {
                console.log('We are on the "' + currentState.name + '" page.');
            }
        });

    })*/

    .controller('AppCtrl', function AppCtrl($scope, $location, $stateParams, $sce, authorization, dataSource) {
        //Get active menu
        $scope.isItemActive = function(item) {
            return $location.path().indexOf(item) > -1;
        };

        /**
         * Testing data and functions
         **/
        //TODO: Build a service after everything works you can call with different parameters to get stuff (iframe, auth, login, data etc.)


        //Start the authorization.getAuthCode() listener before the iframe is loaded.
        function runAuth(){
            authorization.getAuthCode();
        }
        runAuth();

        //$sce - Strict Contextual Escaping
        //Dummy Registration
        $scope.doRegistration = function() {

            console.log('DUMMY - doRegistration');
            //http://deusxmachina.org/dummytok.html
            $scope.theIframe = '<iframe src="http://deusxmachina.org/dummytok.html" frameborder="0"></iframe>';
            $scope.insertIframe = function() {
                return $sce.trustAsHtml($scope.theIframe);
            };

        };

        //Dummy Login
        $scope.doLogin = function() {
            console.log('DUMMY - doLogin');


            foursquare.getAllData().then(function(data){})

        };

        $scope.getFirstData = function() {
            console.log('DUMMY - getFirstData');
        };



        /**
         * Testing data END
         **/


        $scope.greeting = 'Welcome';



    })
;