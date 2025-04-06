const express = require("express")
const { createUser, loginUser, forgotPassword, resetPassword, contactUs } = require("../controllers/loginController")
const { verifyToken } = require("../middleware/Auth")
const userModel = require("../models/userModel");
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/contactUs', contactUs);
router.get('/check', verifyToken, check = async (req,res) => {
    return res.json({message: 'page is under construction.'});
});



module.exports = router