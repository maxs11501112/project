angular.module('crudControllers',['crudServices','userServices','authServices'])

.controller('crudCtrl',function($location,$timeout,Form,$routeParams,$scope,User){
    var app = this;

    app.getUsers = function(){
        User.getUsers().then(function(data){
            app.name = data.data.names;
            app.username = data.data.usernames;

            $scope.newStudentId = app.username;
            $scope.newStudentName = app.name;
        });
    }

    // this.getUser();
    this.getUsers();

    Form.getForms().then(function(data){
        app.forms = data.data.forms;
    })


    $scope.reverse = false;
    $scope.sortKey = 'create';

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    app.createForm = function(regData){
        app.loading = true
        app.errorMsg = false
        app.regData.studentId = app.username;
        app.regData.studentName = app.name;
        Form.create(app.regData).then(function(data){

            if(data.data.success){
                app.loading =false
                //create success Msg
                // alert('success : '+data.data.message)
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

.controller('editCtrl',function(User,Form,$routeParams,$scope,$timeout,$location){
    var app=this;

    app.getEmail = function(studentId){
        var b = studentId;
        User.getStudentEmail(b).then(function(data){
            alert(data.data.email);
            console.log(data.data.success);
        })
    }

    app.getUsers = function(){
        User.getUsers().then(function(data){
            app.users = data.data.users;
            app.names = data.data.names;
            app.branch = data.data.branch;
            app.success = data.data.success;
            app._id = data.data._id;
        });
    }

    // this.getUser();
    this.getUsers();

    app.test = function(){
        alert('btn work!')
    }

    app.submitRequestForm = function(branch){
        User.getAdvisorEmail(branch).then(function(data){
            var email = data.data.email
            Form.submit($routeParams.id,email).then(function(data){
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
    )}

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
        })
    }

    function getForms(){
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
                $scope.newAdvisorComment = data.data.form.advisorComment;
                $scope.newExecutiveComment = data.data.form.executiveComment;
                $scope.newClosedNote = data.data.form.closedNote;
                $scope.newFormStatus = data.data.form.formStatus;
                $scope.newExecutiveApprove = data.data.form.executiveApprove;
                $scope.newAdvisorApprove = data.data.form.advisorApprove;
            }else{
                console.log('fail to get form')
            }
        })
    }

    getForms();

    app.approveRequestFormAdvisor = function(){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};

        formObject.advisorComment = $scope.newAdvisorComment;
        Form.advisorApprove($routeParams.id).then(function(data){
            Form.update($routeParams.id,formObject).then(function(data){
                if(data.data.success){
                    app.loading =false
                    //create success Msg
                    console.log('success : '+data.data.message);
                    app.successMsg = data.data.message;
                    // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                    $timeout(function(){
                    //redirect to home page
                        $location.path('/requestFormList-Advisor')
                    },1000)
                }else{
                    app.loading =false
                    app.errorMsg = data.data.message;
                    console.log('error : '+data.data.message);
                }
            })
        })
    }

    
    app.implement = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        
        formObject.closedNote = $scope.newClosedNote;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.implement($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Registration-Department')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

    app.advisorRejectRequestForm = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        
        formObject.advisorComment = $scope.newAdvisorComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.advisorReject($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Advisor')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

    app.approveRequestFormExecutive = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};

        formObject.executiveComment = $scope.newExecutiveComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.executiveApprove($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Executive')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            })
        })
    }

    

    app.executiveRejectRequestForm = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        

        formObject.executiveComment = $scope.newExecutiveComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.executiveReject($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Executive')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

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
        formObject.advisorComment = $scope.newAdvisorComment;
        formObject.executiveComment = $scope.newExecutiveComment;
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

