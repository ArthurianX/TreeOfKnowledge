angular.module('zamolxian', [
        'templates-app',
        'templates-common',
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
        'zamolxian.fetcher', //Main data fetcher, we'll feed it with req info from authorization and dataSources
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

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            // setup an abstract state for the sidemenu directive
            .state('sidemenu', {
                url: "/sidemenu",
                abstract: true,
                templateUrl: "templates/sidemenu.tpl.html"
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sidemenu/home');


        //Reset headers to avoid OPTIONS request (aka preflight)
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

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

    .controller('AppCtrl', function AppCtrl($scope, $location, $stateParams, $sce, $window, authorization, dataSource, fetchService /* TESTING, $http*/) {
        //Get active menu
        $scope.isItemActive = function(item) {
            return $location.path().indexOf(item) > -1;
        };

        /**
         * Testing data and functions
         **/
            //TODO: Build a service after everything works you can call with different parameters to get stuff (iframe, auth, login, data etc.)


            //Start the authorization.getAuthCode() listener before the iframe is loaded. TODO: Make it conditional.
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

            //Params:  --method--       --url--                        --Authorization Basic/Bearer Token--                                        --data--
            fetchService('POST', 'https://localhost:3000/oauth/token', authorization.getFromStorageToServer('Authorization'), authorization.grantTypePassword('bob', 'secret')).then(function(data){
                authorization.saveTokens(data);
            });


            /**
             * For testing purposes, on localhost, for everything to work, I have to:
             * 1. Open localhost:3000 in browser and accept the https error.
             * 2. Start Chrome from terminal with the flags 'open -a Google\ Chrome --args --disable-web-security'
             * FFS!!!
             *
             * VVVV Below we have the generic testing $http call, use it when everything else fails.
             **/

            /*return $http({
             url: 'https://localhost:3000/oauth/token',
             method: 'POST',
             data: 'grant_type=password&username=bob&password=secret&scope=offline_access',
             headers: {
             'Authorization': 'Basic YWJjMTIzOnNzaC1zZWNyZXQ',
             'Access-Control-Allow-Origin': 'https://localhost:3000',
             'Accept': 'application/x-www-form-urlencoded',
             'Content-Type': 'application/x-www-form-urlencoded'
             }
             })
             .success(function(dataX, status, headersX, config) {
             // this callback will be called asynchronously
             // when the response is available
             console.log(dataX);
             console.log(status);
             console.log(headersX);
             console.log(config);
             })
             .error(function(dataX, status, headersX, config) {
             console.log(dataX);
             console.log(status);
             console.log(headersX);
             console.log(config);
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             });*/

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