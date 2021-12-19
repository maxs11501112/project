angular.module('crudControllers',['crudServices'])

.controller('crudCtrl',function($http,$location,$timeout,Form){
    
    var app = this;

    this.createForm = function(regData){
        app.loading = true
        app.errorMsg = false
       

        Form.create(app.regData).then(function(data){

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