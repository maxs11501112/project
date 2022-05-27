angular.module('crudServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('Form',function($http){
        formFactory = {}

        //create Request Form
        formFactory.create = function(regData){
            return $http.post('/api/create-RequestForm',regData)
        }

        //update Request Form
        formFactory.update = function(id,data){
            return $http.put('/api/update-RequestForm/'+id,data)
        }

        //submit Request Form
        formFactory.submit = function(id,branch){
            return $http.get('/api/submit-RequestForm/'+id+'/'+branch)
        }

        //approve Request Form (Advisor)
        formFactory.advisorApprove = function(id){
            return $http.get('/api/approve-RequestForm-Advisor/'+id)
        }

        //reject Request Form (Advisor)
        formFactory.advisorReject = function(id){
            return $http.get('/api/reject-RequestForm-Advisor/'+id)
        }

        //approve Request Form (Executive)
        formFactory.executiveApprove = function(id){
            return $http.get('/api/approve-RequestForm-Executive/'+id)
        }

        //reject Request Form (Executive)
        formFactory.executiveReject = function(id){
            return $http.get('/api/reject-RequestForm-Executive/'+id)
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