angular.module('managementController',['userServices'])

.controller('managementCtrl',function(User,$routeParams,$scope){
    var app = this;

    app.loading = true;
    app.accessDenied = true;
    app.errorMsg = false;
    app.editAccess = false;
    app.deleteAccess = false;

    app.search = function(){
        console.log('work')
        $scope.newUsernameFilter = $scope.usernameFilter;
        $scope.newNameFilter = $scope.nameFilter;
        $scope.newEmailFilter = $scope.emailFilter;
        $scope.newPermissionFilter = $scope.permissionFilter;
        $scope.newBranchFilter = $scope.branchFilter;
    }

    function getUsers(){
        User.getUsers().then(function(data){
            app.users = data.data.users;
            console.log('From getUsers : ')
            console.log('Username : '+data.data.username)
            console.log('Email : '+data.data.email)
            console.log('Permission : '+data.data.permissions)
            console.log('Name : '+data.data.names)
            if(data.data.success){
                if(data.data.permissions ==='advisor' || data.data.permissions ==='executive'){
                    console.log('aaaaaa : '+data.data.permissions)
                    app.users = data.data.users;
                    app.loading = false;
                    app.accessDenied = false;
                    app.editAccess = true;
                    app.deleteAccess = true;
    
                }else{
                    app.errorMsg = 'Insufficient Permissions';
                    app.loading = false;
                }
            }else{
                app.errorMsg = data.data.message;
                app.loading = false;
            }
        });
    }

    getUsers();

})


.controller('editUserCtrl',function(User,$routeParams,$scope,$timeout,$location){
    var app = this;

    app.deleteUser = function(){
        User.deleteUser($routeParams.id).then(function(data){
            if(data.data.success){
                $timeout(function(){
                    //redirect to home page
                    $location.path('/user_data')
                },1000)
            }else{
                console.log(data.data.message);
            }
        })
    }

    function getUser(){
        User.getUser($routeParams.id).then(function(data){
            if(data.data.success){
                console.log('Easy')
                console.log('Username = '+data.data.user.username);
                console.log('Name = '+data.data.user.name);
                console.log('Email = '+data.data.user.email);
                console.log('Branch = '+data.data.user.branch);
                console.log('Permission = '+data.data.user.permission);
                $scope.newUserName = data.data.user.username
                $scope.newBranch = data.data.user.branch
                $scope.newName = data.data.user.name
                $scope.newEmail = data.data.user.email
                $scope.newPermission = data.data.user.permission
            }
        })
    }

    getUser();

    app.test = function(){
        console.log('eiei')
    }

    app.changePassword = function(){
        app.errorMsg = false;
        app.successMsg = false;
        app.loading = true;
        var userObject = {};
        var oldPassword = $scope.oldPassword;
        var new1Password = $scope.new1Password;
        var new2Password = $scope.new2Password;

        if (oldPassword && new1Password && new2Password){
            User.validateUser($routeParams.id,oldPassword).then(function(data){
                if(data.data.success){
                    var temp = new1Password.localeCompare(new2Password);
                    if (temp === 0){
                        console.log(data.data.message)
                        userObject.password = new1Password;
                        User.update($routeParams.id,userObject).then(function(data){
                            if(data.data.success){
                                app.loading = false;
                                app.successMsg = data.data.message;
                                $timeout(function(){
                                    //redirect to home page
                                    $location.path('/')
                                },1000)
                            }else{
                                app.loading = false;
                                console.log('error : '+data.data.message);
                            }
                        })
                    }else{
                        app.loading = false;
                        app.errorMsg = 'New password is not match.'
                    }
                }else{
                    app.loading = false;
                    console.log('error : '+data.data.message)
                    app.errorMsg = data.data.message;
                }
            })
        }else if(new2Password && new1Password){
            app.loading = false;
            app.errorMsg = 'Please enter your old Password';
        }else if(oldPassword && new2Password){
            app.loading = false;
            app.errorMsg = 'Please enter your new Password';
        }else if(oldPassword && new1Password){
            app.loading = false;
            app.errorMsg = 'Please enter your confirmation Password';
        }else{
            app.loading = false;
            app.errorMsg = 'Please enter your information';
        }
    }

    app.updateUser = function(){
        var userObject = {};

        userObject.username = $scope.newUserName;
        userObject.password = $scope.newPassword;
        userObject.name = $scope.newName;
        userObject.email = $scope.newEmail;
        userObject.permission = $scope.newPermission;
        userObject.branch = $scope.newBranch;
        User.update($routeParams.id,userObject).then(function(data){
            if(data.data.success){
                $timeout(function(){
                    //redirect to home page
                    $location.path('/user_data')
                },1000)
            }else{
                console.log('error : '+data.data.message);
            }
        })
    }


});