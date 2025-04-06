const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: {
        type: String,
    },
    resetOtpExpiry: {
        type: Date,
    },
})

const user = mongoose.model('User', userSchema)
module.exports = user