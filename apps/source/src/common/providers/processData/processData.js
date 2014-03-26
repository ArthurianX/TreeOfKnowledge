angular.module('zamolxian.processdata', ['zamolxian.authorization'])
/**
 * The purpose of this Provider is to run before everything else and provide the application the saved user data from
 * from localStorage, if any, if not, it will leave the 'userData' value as it is. Simplistic, but we need it to have
 * everything ready before initialization.
 *
 **/

    .provider('$processData', function DataSourceProvider() {
        //Here we do all the data manipulation logic? Do we?


        //Forcefully inject $auth :) to take advantage of the crypto storage TODO: << Better way ?
        var injector = angular.injector(['zamolxian.authorization']);
        var $auth = injector.get('$auth');


        //Creating an all purpose constructor for use outside of this provider.
        function DataSourceService(){
            /**
             * This constructor will provide us an API for the following actions:
             * - getUserData
             * - we have to split the userData for each service (
             * — preferencesService
             * — achievementsService
             * — userStatistics
             * — userNotificationFactory
             * — contextService
             * - getGlobalNotifications (alerts, new entries, updates on modules)
             * - getContext for current scope.
             * - getData for current scope, on the homepage it will be global.
             *
             * We need to display the notifications based on the userData presented (e.g. contextual),
             * Thus, before sending the notifications object to the runtime service we have to pre-process it here.
             *
             **/



            this.getUserData = function(data){
                //Here we will fetch the user info from the server and overwrite the localStorage userData on each run.
                //TODO: Create a case when the user was offline and he made some changes, read some stuff,  we need to sync the changes he made while offline to his server userData :(

                /**
                 * Regarging the user being offline, I can put up a flag in localStorage with that, and the next time the
                 * user gets online, we assume that on the server there has been no ACTIVITY change for the said client, so we will push the
                 * local activity to the server, not the other way around ... SANE ? Synchronization Service?
                 **/

                userData = data;
                $auth.storage().set('userData', data);

            };

            this.getGlobalNotifications = function(){
                //Fetch notifications object from the server
            };

            //This API method does actions in the DB based on the userData object.
            this.getUserNotifications = function(){
                //Here we will fetch the user info from the server.
            };

            //The getContext API Method  is an amalgam of actions the user CAN do on a given category or item.
            this.getContext = function(){
                //Here we will fetch the user info from the server.
            };

            //This API method will fetch us the category specific data from the server
            //TODO: This is deprecated, think of something new. We need to use the fetchService which will combine $auth and $processData
            this.getData = function(localScope){
                //localScope is the current page from where we are requesting this
                if (localScope == 'global') {
                    //Fetch global data
                } else {
                    //Fetch localScope data
                }
            };

        }
        //We will save the data in localstorage like this.
        var auth = false;
        if (auth) {
            window.localStorage.setItem('userData', JSON.stringify(userData));
        }



        this.$get = function(userData, $auth){

            return new DataSourceService();

        };
    });