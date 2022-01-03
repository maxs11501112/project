angular.module('crudControllers',['crudServices'])

.controller('crudCtrl',function($location,$timeout,Form,$routeParams,$scope){
    var app = this;

    Form.getForms().then(function(data){
        app.forms = data.data.forms;
    })

    app.createForm = function(regData){
        app.loading = true
        app.errorMsg = false
       

        Form.create(app.regData).then(function(data){

            if(data.data.success){
                app.loading =false
                //create success Msg
                alert('success : '+data.data.message)
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },2000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }


        })

    }
    

    

   
})

.controller('editCtrl',function(Form,$routeParams,$scope,$timeout,$location){
    var app=this;

    app.submitRequestForm = function(){
        Form.submit($routeParams.id).then(function(data){
            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },1000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
            // Form.getForms().then(function(data){
            //     app.forms = data.data.forms;
            //     console.log('approve-RequestForm');
            // })
        })
    }

    app.deleteRequestForm = function(){
        Form.delete($routeParams.id).then(function(data){
            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },1000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
            // Form.getForms().then(function(data){
            //     app.forms = data.data.forms;
            //     console.log('delete-RequestForm');
            // })
        })
    }

    function getForm(){
        Form.getForm($routeParams.id).then(function(data) {
            if(data.data.success){
                console.log('success to get form')
                $scope.newTitle = data.data.form.title;
                $scope.newTerm = data.data.form.term;
                $scope.newTel = data.data.form.tel;
                $scope.newYear = data.data.form.year;
                $scope.newStudentId = data.data.form.studentId;
                $scope.newStudentName = data.data.form.studentName;
                $scope.newDescription = data.data.form.description;
            }else{
                console.log('fail to get form')
            }
        })
    }

    getForm();

    app.updateRequestForm = function(){
        app.loading = true
        app.errorMsg = false
        var formObject = {};

        formObject.title = $scope.newTitle;
        formObject.term = $scope.newTerm;
        formObject.tel = $scope.newTel;
        formObject.year = $scope.newYear;
        formObject.studentId = $scope.newStudentId;
        formObject.studentName = $scope.newStudentName;
        formObject.description = $scope.newDescription;
        Form.update($routeParams.id,formObject).then(function(data){
            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },1000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
        })
        

    }






})