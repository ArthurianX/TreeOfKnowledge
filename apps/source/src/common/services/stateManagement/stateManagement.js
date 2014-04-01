angular.module('zamolxian.state', ['zamolxian.authorization','zamolxian.processdata', 'zamolxian.fetcher', 'zamolxian.config'])

/**
 * This is the global State Management Logic
 * The service has to decide if the user is logged, if he needs to register or just to login.
 **/

    .service('localState', function ($auth, fetchService, userData, appConfig, $processData ) {


        /**
         * STATE MANAGEMENT LOGIC
         *
         - check if we have userData in localStorage, different than the .value
             - if we have userData in localStorage, put in in the .value and:
                 - send a response that a user is registered, local only, then propagate the scope with the data
                - check to see if we are connected to the internet:
                    — if we are connected to the internet:
                        —— do a timed query to the online server to check if the state and user is valid
                            —— if the response is valid, validate in the background the login - TRUE
                            —— if not valid
                                —— refreshToken if possible
                                    —— if token refresh ok, save new token - TRUE
                                    —— if TokenRefresh bad
                                        —— redirect to login to get a new token
                — if we are not connected to the internet
                    —— put up a watcher for the internet connection
                        - when the watcher responds true, we run the timed query again, WITH THE DO SYNCHRONIZATION FLAG

             - if we don’t have userData in localStorage check for hasRegistered
                — if we have hasRegistered this means the user has registered but never logged in, redirect to login,
                — if there is no hasRegistered, take the user to the new account.
         * */

        return function(syncroCheck) { // when syncroCheck is enable we will attempt to synchronize local data and online data.
            if ($auth.checkData('userData')) {

                //Assign the localStorage userData to the .value userData
                userData = $auth.storage.get('userData');

                //Reusable Token Procedure function
                //If online, try to verify the token by getting the user data
                var tokenProcedure = function() {

                    fetchService('GET', appConfig.endPoint.baseURL + appConfig.endPoint.userinfo, $auth.storage.get('activeToken')).then(function(data){

                        //See what kind of data we got.
                        if (data[0] !== undefined) {

                            //This means data is ok
                            console.log('SyncroCheck is ' + syncroCheck);
                            if (syncroCheck) {
                                //TODO: Synchronization function here.
                            }

                            //Update the userData in localStorage and in .value
                            $auth.storage.set('userData', data);
                            userData = $auth.storage.get('userData');

                            return 'ok-server';

                        } else {

                            //This means we have an error, try the refresh token.


                            //This means there is a problem with the request, errors below
                            console.log('/-/-/-/-/-/-/-/- ERROR -/-/-/-/-/-/-/-/-/');
                            console.log(data.config.headers);
                            console.log(data.config.url);
                            console.log(data.data);
                            console.log(data.status);

                            var tokenResponse = $auth.storage.get('tokenResponse');
                            //TODO: IF we already requested a token refresh, automatically return login.

                            if (tokenResponse.refresh_token !== undefined) {

                                //Try to refresh token
                                fetchService('POST', appConfig.endPoint.baseURL + appConfig.endPoint.token, $auth.storage.get('BasicAuthorization', 'server'), $auth.grant.refresh(tokenResponse.refresh_token)).then(function(data){

                                    //Save the new Token
                                    $auth.saveTokens(data);

                                    //Restart the token procedure to get the user data.
                                    tokenProcedure();
                                });

                            } else {
                                console.log('Token Refresh has failed, login process ahoy!');
                                return 'login';
                            }



                        }
                    });
                };


                //Create a setTimeout that will run after the local ok has been returned
                //TODO: setTimeout to skip return is hackish, is there no other way?
                setTimeout(function(){
                    console.log('Bypassing ok-local return, doing an online check');

                    //Check to see if App is online
                    if (appConfig.isOnline()) {

                        //Run tokenProcedure
                        tokenProcedure();

                    } else {
                        console.log('Online Check failed, remain at ok-local, SET UP WATCHER');
                        //Set Synchronization flag to true if we get here
                        syncroCheck = true;

                        //Watch for appConfig.isOnline()
                        //TODO: Set proper watcher

                        //If the value has changed, run the tokenProcedure again
                        //tokenProcedure();



                    }

                }, 100);

                return 'ok-local';

            } else {
                if ($auth.checkData('hasRegistered')){
                    return 'login';
                } else {
                    return 'coach'; //With login option, just in case
                }
            }
        };

    });



