angular.module('zamolxian.fetcher', [])

    /**
     * This will be a global fetch service used to fetch all data that we need
     * It needs to be customizable enough to apply on any situation
     **/

    .service('fetchService', function(){

        //We will probably at some point do some stuff before the return methods


        return {
            getTokens: function (location, section) {

                return $q.all([
                        $http.get('https://api.foursquare.com')
                    ]).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            aggregatedData = aggregatedData.concat(result.data);
                        });
                        return aggregatedData;
                    });
            }
        };



    });

