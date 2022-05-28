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
        default : "Created"
    },
    isSubmit: {
        type : Boolean,
        default : false
    },
    isProcessed: {
        type : Boolean,
        default : false
    },
    advisorApprove: {
        type : Boolean,
        default : false
    },
    executiveApprove: {
        type : Boolean,
        default : false
    },
    advisorComment: {
        type : String
    },
    executiveComment: {
        type : String
    },
    closedNote: {
        type : String
    },
    createDate: {
        type : String
    },
    create: {
        type : String
    },
    branch: {
        type : String
    }

})

module.exports = mongoose.model('requestForm',requestFormSchema)