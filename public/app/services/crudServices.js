angular.module('crudServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Form',function($http){
        formFactory = {}

        //create Request Form
        formFactory.create = function(regData){
            return $http.post('/api/create-RequestForm', regData)
        }

        //update Request Form
        formFactory.update = function(id){
            return $http.get('/api/update-RequestForm/'+id, id)
        }

        //approve Request Form
        formFactory.approve = function(id){
            return $http.get('/api/approve-RequestForm/'+id)
        }

        //delete Request Form
        formFactory.delete = function(id){
            return $http.delete('/api/delete-RequestForm/'+id)
        }

        formFactory.getForm = function(id){
            return $http.get('/api/edit'+id);
        }

        //get all Request Form 
        formFactory.getAll = function(){
            return $http.get('/api/get-all');
        }

        return formFactory;
    })