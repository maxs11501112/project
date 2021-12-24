var User = require('../models/user');
var requestForm = require('../models/requestForm');

const express = require('express');
const app = express();

const form = express.Router();

//token --> https://github.com/auth0/node-jsonwebtoken
var jwt = require('jsonwebtoken');
var user = require('../models/user');
var secret = 'MaxDekHere';

module.exports = function(router){


    //get all Request Form
    router.get('/get-all',function(req,res){
        requestForm.find({},function(err,forms) {
            if (err) throw err;
                res.json({ forms: forms})
        })
    })

    router.post('/get-permission',function(req,res){
        User.findOne({ username:req.decoded.username },function(err,permission) {
            if (err) throw err
                res.send({ permission:permission })
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
        //request.formStatus = "un-submit"//req.body.formStatus
        if (req.body.title == null || req.body.title == ' ' ||req.body.term == null  || req.body.term == ' ' ||req.body.year== null|| req.body.year == ' ' ||req.body.tel== null|| req.body.tel == ' ' ||req.body.studentId== null|| req.body.studentId == ' '||req.body.studentName== null|| req.body.studentName == ' ' ){
            res.json({ success : false, message : 'กรุณาใส่ข้อมูลให้ครบถ้วน'})
            
        }else{
            request.save(function(err) {
                if(err){
                    res.json({ success : false, message : 'error : '+err})
                }
                else{
                    res.json({ success : true, message : 'บันทึกข้อมูลเสร็จสิ้น'})
                }
            });
        }
    })

    //read Request Form
    router.get('/read-RequestForm/:id',function(req,res){
        requestForm.find(req.params.id, (error,data) => {
            if (error) {
                return next(error);
            }else{
                res.json(data);
            }
        })
    })

    //update Request Form
    router.put('/update-RequestForm/:id',function(req, res, next){
        requestForm.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, (error,data) => {
            if (error) {
                return next(error);
                console.log(error)
            }else{
                res.json(data);
                console.log('Request Form Updated Successfully!!')
            }
        })
    })

    //delete Request Form
    router.delete('/delete-RequestForm/:id',function(req, res, next){
        requestForm.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            }else{
                res.status(200).json({
                    msg: data
                });
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

    router.get('/permission',function(req,res){
        User.findOne({ username: req.decoded.username },function(err,user){
            if (err) throw err;
            if(!user){
                res.json({ success: false, message: 'No user not found'});
            }else{
                res.json({ success: true, permissions: user.permission });
            }
        })
    })


    router.get('/management',function(req,res){
        User.find({},function(err,users){
            if (err) throw err;
            User.findOne({ username: req.decoded.username },function(err,mainUser){
                if (err) throw err;
                if(!mainUser){
                    res.json({ success: false, message: 'No user not found'});
                }else{
                    if (mainUser.permission === 'advisor' || mainUser.permission === 'executive'){
                        if(!user){
                            res.json({ success : false, message: 'Users not found'});
                        }else{
                            res.json({ success: true, users: users, permissions: mainUser.permission, name: mainUser.name })
                        }
                    }else{
                        res.json({ success: false, message: 'Insufficient Permissions' })
                    }
                }
            })
        })
    })

    return router;

}