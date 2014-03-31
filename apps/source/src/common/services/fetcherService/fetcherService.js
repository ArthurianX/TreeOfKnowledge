angular.module('zamolxian.fetcher', [])

/**
 * This will be a global fetch service used to fetch all data that we need
 * It needs to be customizable enough to apply on any situation
 **/

    .service('fetchService', function ($q, $http) {

        //We will probably at some point do some stuff before the return methods


        return function (method, url, headers, data) {

            /** PARAMETERS
             * method: POST, GET, PUT etc
             * url
             * headers: JSON Object
             * data: JSON Object
             * Content-Type: application/x-www-form-urlencoded
             **/

            if (method === "GET") {

                return $q.all([
                        $http({
                            method: method,
                            url: url,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Access-Control-Allow-Origin': '*',
                                'Authorization': 'Bearer ' + headers
                            }
                        })
                    ]).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            aggregatedData = aggregatedData.concat(result.data);
                        });
                        return aggregatedData;
                    }).catch(function(res){
                        //console.log(res);
                        return res;
                    });

            } else if (method === "POST") {

                return $q.all([
                        $http({
                            method: method,
                            url: url,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Access-Control-Allow-Origin': '*',
                                'Authorization': 'Basic ' + headers
                            },
                            data: data
                        })
                    ]).then(function (results) {
                        var aggregatedData = [];
                        angular.forEach(results, function (result) {
                            aggregatedData = aggregatedData.concat(result.data);
                        });
                        return aggregatedData;
                    }).catch(function(res){
                        //console.log(res);
                        return res;
                    });
            }

        };


    });



