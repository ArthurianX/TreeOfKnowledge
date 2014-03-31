angular.module('zamolxian.state', ['zamolxian.authorization', 'zamolxian.fetcher', 'zamolxian.config'])

/**
 * This is the global State Management
 *
 **/

    .service('actualState', function ($auth, fetchService, userData, appConfig) {

        var StateManagement = function(){
            this.check = {
                local: function(){

                    //For the moment, compare the userData values versus the localStorage one
                    if (userData !== $auth.storage.get('userData')) {
                        return true;
                    } else {
                        return false;
                    }

                },
                server: function(){

                    //First we're checking to see if we are online.
                    if (appConfig.isOnline()) {
                        fetchService('GET', endPoint.baseURL + endPoint.userinfo, $auth.storage.get('activeToken'/*, 'local' || 'server' */)).then(function(data){
                            if (data) {
                                //TODO: Check sanity of the above check, maybe the user is not logged
                                //Update the user data in the process
                                $processData.getUserData(data);
                                return true;
                            } else {
                                //Means something is wrong, usually token expired, start re-authentication procedure or refresh token if one available
                                //TODO: Maybe start re-auth process here ? hard to do it in app.js, have to wait for the answer etc etc.
                                return false;
                            }
                        });
                    } else {
                      //TODO: $watch for the isOnline Value Change.
                    }

                }
            };

        };

        return new StateManagement();


    });



