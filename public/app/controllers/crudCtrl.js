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
    
    

    // app.updateForm = function(regData){
    //     Form.updateForm().then(function(data))
    // }

    app.approveRequestForm = function(id){
        Form.approve(id).then(function(data){
            Form.getForms().then(function(data){
                app.forms = data.data.forms;
                console.log('approve-RequestForm');
            })
        })
    }

    app.deleteRequestForm = function(id){
        Form.delete(id).then(function(data){
            Form.getForms().then(function(data){
                app.forms = data.data.forms;
                console.log('delete-RequestForm');
            })
        })
    }

   
})

.controller('editCtrl',function(Form,$routeParams,$scope){
    var app=this;


    function getForm(){
        Form.getForm($routeParams.id).then(function(data) {
            console.log('sawaddee : '+data.data.title)
            console.log('sawaddeeeeee : '+$routeParams.id)
            if(data.data.success){
                // console.log('newStudentId : '+data.data.form.studentId)
                // console.log('newStudentNames : '+data.data.form.studentName)
                // console.log('newTitle : '+data.data.form.title)
                // console.log('newTerm : '+data.data.form.term)
                // console.log('newYear : '+data.data.form.year)
                // console.log('newTel : '+data.data.form.tel)
                // console.log('newDescription : '+data.data.form.description)
                $scope.newTitle = data.data.form.title;
                $scope.newTerm = data.data.form.term;
                $scope.newTel = data.data.form.tel;
                $scope.newYear = data.data.form.year;
                $scope.newStudentId = data.data.form.studentId;
                $scope.newStudentName = data.data.form.studentName;
                $scope.newDescription = data.data.form.description;
            }else{
                console.log('notsuccess')
            }
        })
    }

    getForm();

    app.updateRequestForm = function(){
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
                console.log('Success Update')
            }else{
                console.log('Noooooo')
            }
        })
        getForm();

    }






})