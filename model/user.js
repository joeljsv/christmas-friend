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
        default:""
    },
    phone:{
        type:String,
        default:""
    },
    // list of strings
    prefrences:[{
        type:String,
    }],
    // ref another user
    xmasFriend:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    isprofilecomplete:{
        type:Boolean,
        default:false
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
