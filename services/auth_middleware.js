// auth middleware jwt verify
 const jwt = require('jsonwebtoken');
    const { jwtSecretKey } = require('../config.js');
    const User = require('../model/user');



    module.exports = (req, res, next) => {
        try {
            const token = req.body.token;
            const decoded = jwt.verify(token, jwtSecretKey);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    }
