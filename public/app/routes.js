angular.module('appRoutes',['ngRoute'])
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
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'createForm1' 
    })

    .when('/manageRequestForm',{
        templateUrl : 'app/views/pages/manageRequestForm/manageRequestForm.html',
        controller : 'crudCtrl',
        controllerAs : /*ข้าขอตั้งชื่อเจ้าสิ่งนี้ว่า*/ 'management' 
    })

    .otherwise({ redirectTo: '/'})

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

})


