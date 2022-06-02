angular.module('crudControllers',['crudServices','userServices','authServices'])

.controller('crudCtrl',function($location,$timeout,Form,$routeParams,$scope,User){
    var app = this;

    app.getUsers = function(){
        User.getUsers().then(function(data){
            app.name = data.data.names;
            app.username = data.data.usernames;

            $scope.newStudentId = app.username;
            $scope.newStudentName = app.name;
        });
    }

    // this.getUser();
    this.getUsers();

    Form.getForms().then(function(data){
        app.forms = data.data.forms;
    })


    $scope.reverse = false;
    $scope.sortKey = 'create';

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    app.createForm = function(regData){
        app.loading = true
        app.errorMsg = false
        app.regData.studentId = app.username;
        app.regData.studentName = app.name;
        Form.create(app.regData).then(function(data){

            if(data.data.success){
                app.loading =false
                //create success Msg
                // alert('success : '+data.data.message)
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },2000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
        })
    }
})

.controller('editCtrl',function(Auth,User,Form,$routeParams,$scope,$timeout,$location){
    var app=this;
    app.requestForm = {};
    app.requestFormId;
    app.requestFormHashData;

    app.getEmail = function(studentId){
        var b = studentId;
        User.getStudentEmail(b).then(function(data){
            alert(data.data.email);
            console.log(data.data.success);
        })
    }

    app.getUsers = function(){
        User.getUsers().then(function(data){
            app.users = data.data.users;
            app.names = data.data.names;
            app.branch = data.data.branch;
            app.success = data.data.success;
            app._id = data.data._id;
        });
    }

    // this.getUser();
    this.getUsers();

    app.test = function(){
        alert('btn work!')
    }

    app.submitRequestForm = function(branch){
        User.getAdvisorEmail(branch).then(function(data){
            var email = data.data.email
            Form.submit($routeParams.id,email).then(function(data){
                if(data.data.success){
                    app.loading =false
                    //create success Msg
                    console.log('success : '+data.data.message);
                    app.successMsg = data.data.message;
                    // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                    $timeout(function(){
                    //redirect to home page
                        $location.path('/requestFormList')
                    },1000)
                }else{
                    app.loading =false
                    app.errorMsg = data.data.message;
                    console.log('error : '+data.data.message);
                }
            })
        }
    )}

    app.deleteRequestForm = function(){
        Form.delete($routeParams.id).then(function(data){
            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },1000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
        })
    }

    function getForms(){
        Form.getForm($routeParams.id).then(function(data) {
            if(data.data.success){
                $scope.newTitle = data.data.form.title;
                $scope.newTerm = data.data.form.term;
                $scope.newTel = data.data.form.tel;
                $scope.newYear = data.data.form.year;
                $scope.newStudentId = data.data.form.studentId;
                $scope.newStudentName = data.data.form.studentName;
                $scope.newDescription = data.data.form.description;
                $scope.newAdvisorComment = data.data.form.advisorComment;
                $scope.newExecutiveComment = data.data.form.executiveComment;
                $scope.newClosedNote = data.data.form.closedNote;
                $scope.newFormStatus = data.data.form.formStatus;
                $scope.newExecutiveApprove = data.data.form.executiveApprove;
                $scope.newAdvisorApprove = data.data.form.advisorApprove;

                app.requestFormId = data.data.form._id;

                app.requestForm.title = data.data.form.title
                app.requestForm.term = data.data.form.term
                app.requestForm.studentId = data.data.form.studentId
                app.requestForm.studentName = data.data.form.studentName
                app.requestForm.description = data.data.form.description
                app.requestForm.year = data.data.form.year
                app.requestForm.tel = data.data.form.tel
                app.requestForm.create = data.data.form.create
                app.requestForm.branch = data.data.form.branch
                app.requestForm.formStatus = data.data.form.formStatus
                app.requestForm.isSubmit = data.data.form.isSubmit
                app.requestForm.isProcessed = data.data.form.isProcessed
                app.requestForm.advisorApprove = data.data.form.advisorApprove
                app.requestForm.executiveApprove = data.data.form.executiveApprove
                app.requestForm.advisorComment = data.data.form.advisorComment
                app.requestForm.executiveComment = data.data.form.executiveComment
                app.requestForm.closedNote = data.data.form.closedNote

                Form.hash(app.requestForm).then(function(data){
                    console.log(data.data.hashRequestForm)
                    console.log(data.data.nothash)
                    app.requestFormHashData = data.data.hashRequestForm;
                })
            }else{
                console.log('fail to get form')
            }
        })
    }

    getForms();

    app.approveRequestFormAdvisor = function(){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};

        formObject.advisorComment = $scope.newAdvisorComment;
        Form.advisorApprove($routeParams.id).then(function(data){
            Form.update($routeParams.id,formObject).then(function(data){
                if(data.data.success){
                    app.loading =false
                    //create success Msg
                    console.log('success : '+data.data.message);
                    app.successMsg = data.data.message;
                    // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                    $timeout(function(){
                    //redirect to home page
                        $location.path('/requestFormList-Advisor')
                    },1000)
                }else{
                    app.loading =false
                    app.errorMsg = data.data.message;
                    console.log('error : '+data.data.message);
                }
            })
        })
    }

    
    app.implement = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        
        formObject.closedNote = $scope.newClosedNote;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.implement($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Registration-Department')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

    app.advisorRejectRequestForm = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        
        formObject.advisorComment = $scope.newAdvisorComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.advisorReject($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Advisor')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

    app.approveRequestFormExecutive = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};

        formObject.executiveComment = $scope.newExecutiveComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.executiveApprove($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Executive')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            })
        })
    }

    

    app.executiveRejectRequestForm = function(studentId){
        app.loading = true
        app.errorMsg = FontFaceSetLoadEvent
        var formObject = {};
        

        formObject.executiveComment = $scope.newExecutiveComment;
        var newStudentId = studentId;
        User.getStudentEmail(newStudentId).then(function(data){
            var email = data.data.email
            Form.executiveReject($routeParams.id,email).then(function(data){
                Form.update($routeParams.id,formObject).then(function(data){
                    if(data.data.success){
                        app.loading =false
                        //create success Msg
                        console.log('success : '+data.data.message);
                        app.successMsg = data.data.message;
                        // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                        $timeout(function(){
                        //redirect to home page
                            $location.path('/requestFormList-Executive')
                        },1000)
                    }else{
                        app.loading =false
                        app.errorMsg = data.data.message;
                        console.log('error : '+data.data.message);
                    }
                })
            }) 
        })
    }

    app.updateRequestForm = function(){
        app.loading = true
        app.errorMsg = false
        var formObject = {};

        formObject.title = $scope.newTitle;
        formObject.term = $scope.newTerm;
        formObject.tel = $scope.newTel;
        formObject.year = $scope.newYear;
        formObject.studentId = $scope.newStudentId;
        formObject.studentName = $scope.newStudentName;
        formObject.description = $scope.newDescription;
        formObject.advisorComment = $scope.newAdvisorComment;
        formObject.executiveComment = $scope.newExecutiveComment;
        Form.update($routeParams.id,formObject).then(function(data){
            if(data.data.success){
                app.loading =false
                //create success Msg
                console.log('success : '+data.data.message);
                app.successMsg = data.data.message;
                // timeout --->  $timeout([fn], [delay], [invokeApply], [Pass]);
                $timeout(function(){
                //redirect to home page
                    $location.path('/requestFormList')
                },1000)
            }else{
                app.loading =false
                app.errorMsg = data.data.message;
                console.log('error : '+data.data.message);
            }
        })
    }


    app.getUsers = function(){
        User.getUsers().then(function(data){
            app.name = data.data.names;
            app.username = data.data.usernames;
            app.permission = data.data.permissions;

            if(app.permission == 'executive'||app.permission == 'rd'){
                App.init();
            }
        });
    }

    app.getUsers()

    App = {
        web3Provider: null,
        contracts: {},
    
        init: async function () {
    
            return await App.initWeb3();
        },
    
        initWeb3: async function () {
            // Modern dapp browsers...
            if (window.ethereum) {
                App.web3Provider = window.ethereum;
                console.log('1')
                try {
                    // Request account access
                    await window.ethereum.enable();
                } catch (error) {
                    // User denied account access...
                    console.error("User denied account access")
                }
            } else if (window.web3) {
                console.log('2')
                App.web3Provider = window.web3.currentProvider;
            } else {
                console.log('3')
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            }
    
            web3 = new Web3(App.web3Provider);
    
            return App.initContract();
        },
    
        initContract: function () {
            console.log('work')
            $.getJSON('app/Blockchain/build/contracts/SRTSignature.json',function(data){
            
                console.log('get json success')
                
                var SRTSignatureArtifact = data
                
                App.contracts.SRTSignature = TruffleContract(SRTSignatureArtifact);
    
                // Set the provider for SRTSignature contract
                App.contracts.SRTSignature.setProvider(App.web3Provider);
    
                // Not implemented yet
                return App.markSigned();
            })
    
            return App.bindEvents();
        },
    
        bindEvents: function () {
            $(document).on('click', '.btn-sign', App.handleSign);
            $(document).on('click', '.btn-verify', App.handleVerify);
        },
    
        markSigned: function () {
            // Note implemented yet
    
        },
    
        handleSign: function (event) {
            event.preventDefault();
    
            var signature = "";
            var srtSignatureInstance;
    
            App.contracts.SRTSignature.deployed().then(function (instance) {
                srtSignatureInstance = instance;
    
                docId = app.requestFormId;
                signature = app.requestFormHashData;
                // docId = "SRT01/2565"
                // signature = "0x4581176e4289792499b0a657f1de073b090ce22de207999f95f15a9ad719676c24c03534227f320424aa0a56c3a45af1599678c17af8d5900886eea8363eefb01c"
                // docId = "SRT02/2565"
                // signature = "0x84e4f828108360a9d879800d1e42ff7b3f9f0aa14c34b0360aa16b55684d3bc903baef9bba41454047d0c9ca7ddf88b865cf0dc6325d162bba49185f5cd6c3501b"
    
                console.log("\nfunction pushRequestForm()")
                console.log("Request Form Id :", docId);
                console.log("Request Form Hash Data :", signature);
    
                return srtSignatureInstance.pushDocument(docId, signature, { from: web3.eth.accounts[0] });
            }).then(function (result) {
                console.log("Successfully submitted a Request Form into the Blockchain.");
                console.log("From account : "+web3.eth.accounts[0])
                return App.markSigned();
            }).catch(function (err) {
                console.log('Error : '+err.message);
            });
        },
    
        handleVerify: function (event) {
            event.preventDefault();
    

            docId = app.requestFormId;
            signature = app.requestFormHashData;
            // var docId = "SRT01/2565";
            // var signature = "0x4581176e4289792499b0a657f1de073b090ce22de207999f95f15a9ad719676c24c03534227f320424aa0a56c3a45af1599678c17af8d5900886eea8363eefb01c";
            // var docId = "SRT02/2565"
            // var signature = "0x84e4f828108360a9d879800d1e42ff7b3f9f0aa14c34b0360aa16b55684d3bc903baef9bba41454047d0c9ca7ddf88b865cf0dc6325d162bba49185f5cd6c3501b";
    
            var srtSignatureInstance;
    
            App.contracts.SRTSignature.deployed().then(function (instance) {
                srtSignatureInstance = instance;
                return srtSignatureInstance.verifyDocument(docId, signature);
            }).then(function (result) {
                console.log("\nfunction verify Request Form()")
                console.log("Request Form Id :", docId);
                console.log("Request Form Hash Data :", signature);
                console.log("result :", result);
                return App.markSigned();
            }).catch(function (err) {
                console.log(err.message);
            });
        }
    
    };

})

