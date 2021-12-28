angular.module('crudControllers',['crudServices'])

.controller('crudCtrl',function($location,$timeout,Form,$routeParams,$scope){
    var app = this;


    Form.getAll().then(function(data){
        app.forms = data.data.forms;
    })

    app.createForm = function(regData){
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
                    $location.path('/manageRequestForm')
                },2000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }


        })

    }

    Form.getForm($routeParams.id).then(function(data) {
        console.log('sawaddee : '+data.data.title)
        console.log('sawaddeeeeee : '+$routeParams.id)
        if(data.data.success){
            console.log('sawaddee kub success : '+data.data.title)
            $scope.newTitle = data.data.forms.title;
            $scope.newTerm = data.data.forms.term;
            $scope.newTel = data.data.forms.tel;
            $scope.newYear = data.data.forms.year;
            $scope.newStudentId = data.data.forms.studentId;
            $scope.newStudentName = data.data.forms.studentName;
            $scope.newDescription = data.data.forms.description;
        }
    })

    // app.updateForm = function(regData){
    //     Form.updateForm().then(function(data))
    // }

    app.approveRequestForm = function(id){
        Form.approve(id).then(function(data){
            Form.getAll().then(function(data){
                app.forms = data.data.forms;
                console.log('approve-RequestForm');
            })
        })
    }

    app.deleteRequestForm = function(id){
        Form.delete(id).then(function(data){
            Form.getAll().then(function(data){
                app.forms = data.data.forms;
            })
            console.log('delete-RequestForm');
        })
    }

   
})