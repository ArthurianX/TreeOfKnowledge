angular.module('zamolxian.authorization', [])

/**
 * authorization API ???
 **/

    .provider('authorization', function AuthorizationProvider() {

        var server_url = "http://deusxmachina.org"; //TODO: Change to server URL

        //^^^ TODO: Standardize the object we will be receiving from postMessage in iframe

        //Public Constructor that defines our API
        function AuthorizationService() {

            /**
             * AuthorizationService exposed API Methods
             **/

            //get clientID, clientSecret and other details.
            this.getAuthCode = function() {

                console.log('TESTING - postMessage listener is starting');

                //Add an event listener to messages from the iFrame new account page.
                window.addEventListener("message", receiveMessage, false);

                //Receive the message
                function receiveMessage(event)
                {
                    console.log('TESTING - postMessage has fired.');
                    if (event.origin !== server_url){return;}
                    console.log('TESTING - postMessage has been received:');
                    console.log(event.data);
                    //Send the data response to the process function.
                    processMessage(event.data);

                }

            };
            //Receive Tokens Object from the authorization server and process them.
            this.getTokens = function(response){

                //The object response body containing all the tokens and types is the response variable

                //Calculate the expiration date.
                var expiration_date = new Date().getTime() + response.expires_in;
                // ^^^ If 3600 default is milisecons, is ok, but highly improbable, TODO: multiply expires_in to convert in miliseconds
                response.expires_on = expiration_date;

                saveToken(response);
            };

            this.doTransaction = function(){
                var tokenData = authStorage().getData("tokens");
                if (expirationCheck()) {
                    return tokenData.access_token;   //TODO: Need to format this output with the token AND the auth data to be passed on $http
                } else {
                    refreshToken();
                    tokenData = authStorage().getData("tokens");
                    return tokenData.access_token; //TODO: Need to format this output with the token AND the auth data to be passed on $http
                }
            };

        }

        //Private Functions that help our Constructor.
        var crypto = function(){

            //Options for encryption/decryption come here
            //...


            //TODO: Change encryption algorithm to Stanford JavaScript Crypto Library
            var password, cyphertext, params, rp;
            if (password == "cucu") {
                sjcl.json.encrypt(password, ciphertext, params, rp); //encrypt
                sjcl.json.decrypt(password, ciphertext, params, rp); //decrypt
            }
            //RANDOM NUMBER http://bitwiseshiftleft.github.io/sjcl/doc/symbols/sjcl.prng.html


            return {
                encrypt: function(data){
                    return window.btoa(data); //Base64 Encoding for the masses.
                },
                decrypt: function(data){
                    return window.atob(data); //Base64 Decoding for the masses.
                }
            };



        };

        var processMessage = function(message) {
            //It depends on the object we will be receiving, but here I am aiming to store the received data and to encrypt it for passing on.
            if (message !== undefined) {

                //TODO: Decrypt data here and populate the localStorage with each value encrypted.

                //message = JSON.parse(crypto().decrypt('YWJjMTIzOnNzaC1zZWNyZXQ='));//We will use this when we send encrypted messages, not atm, TODO: < read before


                authStorage().setData("clientID", crypto().encrypt(message.clientId));
                authStorage().setData("clientSecret", crypto().encrypt(message.clientSecret));
                authStorage().setData("deviceName", crypto().encrypt(message.deviceName));

                var concatenatedKeys = crypto().encrypt(message.clientId + ":" + message.clientSecret);

                authStorage().setData("Authorization", concatenatedKeys);

                console.log('TESTING - processMessage has added all the encrypted values to localStorage');



            }
        };

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
                    return window.localStorage.key(key);
                }
            };

        };

        var saveToken = function(tokenData){
            authStorage().setData("tokens", tokenData);
        };

        var refreshToken = function(){
            var tokenData = authStorage().getData("tokens");
            tokenData.access_token = tokenData.refresh_token;
            authStorage().setData("tokens", tokenData);

        };

        var expirationCheck = function(){
            if (authStorage().checkData("tokens") !== null) {
                var tokenData = authStorage().getData("tokens");
                return new Date().getTime() > tokenData.expires_on;
            } else {
                console.log("expirationCheck, no tokens saved in localStorage");
            }
        };


        this.$get = function(){
            return new AuthorizationService();
        };
    });
