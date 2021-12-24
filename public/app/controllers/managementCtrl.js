angular.module('managementController',[])

.controller('managementCtrl',function(User){
    var app = this;

    app.loading = true;
    app.accessDenied = true;
    app.errorMsg = false;
    app.editAccess = false;
    app.deleteAccess = false;

    User.getUsers().then(function(data){
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
    })
})