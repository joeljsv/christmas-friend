const User = require("../model/user");
const friends = require("../data/friends");


// update all fields of user
exports.update = async (req, res, next) => {

    try {
        
        // get phone qoute and prefrences from req.body
        // find user by id and update
        const { phone, qoute, prefrences } = req.body;
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        console.log(prefrences);
        user.prefrences=prefrences;
        user.qoute=qoute;
        user.phone=phone;
        user.isprofilecomplete=true;
        // find by id 
        console.log(user);
        await user.save();
        
        return res.status(200).json({user});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "An Error Occured :(" });
    }
};
// show profile
exports.showProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "An Error Occured :(" });
    }
};
// show all users

exports.showAll = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(400).json({ msg: "No users found" });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "An Error Occured :(" });
    }
}
// show xmasFriend of user
exports.showXmasFriend = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id
        );
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        const xmasFriend = await User.findById(user.xmasFriend);
        if (!xmasFriend) {
            return res.status(400).json({ msg: "Xmas Friend not found" });
        }
        return res.status(200).json(xmasFriend);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "An Error Occured :(" });
    }
}
// list all verified users and send response to client with name and quote
exports.showAllFriends = async (req, res, next) => {
    try {
        const users = await (await User.find({ verified: true }));
        if (!users) {
            return res.status(400).json({ msg: "No users found" });
        }
        const list = [];
        users.forEach(user => {
            list.push({ name: user.name, quote: user.qoute,user_id:user._id });
        });
        return res.status(200).json({joinedUsers:list});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "An Error Occured :(" });
    }
}



