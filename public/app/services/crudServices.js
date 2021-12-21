angular.module('crudServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Form',function($http){
        formFactory = {}

        //create Request Form
        formFactory.create = function(regData){
            return $http.post('/api/create-RequestForm', regData)
        }

        //read Request Form
        formFactory.read = function(regData){
            return $http.get('/api/read-RequestForm', regData)
        }

        //update Request Form
        formFactory.update = function(regData){
            return $http.put('/api/update-RequestForm', regData)
        }

        //delete Request Form
        formFactory.delete = function(regData){
            return $http.delete('/api/delete-RequestForm', regData)
        }

        //get all Request Form 
        formFactory.getAll = function(){
            return $http.get('/api/get-all');
        }

        return formFactory;
    })
