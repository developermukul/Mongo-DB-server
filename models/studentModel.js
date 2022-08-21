const mongoose = require('mongoose')



const studentModel = mongoose.Schema({
    name : {
        type        : String,
        required    : [true, 'Name field is required'],
        trim        : true
    },
    email : {
        type        : String,
        required    : [true, 'Email field is required'],
        trim        : true
    },
    cell : {
        type        : String,
        required    : [true, 'Cell field is required'],
        trim        : true
    },
    username : {
        type        : String,
        required    : [true, 'Username field is required'],
        trim        : true
    },
    location : {
        type        : String,
        default     : "Dhaka",
        trim        : true
    },
    skill : {
        type        : String,
        trim        : true
    },
    password : {
        type        : String
    }
}, {
    timestamps : true
})



module.exports = mongoose.model('Student', studentModel)