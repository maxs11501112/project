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