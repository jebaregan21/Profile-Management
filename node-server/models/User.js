const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password :{
        type : String,
        default : null
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    city : {
        type :String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    gauth : {
        type : Boolean,
        required : true,
        default : false
    }
});

module.exports = mongoose.model('User',userSchema);