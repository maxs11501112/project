angular.module('userServices',[])

    //https://www.geeksforgeeks.org/angularjs-factory-method/ ---> factory method
    .factory('User',function($http){
        userFactory = {}



        //User.create(regData)
        userFactory.create = function(regData){
            return $http.post('/api/users', regData)
        }

        userFactory.getUsers = function(){
            return $http.get('/api/management')
        }
        
        userFactory.deleteUser = function(username){
            return $http.delete('/api/delete-User/' + username);
        }

        userFactory.getAdvisorEmail = function(branch){
            return $http.get('/api/get-Advisor-Email/' + branch);
        }

        userFactory.getStudentEmail = function(studentId){
            return $http.get('/api/get-Student-Email/' + studentId);
        }

        return userFactory;
    })

