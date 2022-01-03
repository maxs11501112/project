angular.module('crudServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Form',function($http){
        formFactory = {}

        //create Request Form
        formFactory.create = function(regData){
            return $http.post('/api/create-RequestForm', regData)
        }

        //update Request Form
        formFactory.update = function(id,data){
            return $http.put('/api/update-RequestForm/'+id,data)
        }

        //approve Request Form
        formFactory.submit = function(id){
            return $http.get('/api/submit-RequestForm/'+id)
        }

        //delete Request Form
        formFactory.delete = function(id){
            return $http.delete('/api/delete-RequestForm/'+id)
        }

        formFactory.getForm = function(id){
            return $http.get('/api/edit/'+id);
        }

        //get all Request Form 
        formFactory.getForms = function(){
            return $http.get('/api/manageRequestForm');
        }

        return formFactory;
    })