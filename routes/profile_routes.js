// route 
const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
const authMille= require('../services/auth_middleware');

router.post('/update',authMille, profile.update);
router.post('/showProfile',authMille, profile.showProfile);
router.post('/showAll',authMille, profile.showAll);
router.post('/showXmasFriend',authMille, profile.showXmasFriend);
router.post('/showAllFriends',authMille, profile.showAllFriends);




module.exports = router;