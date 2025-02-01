const User = require("../models/users");
const sendEmail = require("../utils/mailer");
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
       
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email orpassword"
            });
        }
        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token
            }
        });

    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isExixting = await User.findOne({email});

        if (!isExixting) {
           
            const user = await User.create({ name, email, password });

            const token = user.generateAuthToken();
    
            res.status(200).json({
                success: true,
                message: "Registration successful",
                data: {
                    user,
                    token
                }
            });
            
        }else{
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

       

    } catch (error) {
        next(error)
    }
}

exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email "
            });
        }

        const token = await user.generateResetPasswordToken();

        await sendEmail(user.email, "Reset Password", `http://localhost:3000/reset-password/${token}`);

        res.status(200).json({
            success: true,
            message: "Password reset link sent successfully",
            data: user
        });

    } catch (error) {
        next(error)
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendEmail(user.email, "Reset Password", "Password reset successful");

        res.status(200).json({
            success: true,
            message: "Password reset successful",
            data: user
        });

    } catch (error) {
        next(error)
    }
}