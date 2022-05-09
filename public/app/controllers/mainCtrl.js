angular.module('mainController',['authServices','userServices'])

.controller('mainCtrl',function(User,Auth, $location, $timeout, $rootScope,Form){
    var app =this;
    app.loadme = false
    app.isAdvisor = false
    app.isExecutive = false
    app.isAdmin = false
    app.name;


    $rootScope.$on('$routeChangeStart', function(){

        User.getUsers().then(function(data){
            app.users = data.data.users;
            app.name = data.data.names;
            if(data.data.permissions ==='advisor'){
                app.isAdvisor = true
            }else{
                app.isAdvisor = false
            }
            
        })

        User.getUsers().then(function(data){
            app.users = data.data.users;
            app.name = data.data.names;
            if(data.data.permissions ==='executive'){
                app.isExecutive = true
            }else{
                app.isExecutive = false
            }
            
        })

        User.getUsers().then(function(data){
            app.users = data.data.users;
            app.name = data.data.names;
            if(data.data.permissions ==='admin'){
                app.isAdmin = true
            }else{
                app.isAdmin = false
            }
            
        })


        if(Auth.isLoggedIn()){
            app.isLoggedIn = true
            Auth.getUser().then(function(data){
                console.log('Username : '+data.data.username)
                console.log('Email : '+data.data.email)
                app.username = data.data.username
                app.useremail = data.data.email
                app.loadme = true
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
                app.loading = false
                //create success Msg
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                    app.loginData = ''
                    app.successMsg = false
                    //redirect to home page
                    $location.path('/')
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
        },)
    }
})

