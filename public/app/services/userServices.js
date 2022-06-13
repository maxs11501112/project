angular.module('userServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('User',function($http){
        userFactory = {}

        //User.create(regData)
        userFactory.create = function(regData){
            return $http.post('/api/users', regData)
        }

        userFactory.update = function(id,data){
            return $http.put('/api/update-User/'+id,data)
        }

        userFactory.getUsers = function(){
            return $http.get('/api/management')
        }
        
        userFactory.deleteUser = function(id){
            return $http.delete('/api/delete-User/' + id);
        }

        userFactory.getUser = function(id){
            return $http.get('/api/edit_user/'+id);
        }

        userFactory.getAdvisorEmail = function(branch){
            return $http.get('/api/get-Advisor-Email/' + branch);
        }

        userFactory.getStudentEmail = function(studentId){
            return $http.get('/api/get-Student-Email/' + studentId);
        }

        userFactory.getExecutiveEmail = function(){
            return $http.get('/api/get-Executive-Email');
        }

        userFactory.validateUser = function(id,password){
            return $http.get('/api/validate_user/'+ id +'/'+password);
        }


        return userFactory;
    })

