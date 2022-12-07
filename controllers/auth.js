const newOTP = require("otp-generators");
const User = require("../model/user");
const friends = require("../data/friends");
const mailer = require("../services/mail");
const {jwtSecretKey}=require("../config");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    let otp = newOTP.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const email = req.body.email;
    // check if user exists
    let user = await User.findOne({ email: email });
    if (!user) {
      //  check if user exists in friends list
 
      let friend = friends.find((friend) => friend.email === email);
      if (!friend) {
        return res.status(401).json({ msg: "Your record not found!" });
      } else {
        // create new user

        user = new User({
          name: friend.name,
          email: friend.email,
          sl: friend.sl,
          gender: friend.gender,
          empid: friend.empid,
          phone: friend.phone,
          otp: otp,
          prefrences:["","",""],
        });
        await user.save();
        // send otp
        mailer(friend.name,email, otp);
        return res.status(200).json({ msg: "OTP sent" });
      }
    }
    // update otp and send otp
    user.otp = otp;
    await user.save();
    mailer( user.name, email,otp);
    return res.status(200).json({ msg: "OTP sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "An Error Occured :(" });
  }
};


// verify otp
exports.verify = async (req, res, next) => {
    try {
        const email = req.body.email;
        const otp = req.body.otp.toString();
      
        // check if user exists
        let user = await User.findOne ({email:email });
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }
        // check if otp matches
        if(user.otp !== otp){
          console.log(user.otp,otp);
            return res.status(401).json({msg:"Invalid OTP"});
        }
        // update otp and isverified
        const token = jwt.sign({id:user._id},jwtSecretKey,{expiresIn:"40d"});

        user.otp = "";
        user.isverified = true;
        await user.save();
        // send token
        // generate token with expiry on 20 jan 2023
        
        return res.status(200).json({msg:"User verified successfully",token:token,data:user});
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:"An Error Occured :("});
    }
};

