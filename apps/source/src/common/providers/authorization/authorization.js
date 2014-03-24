angular.module('zamolxian.authorization', [])

/**
 * authorization API ???
 **/

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

            //get clientID, clientSecret and other details.
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
            //Receive Tokens Object from the authorization server and process them.
            this.getTokens = function(response){

                //The object response body containing all the tokens and types is the response variable

                //Dummy
                var response = {
                    access_token: "tGiyzawtOIUjM91NbQ5PnI9CnmFP6gKAA2EdwafpKMZumwOozXBApIQV7YUbtHyWiO3e7N0CLxhrJYGr9bKEqKlJTozRwLRmmBeu9N4iiMQFgs39BAoVJnPqizZpPhrMkmNy3AYR43A2ZAcSMWY7ZGBjqbsp9eCjAIkaCU84EP87zGlXrd0HX88UVxe98uBJEMvrodBAszGKgpDrR4XBA8kALfOWhzY34z9ERB03JeZUVxavEYbYZASvU4L0fSmP",
                    refresh_token: "Jk6dC7MTeHHAkXA6d9zLE0VH66VtrCE1gIKuzy5mICvOYe0WbCt0VgACTyEGoSNQU5Q4DCVz8wVXWlbiuXQ0gjvDpZKOr8eOT7wmZvq485w2kY9D4jZS7fFyfHealQYlKDg9ONW70EmmxmHv15kI1DAVaN3YvMwjchomGpZjmyxzvZjbOKfVFDbQr5zx3pnpWkUBjh3zRtvx5hQyp8YNPqfp9BIb0SW1ANs3PPFSFqyfPnN33DX41UVM1l8cAQsS",
                    expires_in: 3600,
                    token_type: "bearer"
                };

                //Calculate the expiration date.
                var expiration_date = new Date().getTime() + response.expires_in;
                // ^^^ If 3600 default is milisecons, is ok, but highly improbable, TODO: multiply expires_in to convert in miliseconds
                response.expires_on = expiration_date;

                saveToken(response);
            }

            this.doTransaction = function(){
                if (expirationCheck()) {
                    var tokenData = authStorage().getData("tokens");
                    return tokenData.access_token;   //TODO: Need to format this output with the token AND the auth data to be passed on $http
                } else {
                    refreshToken();
                    var tokenData = authStorage().getData("tokens");
                    return tokenData.access_token; //TODO: Need to format this output with the token AND the auth data to be passed on $http
                }
            }

        }

        //Private Functions that help our Constructor.
        var crypto = function(){

            //Options for encryption/decryption come here
            //...

            return {
                encrypt: function(data){
                    return window.btoa(data); //Base64 Encoding for the masses.
                },
                decrypt: function(data){
                    return window.atob(data); //Base64 Decoding for the masses.
                }
            }

            //TODO: Change encryption algorithm to Stanford JavaScript Crypto Library
            var password, cyphertext, params, rp;
            sjcl.json.encrypt(password, ciphertext, params, rp); //encrypt
            sjcl.json.decrypt(password, ciphertext, params, rp); //decrypt
            //RANDOM NUMBER http://bitwiseshiftleft.github.io/sjcl/doc/symbols/sjcl.prng.html

        }

        var processMessage = function(message) {
            //It depends on the object we will be receiving, but here I am aiming to store the received data and to encrypt it for passing on.
            if (message !== undefined) {

                //TODO: Decrypt data here and populate the localStorage with each value encrypted.

                var cleanMessage = JSON.parse(crypto().decrypt(message));

                //TODO: Replace dummy message with actual message response, then delete below
                authStorage().setData("clientID", crypto().encrypt(dummyMessage.clientId));
                authStorage().setData("clientSecret", crypto().encrypt(dummyMessage.clientSecret));
                authStorage().setData("deviceName", crypto().encrypt(dummyMessage.deviceName));

                //TODO: Process client keys here, concatenate them with :, then encrypt them and save them in localStorage.

                var concatenatedKeys = crypto().encrypt(cleanMessage.clientId + ":" + cleanMessage.clientSecret);

                authStorage().setData("Authorization", concatenatedKeys);


            }
        }

        var authStorage = function(){

            //Setter and Getter methods to communicate with localStorage
            //TODO: Create a more advanced handler for storing :)
            return {
                setData: function(key, data){
                    return window.localStorage.setItem(key, JSON.stringify(data));
                },
                getData: function(key){
                    return JSON.parse(window.localStorage.getItem(key));
                },
                checkData: function(key){
                    return window.localStorage.key(key)
                }
            }

        }

        var saveToken = function(tokenData){
            authStorage().setData("tokens", tokenData);
        }

        var refreshToken = function(){
            var tokenData = authStorage().getData("tokens");
            tokenData.access_token = tokenData.refresh_token;
            authStorage().setData("tokens", tokenData);

        }

        var expirationCheck = function(){
            if (authStorage().checkData("tokens") !== null) {
                var tokenData = authStorage().getData("tokens");
                return new Date().getTime() > tokenData.expires_on;
            } else {
                console.log("expirationCheck, no tokens saved in localStorage");
            }
        }


        this.$get = function(){
            return new AuthorizationService();
        };
    });
