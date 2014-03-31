angular.module('zamolxian.config', [])

    /* The constants here are created as object so we don't pollute the window object with all of them, the module is
     *  included as a normal dependency and we call only the constant we want like myCtrl($scope, userapp) etc where we
     *  use the rest of the data from the selected object
     **/

    //Default user data object, used for comparison and other things
    .value('userData', {
        "id": 12312321,
        "details": {
            "firstname": "Bobby",
            "lastname": "Sunshine",
            "username": "BobbyS",
            "email": "cartagena@yahoo.com",
            "photo": "http://suusrs.com/2312312321312.jpg",
            "country": "Spain",
            "company": "ACME Ltd.",
            "job": "FrontEnd Developer",
            "bio": "Lone shark surfing the waves of AngularJS"
        },
        "preferences": {
            "notifications": {
                "docs": 0,
                "tutorials": 1
            },
            "coaching": 0,
            "email_notifications": 1
        },
        "activity": {
            "coaching": {
                "docs": 1,
                "tutorials": 0
            },
            "last_items": {
                "tutorial": {
                    "title": "Angular Directives in everyday life",
                    "url": "http://tok.client/tutorials/1241244213",
                    "date": 1395521399
                },
                "docs": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399
                },
                "reading_list": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399
                }
            },
            "shares": {
                "tutorial": {
                    "title": "Angular Directives in everyday life",
                    "url": "http://tok.client/tutorials/1241244213",
                    "date": 1395521399,
                    "to": {
                        "email": 0,
                        "facebook": 1
                    }
                },
                "docs": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399,
                    "to": {
                        "email": "andrei.saguna@yahoo.com",
                        "facebook": 0
                    }
                },
                "reading_list": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399
                }
            },
            "likes": {
                "tutorial": {
                    "title": "Angular Directives in everyday life",
                    "url": "http://tok.client/tutorials/1241244213",
                    "date": 1395521399
                },
                "docs": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399
                },
                "reading_list": {
                    "title": "What are providers",
                    "url": "http://tok.client/docs/1241244213",
                    "date": 1395521399
                }
            }
        },
        "statistics": {
            "docs": 12,
            "tutorials": 4,
            "likes": 5,
            "shares": 7
        },
        "achievements": {
            "greenhorn": 1,
            "cook": 1,
            "ninja": 0,
            "helper": 1
        },
        "searches": {
            "0": [
                {
                    "query": "angular directive",
                    "where": "tutorials",
                    "when": 1395521399
                }
            ],
            "1": [
                {
                    "query": "transclude",
                    "where": "tutorials",
                    "when": 1395521399
                }
            ],
            "2": [
                {
                    "query": "ng-book",
                    "where": "books",
                    "when": 1395521399
                }
            ],
            "3": [
                {
                    "query": "angular directive",
                    "where": "tutorials",
                    "when": 1395521399
                }
            ]
        },
        "linked_accounts": {
            "gmail": {
                "email": "kovacs.arthur.kraid@gmail.com",
                "token": "212klj42k342132k4k23423j4n"
            },
            "github": {
                "username": "ArthurianX",
                "email": "kovacs.arthur.kraid@gmail.com",
                "token": "212klj42k342132k4k23423j4n"
            },
            "stackoverflow": {
                "email": {},
                "token": {}
            }
        },
        "watching": {
            "tutorials": {
                "Road to Angular": {
                    "url": "http://www.cucudepadure.com/assadas",
                    "date": 2312312312
                },
                "Road to Angular Directives": {
                    "url": "http://www.cucudepadure.com/assadas",
                    "date": 2312312312,
                    "type": "comment/change"
                }
            },
            "modules": {
                "ng-animate": {
                    "url": "http://www.cucudepadure.com/assadas",
                    "date": 2312312312,
                    "version": "1.3.0-beta",
                    "type": "comment" //or type: change
                },
                "ng-cookie": {
                    "url": "http://www.cucudepadure.com/assadas",
                    "date": 2312312312,
                    "version": "1.3.0-beta"
                }
            },
            "books": {
                "Inside AngularJS": {
                    "url": "http://www.cucudepadure.com/assadas",
                    "book_url": "http://www.cucudepadure.com/assadas",
                    "price": "17.99USD"
                }
            }

        },
        "secret": "PapadiaDeMunte"
    })


    //Modify this to set the global Online/Offline Status in the entire application
    .value('appConfig', {
        'isOnline': function(){
            //TODO: Cordova specific code to check for internet connectivity.
            return true;
        },
        //A list of endpoints, all data is taken from here
        "baseURL": "https://localhost:3000/",
        "userinfo": "api/userinfo",
        "token": "oauth/token",
        "handshake": "api/client-challenge"
    })
;
