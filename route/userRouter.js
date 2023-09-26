const express  = require('express');
const { UserRegister, getUsers, loginUser ,createNote,getNote ,sendEmail ,getUserId, videoPlay ,Attandance} = require('../controller/userController');
const verifyToken = require('../middlewares/tokenCompare');
const router = express.Router()

router.route('/register').post(UserRegister);
router.route('/register').get(verifyToken , getUsers);
router.route('/login').post(loginUser);
router.route('/message').post(verifyToken,createNote).get(verifyToken,getNote);
router.route('/password').post(verifyToken,sendEmail)
router.route('/video').get(videoPlay)
router.route('/attendance').post(verifyToken,Attandance).get(verifyToken,getUserId)

module.exports = router;