var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var requestFormSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    term: {
        type : String,
        required : true
    },
    year: {
        type : String,
        required : true
    },
    tel: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    studentId: {
        type : String,
        required : true
    },
    studentName: {
        type : String,
        require : true
    },
    formStatus: {
        type : String,
        default : "un-submit"
    }

})

module.exports= mongoose.model('requestForm',requestFormSchema)