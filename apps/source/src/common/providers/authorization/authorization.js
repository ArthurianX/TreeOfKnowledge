angular.module('zamolxian.authorization', [])
/**
 * authorization API ???
 **/

    //TODO: We might do a handshake in this phase to check a possible locally saved token to verify against our server, and maybe refresh it.

    .provider('authorization', function AuthorizationProvider() {

        /* DUMMY DATA that we should be receiving */
        var tokens = {
            access_token: "tGiyzawtOIUjM91NbQ5PnI9CnmFP6gKAA2EdwafpKMZumwOozXBApIQV7YUbtHyWiO3e7N0CLxhrJYGr9bKEqKlJTozRwLRmmBeu9N4iiMQFgs39BAoVJnPqizZpPhrMkmNy3AYR43A2ZAcSMWY7ZGBjqbsp9eCjAIkaCU84EP87zGlXrd0HX88UVxe98uBJEMvrodBAszGKgpDrR4XBA8kALfOWhzY34z9ERB03JeZUVxavEYbYZASvU4L0fSmP",
            refresh_token: "Jk6dC7MTeHHAkXA6d9zLE0VH66VtrCE1gIKuzy5mICvOYe0WbCt0VgACTyEGoSNQU5Q4DCVz8wVXWlbiuXQ0gjvDpZKOr8eOT7wmZvq485w2kY9D4jZS7fFyfHealQYlKDg9ONW70EmmxmHv15kI1DAVaN3YvMwjchomGpZjmyxzvZjbOKfVFDbQr5zx3pnpWkUBjh3zRtvx5hQyp8YNPqfp9BIb0SW1ANs3PPFSFqyfPnN33DX41UVM1l8cAQsS",
            expires_in: 3600,
            token_type: "bearer"
        }

        var thisClient = {
            id: '1',
            name: 'Samplr',
            clientId: 'abc123',
            clientSecret: 'ssh-secret',
            deviceName: 'Erik\'s iPhone'
        }

        var server_url = "http://localhost:3000";


        //^^^ TODO: Standardize the object we will be receiving from postMessage in iframe
        //Up until then, we are assuming this is what we are receiving
        var dummyMessage = {
            clientID: "23242413",
            clientSecret: "1123123123",
            deviceName: "Erik's iPhone"
        }

        /*DUMMY DATA END*/

        //Public Constructor that defines our API
        function AuthorizationService(){

            /**
             * AuthorizationService exposed API Methods
             **/

            //get clientID and clientSecret
            this.getAuthCode = function(){

                //Add an event listener to messages from the iFrame new account page.
                window.addEventListener("message", receiveMessage, false);

                //Receive the message
                function receiveMessage(event)
                {
                    if (event.origin !== server_url){return;}
                    //Send the data response to the process function.
                    processMessage(event.data);


                }

            }

            this.getTokens = function(response){
                //The object containing all the tokens and types is the response variable
                return response;
            }

            this.doTransaction = function(token){
                if (expirationCheck()) {
                    return token;
                } else {
                    return refreshToken(token);
                }
            }

        }

        //Private Functions that help our Constructor.
        var encrypt = function(data){
            //TODO: Change encryption algorithm
            return window.btoa(data); //Base64 Encoding for the masses.
        }

        var processMessage = function(message) {
            //It depends on the object we will be receiving, but here I am aiming to store the received data and to encrypt it for passing on.
            if (message !== undefined) {
                //TODO: Replace dummy message with actual message response
                authStorage().setData("clientID", dummyMessage.clientId);
                authStorage().setData("clientSecret", dummyMessage.clientSecret);
                authStorage().setData("deviceName", dummyMessage.deviceName);
                authStorage().setData("AuthorizationString", encrypt(dummyMessage.clientID + ":" + dummyMessage.clientSecret));
            }
        }

        var authStorage = function(){

            //Setter and Getter methods to communicate with localStorage
            return {
                setData: function(key, data){
                    return window.localStorage.setItem(key, JSON.stringify(data));
                },
                getData: function(key){
                    var theData = window.localStorage.getItem(key);
                    return JSON.parse(theData);
                }
            }

        }

        var refreshToken = function(){

        }

        var expirationCheck = function(){

        }


        this.$get = function(){
            return new AuthorizationService();
        };
    });
