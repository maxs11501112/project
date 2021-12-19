var User = require('../models/user')
var requestForm = require('../models/requestForm')

//token --> https://github.com/auth0/node-jsonwebtoken
var jwt = require('jsonwebtoken');
const user = require('../models/user');
var secret = 'MaxDekHere';

module.exports = function(router){

    //ต้องทำ get สำหรับเรียกใช้ข้อมูลผ่าน api
    /*router.get('/requestForm',function(req,res){
        var request = new RequestForm();
        
    })*/


    router.post('/requestForm',function(req,res){
        var request = new requestForm();
        request.title = req.body.title
        request.term = req.body.term
        request.year = req.body.year
        request.tel = req.body.tel
        request.stdId = req.body.stdId
        request.formStatus = req.body.formStatus
        if (req.body.title == null || req.body.title == ' ' ||req.body.term == null  || req.body.term == ' ' ||req.body.year== null|| req.body.year == ' ' ||req.body.tel== null|| req.body.tel == ' ' ||req.body.stdId== null|| req.body.stdId == ' ' ){
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

    //User register route
    //http://localhost:8000/api/users
    router.post('/users',function(req,res) {
        var user = new User();
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email
        if (req.body.username == null || req.body.username == ' ' ||req.body.password == null  || req.body.password == ' ' ||req.body.email== null|| req.body.email == ' ' ){
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
                    var token = jwt.sign({ username : user.username , email : user.email },secret,{ expiresIn: '24h' });
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
        res.send(req.decoded)
    })

    return router;

}