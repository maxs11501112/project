angular.module('crudControllers',['crudServices'])

.controller('crudCtrl',function($http,$location,$timeout,Form){
    var app = this;


    Form.getAll().then(function(data){
        app.forms = data.data.forms;
    })


    this.createForm = function(regData){
        app.loading = true
        app.errorMsg = false
       

        Form.create(app.regData).then(function(data){

            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/')
                },2000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }


        })

    }

    this.readForm = function(regData){
        
        Form.read(app.regData).then(function(data){
            console.log('read-RequestForm : Eiei');
        })

    }

    this.updateForm = function(regData){
        
        Form.update(app.regData).then(function(data){
            console.log('update-RequestForm : Eiei');
        })

    }

    this.deleteRequestForm = function(id){
        Form.delete(id).then(function(data){
            Form.getAll().then(function(data){
                app.forms = data.data.forms;
            })
            console.log('delete-RequestForm : Eiei');
        })

    }


   
})