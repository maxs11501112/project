angular.module('managementController',['userServices'])

.controller('managementCtrl',function(User){
    var app = this;

    app.loading = true;
    app.accessDenied = true;
    app.errorMsg = false;
    app.editAccess = false;
    app.deleteAccess = false;

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

    app.deleteUser = function(username){
        User.deleteUser(username).then(function(data){
            if(data.data.success){
                getUsers();
            }else{
                app.showMoreError = data.data.message;
            }
        })
    }

});