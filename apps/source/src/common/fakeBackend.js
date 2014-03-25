angular.module('zamolxian.fakebackend', ['ngMockE2E'])

    /**
     * Fake Backend $http Injector, to mock communication with the server. DELETE WHEN DONE
     **/

    .run(function ($httpBackend) {

        /**Dummy Data **/

        //This should be received
        var tokenData = {
            access_token: "tGiyzawtOIUjM91NbQ5PnI9CnmFP6gKAA2EdwafpKMZumwOozXBApIQV7YUbtHyWiO3e7N0CLxhrJYGr9bKEqKlJTozRwLRmmBeu9N4iiMQFgs39BAoVJnPqizZpPhrMkmNy3AYR43A2ZAcSMWY7ZGBjqbsp9eCjAIkaCU84EP87zGlXrd0HX88UVxe98uBJEMvrodBAszGKgpDrR4XBA8kALfOWhzY34z9ERB03JeZUVxavEYbYZASvU4L0fSmP",
            refresh_token: "Jk6dC7MTeHHAkXA6d9zLE0VH66VtrCE1gIKuzy5mICvOYe0WbCt0VgACTyEGoSNQU5Q4DCVz8wVXWlbiuXQ0gjvDpZKOr8eOT7wmZvq485w2kY9D4jZS7fFyfHealQYlKDg9ONW70EmmxmHv15kI1DAVaN3YvMwjchomGpZjmyxzvZjbOKfVFDbQr5zx3pnpWkUBjh3zRtvx5hQyp8YNPqfp9BIb0SW1ANs3PPFSFqyfPnN33DX41UVM1l8cAQsS",
            expires_in: 3600,
            token_type: "bearer"
        };

        //This should be injected upwards from the iframe
        var client = {
            id: '1',
            name: 'Samplr',
            clientId: 'abc123',
            clientSecret: 'ssh-secret',
            deviceName: 'Erik\'s iPhone'
        };

        var userInfo = {
            "user_id": "1",
            "name": "Bob Smith",
            "scope": "*"
        };
        //TODO: Populate here with a lot of actual dummy data.


        // Do your mock
        var baseApiUrl = 'http://localhost:3000/';

        $httpBackend.whenGET(baseApiUrl + 'oauth/token')
            .respond(tokenData);

        $httpBackend.whenGET(baseApiUrl + 'api/userinfo')
            .respond(userInfo);

    });