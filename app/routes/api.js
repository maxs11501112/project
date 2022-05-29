var User = require('../models/user');
var requestForm = require('../models/requestForm');

const express = require('express');
const app = express();

const form = express.Router();

//token --> https://github.com/auth0/node-jsonwebtoken
var jwt = require('jsonwebtoken');
var user = require('../models/user');
var secret = 'MaxDekHere';

var nodemailer = require('nodemailer');
const { main } = require('@popperjs/core');
var sender = "request_form_utcc@outlook.co.th";
var s_pass = "022746579tT";

mail = function(recipient,text){
    // Send E-mail
    var options = {
        from: sender,
        to: recipient,
        subject: "Request form",
        text: text
    };

    transporter.sendMail(options, function (err,info){
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
        user: sender,
        pass: s_pass
    }
});



module.exports = function(router){

    //get all Request Form
    router.get('/manageRequestForm',function(req,res){
        requestForm.find({},function(err,forms) {
            if (err) throw err;
            else{
                res.json({ forms: forms})
            }
        })
    })

    //get all Request Form
    router.get('/getOne/:id',function(req,res){
        _id = req.params.id
        requestForm.findById(_id,function(err,forms) {
            if (err) throw err;
            else{
                res.json({ forms: forms})
            }
        })
    })

    router.get('/get-all-user',function(req,res){
        User.find({},function(err,users) {
            if (err) throw err;
                res.json({ users: users})
        })
    })
    
    //create Request Form
    router.post('/create-RequestForm',function(req,res){
        var request = new requestForm();
        request.title = req.body.title
        request.term = req.body.term
        request.year = req.body.year
        request.tel = req.body.tel
        request.description = req.body.description
        request.studentId = req.body.studentId
        request.studentName = req.body.studentName
        request.create = new Date().toLocaleString();
        var temp = req.body.studentId;
        var br = temp.substr(9,1);;
        if (br==1){
            request.branch = "EE"
        }else if (br==2){
            request.branch = "CPE"
        }else if (br==3){
            request.branch = "LE"
        }else{
            request.branch = "unknows"
        }
        if (req.body.title == null || req.body.title == ' ' ||req.body.term == null  || req.body.term == ' ' ||req.body.year== null|| req.body.year == ' ' ||req.body.tel== null|| req.body.tel == ' ' ||req.body.studentId== null|| req.body.studentId == ' '||req.body.studentName== null|| req.body.studentName == ' ' ){
            res.json({ success : false, message : 'Please ensure data were provided'})
            
        }else{
            request.save(function(err) {
                if(err){
                    res.json({ success : false, message : 'error : '+err})
                }
                else{
                    res.json({ success : true, message : 'Data has been saved!'})
                }
            });
        }
    })



    //update Request Form
    router.put('/update-RequestForm/:id',function(req, res){
        editRequestForm = req.params.id
        if (req.body.title) var newTitle = req.body.title
        if (req.body.term) var newTerm = req.body.term
        if (req.body.year) var newYear = req.body.year
        if (req.body.tel) var newTel = req.body.tel
        if (req.body.description) var newDescription = req.body.description
        if (req.body.studentId) var newStudentId = req.body.studentId
        if (req.body.studentName) var newStudentName = req.body.studentName
        if (req.body.advisorComment) var newAdvisorComment = req.body.advisorComment
        if (req.body.executiveComment) var newExecutiveComment = req.body.executiveComment
        if (req.body.closedNote) var newClosedNote = req.body.closedNote
        requestForm.findByIdAndUpdate(editRequestForm,({title : newTitle,term : newTerm,year : newYear,tel : newTel,description : newDescription,studentId : newStudentId,studentName : newStudentName,advisorComment : newAdvisorComment,executiveComment : newExecutiveComment,closedNote : newClosedNote}),function(err){
                if (err) {
                    res.json({success : false,message : 'Error : '+err})
                }else{
                    res.json({success : true,message : 'Data has been Updated successfully'})
                }
        })
    })

    router.get('/edit/:id', function(req,res){
        requestForm.findOne({ _id : req.params.id},function(err,form){
            if (err) throw err;
            if (!form){
                res.json({ success : false})
            }else{
                res.json({ success : true ,form : form})
            }
        })
    })

    //delete Request Form
    router.delete('/delete-RequestForm/:id',function(req, res, next){
        var deleteRequestForm = req.params.id;
        requestForm.findByIdAndRemove(deleteRequestForm, (error, data) => {
            if (error) {
                return next(error);
            }else{
                res.status(200).json({
                    message : 'Deleted Success',
                    success : true
                });
            }
        })
    })

    //get advisor email
    router.get('/get-Advisor-Email/:branch',function(req, res){
        var branchs = req.params.branch;
        var permissions = 'advisor';
        User.findOne({ branch: branchs, permission: permissions}, (error, data) => {
            if (error) throw error;
            if (!data){
                res.json({ success : false})
            }
            else{
                res.json({
                    email: data.email,
                    success: true
                });
            }
        })
    })

    //get advisor email
    router.get('/get-Student-Email/:studentId',function(req, res){
        var studentIds = req.param.studentId;
        var permissions = 'student';
        User.findOne({ studentId: studentIds, permission: permissions}, (error, data) => {
            if (error) throw error;
            if (!data){
                res.json({ success : false})
            }
            else{
                res.json({
                    email: data.email,
                    success: true
                });
            }
        })
    })

    //submit Request Form
    router.get('/submit-RequestForm/:id/:email',function(req, res){
        var approveRequestForm = req.params.id;
        var email = req.params.email;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Submit',isSubmit: true,advisorComment: '',executiveComment: '',closedNote: ''}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'Submit error'})
                }
                else{
                    recipient = email;
                    text = "The request is awaiting your approval. \nPlease click 'http://localhost:8000/approve-Advisor/"+approveRequestForm+"' to approve or reject.";
                    this.mail(recipient,text);

                    res.json({ success : true, message : 'Submit!!'})
                }
        })
    })

    //Approve Request Form (Advisor)
    router.get('/approve-RequestForm-Advisor/:id',function(req, res){
        var approveRequestForm = req.params.id;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Approved(advisor)',advisorApprove: true}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'Approve error'})
                }
                else{
                    recipient = "tonasds007@hotmail.com";
                    text = "The request is awaiting your approval. \nPlease click 'http://localhost:8000/approve-Advisor/"+approveRequestForm+"' to approve or reject.";
                    this.mail(recipient,text);

                    res.json({ success : true, message : 'Approve!!'})
                }
        })
    })

    //Reject Request Form (Advisor)
    router.get('/reject-RequestForm-Advisor/:id/:email',function(req, res){
        var approveRequestForm = req.params.id;
        var email = req.params.email;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Rejected',advisorApprove: false,isSubmit: false}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'reject error'})
                }
                else{
                    recipient = email;
                    text = "Your request has been rejected by advisor. \nPlease click 'http://localhost:8000/edit/"+approveRequestForm+"' to edit and resubmit later..";
                    this.mail(recipient,text);
                    
                    res.json({ success : true, message : 'reject!!'})
                }
        })
    })

    //Approve Request Form (Executive)
    router.get('/approve-RequestForm-Executive/:id/:email',function(req, res){
        var approveRequestForm = req.params.id;
        var email = req.params.email;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Approved(executive)',executiveApprove: true}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'Approve error'})
                }
                else{
                    recipient = email;
                    text = "Your request has been approved by executive. \nPlease click 'http://localhost:8000/edit/"+approveRequestForm+"' to show more info..";
                    this.mail(recipient,text);

                    res.json({ success : true, message : 'Approve!!'})
                }
        })
    })

    //The request has been processed successfully.
    router.get('/implement/:id/:email',function(req, res){
        var approveRequestForm = req.params.id;
        var email = req.params.email;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Processed',isProcessed: true}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'implement error'})
                }
                else{
                    recipient = email;
                    text = "Your request has been processed successfully. \nPlease click 'http://localhost:8000/edit/"+approveRequestForm+"' to show more info..";
                    this.mail(recipient,text);

                    res.json({ success : true, message : 'Processed!!'})
                }
        })
    })

    //Reject Request Form (Executive)
    router.get('/reject-RequestForm-Executive/:id/:email',function(req, res){
        var approveRequestForm = req.params.id;
        var email = req.params.email;
        requestForm.findByIdAndUpdate(approveRequestForm,({formStatus: 'Rejected',executiveApprove: false,advisorApprove: false,isSubmit: false}) ,function(err) {
                if(err){
                    res.json({ success : false, message : 'reject error'})
                }
                else{
                    recipient = email;
                    text = "Your request has been rejected by executive. \nPlease click 'http://localhost:8000/edit/"+approveRequestForm+"' to edit and resubmit later..";
                    this.mail(recipient,text);

                    res.json({ success : true, message : 'reject!!'})
                }
        })
    })


    //User register route
    //http://localhost:8000/api/users
    router.post('/users',function(req,res) {
        var user = new User();
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email
        user.permission = req.body.permission
        user.name = req.body.name
        if (req.body.username == null || req.body.username == ' ' ||req.body.password == null  || req.body.password == ' ' ||req.body.email== null|| req.body.email == ' ' ||req.body.permission== null|| req.body.permission == ' '||req.body.name== null|| req.body.name == ' ' ){
            res.json({ success : false, message : 'Ensure username,email and password were provided'})
            
        }else{
            user.save(function(err) {
                if(err){
                    res.json({ success : false, message : 'Username or Email already exists!'})
                }
                else{
                    res.json({ success : true, message : 'user created'})
                }
            });
        }
    
    })

    //User login route
    router.post('/authenticate',function(req,res){
        User.findOne({ username : req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.json({success: false, message:'Could not autheticate user'})
            } else if (user){
                if(req.body.password){
                    var validPassword = user.comparePassword(req.body.password)
                }else{
                    res.json({success : false ,message : 'No password provided'})
                }
                
                if (!validPassword){
                    res.json({success : false ,message : 'Could not autheticate password'})
                }else{
                    var token = jwt.sign({ username : user.username , email : user.email , permission : user.permission},secret,{ expiresIn: '24h' });
                    res.json({success : true ,message : 'User autheticated',token :token})
                }
            }
            
        })
    })

    router.use(function(req,res,next){
        var token = req.body.token || req.body.query || req.headers['x-access-token']

        if (token){
            jwt.verify(token, secret,function(err,decoded){
                if(err){
                    res.json({success : false,message : 'Token Invalid'})
                }else{
                    req.decoded =decoded
                    next();
                }
            })

        }else{
            res.json({success : false, message : 'No token provided'})
        }

    })

    
    router.post('/me',function(req,res){
        res.send( req.decoded )
    })

    // router.get('/permission',function(req,res){
    //     User.findOne({ username: req.decoded.username },function(err,user){
    //         if (err) throw err;
    //         if(!user){
    //             res.json({ success: false, message: 'No user not found'});
    //         }else{
    //             res.json({ success: true, permissions: user.permission });
    //         }
    //     })
    // })


    router.get('/management',function(req,res){
        User.find({},function(err,users){
            if (err) throw err;
            User.findOne({ username: req.decoded.username },function(err,mainUser){
                if (err) throw err;
                if(!mainUser){
                    res.json({ success: false, message: 'No user not found'});
                }else{
                    if (mainUser.permission === 'advisor' || mainUser.permission === 'executive' || mainUser.permission === 'admin'|| mainUser.permission === 'student'|| mainUser.permission === 'rd'){
                        if(!user){
                            res.json({ success : false, message: 'Users not found'});
                        }else{
                            res.json({ success: true, users: users,usernames:mainUser.username , permissions: mainUser.permission, names: mainUser.name, branch: mainUser.branch, _id: mainUser._id})
                        }
                    }else{
                        res.json({ success: false, names: mainUser.name , message: 'Insufficient Permissions' })
                    }
                }
            })
        })
    })

    router.delete('/delete-User/:username',function(req,res){
        var deletedUser = req.params.username;
        User.findOne({username: req.decoded.username }, function(err,mainUser){
            if (err) throw err;
            if(!mainUser){
                res.json({ success: false, message: 'No user found'});
            }else{
                if(mainUser.permission === 'student'){
                    res.json({ success: false, message: 'Insufficient Permissions'});
                }else{
                    User.findOneAndRemove({ username: deletedUser }, function(err,user){
                        if (err) throw err;
                        res.json({ success: true });
                    })
                }
            }
        })
    })

    

    return router;

}