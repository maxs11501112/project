angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth, $location, $timeout, $rootScope){
    var app =this;
    app.loadme = false

    $rootScope.$on('$routeChangeStart', function(){

        if(Auth.isLoggedIn()){
            app.isLoggedIn = true
            Auth.getUser().then(function(data){
                console.log(data.data.username)
                app.username = data.data.username
                app.useremail = data.data.useremail
                app.loadme =true
            })
        }else{
            app.isLoggedIn = false
            app.username = ''
            app.loadme =true
        }
    
    })


    this.doLogin = function(loginData){

        app.loading = true
        app.errorMsg = false
       
    
        Auth.login(app.loginData).then(function(data){
    
            if(data.data.success){
                app.loading =false
                //create success Msg
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                    app.loginData = ''
                    app.successMsg = false
                    //redirect to home page
                    $location.path('/about')
                },2000)
                
    
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
            }
    
    
        })
    }
    this.logout = function(){
        Auth.logout()
        $location.path('/logout')
        $timeout(function(){
            $location.path('/')
        },2000)
    }
})

