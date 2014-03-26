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

            this.getFromStorageToServer = function(key) {
                //Expose the internal AuthStorage Function;
                return crypto().encryptServer(authStorage().getData(key));
            };

            //Receive Tokens Object from the authorization server and process them.
            this.saveTokens = function(response){

                //The object response body containing all the tokens and types is the response variable

                //TODO: Remember to decrypt the tokens object here, then process

                //Calculate the expiration date.
                var expiration_date = new Date().getTime() + response[0].expires_in;
                // ^^^ If 3600 default is milisecons, is ok, but highly improbable, TODO: multiply expires_in to convert in miliseconds
                response[0].expires_on = expiration_date;

                authStorage().setData("tokens", response);
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

            this.grantTypePassword = function(username, password){
                //TODO: User and password will be from the Login Form and parsed encrypted, like below, once the serverside crypto is on.
                //return crypto().encryptServer('grant_type=password&username=' + username + '&password=' + password + '&scope=offline_access');
                return 'grant_type=password&username=' + username + '&password=' + password + '&scope=offline_access';
            };

            this.grantTypeRefreshToken = function(){
                return 'grant_type=refresh_token&refresh_token=c9pEaQvTXmJKm0CC5Aqu84HHvh2fDvxJ0LwAyf5Gn2IvwWxomK3V66WqAj0EiFBGDIwIQBm5TADAkoXlbuOSl2dEXBNs38k7Cl8G4aqFrJZXkBhpuB4oxGpCLAhndbSSX05cGfq1uNEAk3cRXKK7EHnLnYCJ2J5RfHaQwKVss8YFBrbpYEdODZ0Y0rKzKn0vNW3GSkhqIh7HnypqrKyH3054Qz8omPD9KZD1uBlFFM2aQH88qHMRV2X1zO2u0ViT';
                //TODO: Make dynamic, give up on doTransaction else statement.
            };

        }

        //Private Functions that helps our Constructor.
        var crypto = function(){

            //Options for encryption/decryption come here.
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
                },
                encryptServer: function(data){
                    return window.btoa(data); //Base64 Encoding for the masses.
                },
                decryptServer: function(data){
                    return window.atob(data); //Base64 Decoding for the masses.
                }
            };



        };

        var processMessage = function(message) {
            //It depends on the object we will be receiving, but here I am aiming to store the received data and to encrypt it for passing on.
            if (message !== undefined) {

                //TODO: Decrypt data here and populate the localStorage with each value encrypted.

                authStorage().setData("clientID", message.clientId);
                authStorage().setData("clientSecret", message.clientSecret);
                authStorage().setData("deviceName", message.deviceName);

                var concatenatedKeys = message.clientId + ":" + message.clientSecret;

                authStorage().setData("Authorization", concatenatedKeys);

                console.log('TESTING - processMessage has added all the encrypted values to localStorage');



            }
        };

        var authStorage = function(){
            /**
             * authStorage will handle the localStorage data storage, everything that passes through it will get encrypted/decrypted, at runtime.
            **/

            //Setter and Getter methods to communicate with localStorage
            //TODO: Create a more advanced handler for storing :)
            return {
                setData: function(key, data){
                    console.log('-------------------------------------------------');
                    console.log('AuthStorage has set: ' + key + ' with data:');
                    console.log(data);
                    console.log('in encrypted form: ');
                    console.log(crypto().encrypt(JSON.stringify(data)));
                    console.log('-------------------------------------------------');
                    return window.localStorage.setItem(key, crypto().encrypt(JSON.stringify(data))); //Encrypt the stringified JSON
                },
                getData: function(key){
                    console.log('-------------------------------------------------');
                    console.log('AuthStorage has retrieved: ' + key + ' with data:');
                    console.log(window.localStorage.getItem(key));
                    console.log('in decrypted form: ');
                    console.log(JSON.parse(crypto().decrypt(window.localStorage.getItem(key))));
                    console.log('-------------------------------------------------');
                    return JSON.parse(crypto().decrypt(window.localStorage.getItem(key))); //Parse the decrypted string into JSON
                },
                checkData: function(key){
                    return window.localStorage.getItem(key) !== null;
                }
            };

        };

        var refreshToken = function(){
            //TODO: Remember to decrypt/encrypt
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
