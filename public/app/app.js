
angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','crudControllers','crudServices'] )

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors')
})