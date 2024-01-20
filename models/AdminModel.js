const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const register = mongoose.model('register',registerSchema);
module.exports = register;