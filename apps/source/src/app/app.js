angular.module('zamolxian', [
        'templates-app',
        'templates-common',
        /*VVV App Config VVV*/
        'zamolxian.config',
        /*VVV Ionic VVV*/
        'ionic',
        /*VVV Providers VVV*/
        'zamolxian.authorization',
        'zamolxian.processdata',
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

    .controller('AppCtrl', function AppCtrl($scope, $location, $stateParams, $sce, $window, $auth, $processData, fetchService /* TESTING, $http*/) {
        //Get active menu
        $scope.isItemActive = function(item) {
            return $location.path().indexOf(item) > -1;
        };

        /**
         * Testing data and functions
         **/

        //Dummy Registration
        $scope.doRegistration = function() {
            console.log('DUMMY - doRegistration');

            //Start the postMessage Event Listener
            $auth.getClientInfo();

            //Inject the iFrame and parse it as trusted content
            $scope.theIframe = '<iframe src="http://deusxmachina.org/dummytok.html" frameborder="0"></iframe>';
            $scope.insertIframe = function() {
                return $sce.trustAsHtml($scope.theIframe);
            };

        };

        //Dummy Login
        $scope.doLogin = function() {
            console.log('DUMMY - doLogin');

            //Params:  --method--       --url--                        --Authorization Basic/Bearer Token--                                        --data--
            fetchService('POST', 'https://localhost:3000/oauth/token', $auth.getFromStorageToServer('BasicAuthorization'), $auth.grantTypePassword('bob', 'secret')).then(function(data){
                $auth.saveTokens(data);

                //TODO: We're simulating basic login here, need to change this A LOT!
                //TODO: Something like, IF NOT NEW ACCOUNT & LOGIN, THEN OPEN IFRAME TO LOGIN.
                //Params:  --method--       --url--                        --Authorization Basic/Bearer Token--
                fetchService('GET', 'https://localhost:3000/api/userinfo', $auth.getFromStorageToServer('activeToken')).then(function(data){

                    $processData.getUserData(data);
                });
                //We are assuming that the token is not expired when we're first calling for the user data.

                //TODO: Switch to $auth doTransaction and find a way to ask for a new token when it expires, replacing the current fetchService entirely and putting it in a queue.

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