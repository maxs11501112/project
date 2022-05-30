
angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','crudControllers','crudServices','managementController'] )

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors')

})