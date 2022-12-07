// create user schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        default:""
    },
    sl:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    empid:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    // list of strings
    prefrences:[{
        type:String,
        required:true
    }],
    // ref another user
    xmasFriend:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    qoute:{
        type:String,
        default:""
    },
    token:{
        type:String,
    },
    isverified:{
        type:Boolean,
        default:false
    },
    xFriendCode:{
        type:String,
        default:""
    },
    xFriendStatus:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
