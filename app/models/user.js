var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new Schema({
    username: {type: String, lowercase: true, required: true, unique: true },
    password: {type: String, required: true },
    email: {type : String, required:true , lowercase: true, unique: true },
    permission: {type : String, required:true },
    name: {type: String, required:true }
})

UserSchema.pre('save', function(next) {
    var user =this;
    // Hash password (bcrypt)--> https://www.npmjs.com/package/bcrypt-nodejs
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err)
        user.password = hash;
        next();
    })
  });

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports= mongoose.model('User',UserSchema)