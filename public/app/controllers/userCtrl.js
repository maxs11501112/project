angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){
    
    var app = this;

    this.regUser = function(regData){
        app.loading = true
        app.errorMsg = false
       

        User.create(app.regData).then(function(data){

            if(data.data.success){
                app.loading =false
                //create success Msg
                app.successMsg = data.data.message;
                
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/')
                },2000)
                

            }else{
                app.loading =false
                app.errorMsg = data.data.message;
            }


        })

    }
})