angular.module('zamolxian.state', ['zamolxian.authorization', 'zamolxian.fetcher', 'zamolxian.config'])

/**
 * This is the global State Management
 *
 **/

    .service('actualState', function ($auth, fetchService, userData, endPoint) {

        var StateManagement = function(){
            this.check = {
                local: function(){
                    //TODO: In auth service after succesfull registration & Login, make sure to put up a flag with logged.

                    //For the moment, compare the userData values versus the localStorage One
                    if (userData !== $auth.storage.get('userData')) {
                        return true;
                    } else {
                        return false;
                    }

                },
                server: function(){
                    //TODO: Do not forget to check for internet connection.

                    return true;
                }
            };

        };

        return new StateManagement();


    });



