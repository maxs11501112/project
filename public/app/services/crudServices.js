angular.module('crudServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Form',function($http){
        userFactory = {}

        //User.create(regData)
        userFactory.create = function(regData){
            return $http.post('/api/requestForm', regData)
        }

        return userFactory;
    })
