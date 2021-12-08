angular.module('authServices',[])

    // *? https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Auth',function($http,AuthToken){
        var authFactory = {}

        //Auth.create(regData)
        authFactory.login = function(loginData){
            return $http.post('/api/authenticate', loginData).then(function(data){

                AuthToken.setToken(data.data.token)

                return data
            })
        }
        //   check isLoggedIn       Auth.isLoggedIn()
        authFactory.isLoggedIn = function(){
            if(AuthToken.getToken()){
                return true
            }else{
                return false
            }
        }

        //log out
        authFactory.logout = function(){
            AuthToken.setToken();
        }

        return authFactory;
    })

    .factory('AuthToken',function($window){
        var authTokenFactory = {}

        authTokenFactory.setToken =function(token){
            if(token){
                $window.localStorage.setItem('token',token)
            }else {
                $window.localStorage.removeItem('token')
            }
        }
     
        authTokenFactory.getToken = function(){
            return $window.localStorage.getItem('token')
        }


        return authTokenFactory;
    })

