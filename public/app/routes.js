var app = angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/',{
        templateUrl : 'app/views/pages/home.html'
    })

    .when('/about',{
        templateUrl : 'app/views/pages/about.html'
    })

    .when('/register',{
        templateUrl : 'app/views/pages/users/register.html',
        controller : 'regCtrl',
        controllerAs: 'register' 
    })
    

    .when('/login',{
        templateUrl : 'app/views/pages/users/login.html',

    })


    .when('/logout',{
        templateUrl : 'app/views/pages/users/logout.html',

    })

    .when('/profile',{
        templateUrl : 'app/views/pages/users/profile.html',

    })

    .when('/create',{
        templateUrl : 'app/views/pages/manageRequestForm/create.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'crud' 
    })

    .when('/edit/:id',{
        templateUrl : 'app/views/pages/manageRequestForm/edit.html',
        controller : 'editCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'edit' 
    })

    .when('/requestFormList',{
        templateUrl : 'app/views/pages/manageRequestForm/requestFormList.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'crud' 
    })

    .when('/requestFormList-Registration-Department',{
        templateUrl : 'app/views/pages/manageRequestForm/requestFormList-Registration-Department.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'crud' 
    })

    .when('/view/:id',{
        templateUrl : 'app/views/pages/manageRequestForm/view.html',
        controller : 'editCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'edit' 
    })

    .when('/implement/:id',{
        templateUrl : 'app/views/pages/manageRequestForm/implement.html',
        controller : 'editCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'edit' 
    })

    .when('/requestFormList-Advisor',{
        templateUrl : 'app/views/pages/manageRequestForm/requestFormList-Advisor.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'crud' 
    })

    .when('/approve-Advisor/:id',{
        templateUrl : 'app/views/pages/manageRequestForm/approve-Advisor.html',
        controller : 'editCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'edit' 
    })

    .when('/requestFormList-Executive',{
        templateUrl : 'app/views/pages/manageRequestForm/requestFormList-Executive.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'crud' 
    })

    .when('/approve-Executive/:id',{
        templateUrl : 'app/views/pages/manageRequestForm/approve-Executive.html',
        controller : 'editCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'edit' 
    })

    .when('/user_data',{
        templateUrl : 'app/views/pages/users/user_data.html',
        controller : 'managementCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'management',
        authenticated : true,
        permission : [ 'advisor','executive','admin']
    })

    .when('/edit_user/:id',{
        templateUrl : 'app/views/pages/users/edit_user.html',
        controller : 'editUserCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'editUser' 
    })

    .when('/change_password/:id',{
        templateUrl : 'app/views/pages/users/change_password.html',
        controller : 'editUserCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'editUser' 
    })

    .otherwise({ redirectTo: '/'})

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

})
app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User){

    $rootScope.$on('$routeChangStart',function(event,next,current){

        if(next.$$route !== undefined){
            if(next.$$route.authenticated === true){
                if(!Auth.isLoggedIn()){
                    event.preventDefault();
                    $location.path('/');
                }else if(next.$$route.permission){
                    User.getPermission().then(function(data){
                        console.log(data);
                    })



                }
            }
        }else if(next.$$route.authenticated === false){

            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }

        }    
    });
}]);

