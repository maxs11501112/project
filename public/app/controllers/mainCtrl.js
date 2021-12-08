angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$location,$timeout){
    var app =this;

    if(Auth.isLoggedIn()){
        console.log('Success: User is logged in')
    }else{
        console.log('Failure: User is NOT logged in')
    }

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

