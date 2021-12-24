angular.module('authServices',[])

    // *? https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Auth',function($http,AuthToken){
        var authFactory = {}

        //authFactory.getAllUser = function(){
        //    return $http.get('/api/get-all-user');
        //}

        //authFactory.getPermission = function(){
         //   return $http.get('/api/get-permission');
        //}

        authFactory.login = function(loginData){
            return $http.post('/api/authenticate', loginData).then(function(data){

                AuthToken.setToken(data.data.token)

                return data
            })
        }


        /*authFactory.isAdvisor = function(){
            if (this.getUser().permission == 'advi'){
                return true;
            }else{
                return false;
            }
        }*/


        //   check isLoggedIn       Auth.isLoggedIn()
        authFactory.isLoggedIn = function(){
            if(AuthToken.getToken()){
                return true
            }else{
                return false
            }
        }
        
        //  Auth. getUser() 
        authFactory.getUser = function(){
            if(AuthToken.getToken()){
                return $http.post('/api/me')
            }else{
                $q.reject({message : 'User has no token'})
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
    

    .factory('AuthInterceptors',function(AuthToken){
        var authInterceptorsFactory = {}
        
        authInterceptorsFactory.request = function(config){
            var token = AuthToken.getToken()
            if(token){
                config.headers['x-access-token'] = token
            }
            return config
        }

        return authInterceptorsFactory
    })
