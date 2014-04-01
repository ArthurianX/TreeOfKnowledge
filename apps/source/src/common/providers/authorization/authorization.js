angular.module('zamolxian.authorization', [])

/**
 * authorization API
 **/

    .provider('$auth', function $AuthProvider() {

        var server_url = "http://deusxmachina.org"; //TODO: Change to server URL

        //^^^ TODO: Standardize the object we will be receiving from postMessage in iframe

        //Public Constructor that defines our API
        function AuthorizationService() {

            /**
             * AuthorizationService exposed API Methods
             **/

                //get clientID, clientSecret and other details.
            this.getClientInfo = function() {
                //TODO: Move this in to the handshake section.
                console.log('TESTING - postMessage listener is starting');

                //Add an event listener to messages from the iFrame new account page.
                window.addEventListener("message", receiveMessage, false); //TODO: Add the event listener when starting registration process :)

                //Receive the message
                function receiveMessage(event)
                {
                    console.log('TESTING - postMessage has fired.');
                    if (event.origin !== server_url){return;}
                    console.log('TESTING - postMessage has been received:');
                    console.log(event.data);
                    //Send the data response to the process function.
                    processMessage(event.data);

                    //Kill the eventListener
                    window.removeEventListener("message");

                }

            };

            //Receive Tokens Object from the authorization server and process them.
            this.saveTokens = function(response){

                console.log('>>>> Saving token response started');
                //The object response body containing all the tokens and types is the response variable

                //TODO: Remember to decrypt the tokens object here, then process

                //Calculate the expiration date.
                var expiration_date = new Date().getTime() + response[0].expires_in;
                // ^^^ If 3600 default is milisecons, is ok, but highly improbable, TODO: multiply expires_in to convert in miliseconds
                response[0].expires_on = expiration_date;

                authStorage().setData("tokenResponse", response[0]);
                authStorage().setData("activeToken", response[0].access_token);
            };

            this.grant = {
                password: function(username, password) {
                    return 'grant_type=password&username=' + username + '&password=' + password + '&scope=offline_access';
                },
                refresh: function(token){
                    return 'grant_type=refresh_token&refresh_token=' + token;
                }
            };

            //Exposing the whole authStorage function to be used app wide, AWESOME!
            this.storage = {
                set: function(key, data){
                    authStorage().setData(key, data);
                },
                get: function(key, method){
                    /**
                     * Return the data in a specific encryption, for local usage or server usage
                     * Usage $auth.storage.get(key, method)
                     * - method can be local or server.
                     * */
                    switch (method) {
                        case "local":
                            //Pass encrypted data for local usage
                            console.log('Data encrypted for local usage');
                            return crypto().encrypt(authStorage().getData(key));
                        //break;
                        case "server":
                            //Pass encrypted data for server usage
                            console.log('Data encrypted for server usage');
                            return crypto().encryptServer(authStorage().getData(key));
                        //break;
                        default:
                            return authStorage().getData(key);
                    }
                }
            };
            this.checkData = function(key){
                return authStorage().checkData(key);
            };

            /*this.handshake = {

            };*/

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

                authStorage().setData("BasicAuthorization", concatenatedKeys);

                console.log('TESTING - processMessage has added all the encrypted values to localStorage');



            }
        };

        var authStorage = function(){
            /**
             * authStorage will handle the localStorage data storage, everything that passes through it will get encrypted/decrypted, at runtime.
             **/

            //Setter and Getter methods to communicate with localStorage
            //TODO: Create a more advanced handler for storing :), maybe leveraging the .config after the localStorage has been read in one session
            return {
                setData: function(key, data){
                    console.log('-------------------------------------------------');
                    console.log('AuthStorage has set: \'' + key + '\' with data:');
                    console.log(data);
                    console.log('in encrypted form: ');
                    console.log(crypto().encrypt(JSON.stringify(data)));
                    console.log('-------------------------------------------------');
                    return window.localStorage.setItem(key, crypto().encrypt(JSON.stringify(data))); //Encrypt the stringified JSON
                },
                getData: function(key){
                    console.log('-------------------------------------------------');
                    console.log('AuthStorage has retrieved: \'' + key + '\' with data:');
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
            var tokenData = authStorage().getData("tokenResponse");
            tokenData.access_token = tokenData.refresh_token;
            authStorage().setData("tokenResponse", tokenData);
        };

        var expirationCheck = function(){
            if (authStorage().checkData("tokenResponse") !== null) {
                var tokenData = authStorage().getData("tokenResponse");
                return new Date().getTime() > tokenData.expires_on;
            } else {
                console.log("expirationCheck: no tokens saved in localStorage.");
            }
        };


        this.$get = function(){
            return new AuthorizationService();
        };
    });
