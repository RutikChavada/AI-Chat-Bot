const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codelingotutorial@gmail.com",
    pass: "efry zcnq rjzd cfsd",
  },
});

const createUser = async (req, res) => {
  try {
    const { fname, lname, email, phone, password, cpassword } = req.body;
    console.log(req.body);

    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    if (!fname || !lname || !email || !phone || !password || !cpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for registration.",
      });
    }

    if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords and Confirm Password are not same",
      });
    }

    // Ensure the password is a string before passing to bcrypt
    const hashedPassword = bcrypt.hashSync(password.toString(), 10);

    const newUser = await userModel.create({
      fname,
      lname,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User successfully registered.",
      user: newUser,
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email.",
      });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ userId: user._id }, "hiren1234", {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "User successfully logged in.",
      token: token,
      user: user,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email.",
      });
    }
    const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
    const mailOptions = {
      from: "idkworld0078@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error sending email.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "OTP sent to email.",
      });
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email.",
      });
    }

    if (user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (err) {
    console.error("Error in resetPassword:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const contactUs = async (req, res) => {
  try {
    const { fullName, email, contact, message } = req.body;
    if (!fullName || !email || !contact || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields.",
      });
    }

    const mailOptions = {
      from: "no-reply@codelingo.com",
      to: "codelingotutorial@gmail.com",
      subject: "Contact Us",
      text: `Name: ${fullName}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`,
    };

    const mailOptionsToUser = {
      from: "no-reply@codelingo.com",
      to: email, 
      subject: "Contact Us - Copy of Your Submission",
      text: `Thank you for contacting us. Here is a copy of your submission:\n\nName: ${fullName}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error.",
        });
      }
      transporter.sendMail(mailOptionsToUser, (err, info) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal server error.",
          });
        }
      });
      return res.status(200).json({
        success: true,
        message: "Message sent successfully.",
      });
    });
  } catch (err) {
    console.error("Error in contactUs:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  contactUs,
};
1
