// Importing packages
import bcryptjs from "bcryptjs";
import validator from "validator";
// Importing files
import { User } from "../models/user-model.js";
import { generateTokenAndSetCookies } from "../../utils/generateTokenAndSetCookies.js";
import { sendVerificationEmail, sendSuccessfulVerificationEmail, forgotPasswordResetEmail, passwordSuccessfulEmail } from "../mail/email.js";
import crypto from "crypto"
// Signup function
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields"
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        }

        // Custom password validation (min 8 chars, 1 number, 1 uppercase, 1 lowercase, 1 special char)
        const passwordConditions = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordConditions.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters, and include one number, one uppercase letter, one lowercase letter, and one special character"
            });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const passwordHash = await bcryptjs.hash(password, 10);

        // Generate a verification token
        const verificationToken = Math.floor(10000 + Math.random() * 90000).toString();
       
        // Create a new user
        const user = new User({
            name,
            email,
            password: passwordHash,
            verificationToken,
           verificationTokenExpiredAt : Date.now() + 1* 60 * 60 * 1000
        });

        // Save the user to the database
        await user.save();

         await generateTokenAndSetCookies(res, user._id);
         await sendVerificationEmail(user.email,name, verificationToken);

        // Return success response
        res.status(201).json({
            success: true,
            message: "User registered successfully. Verify your Email!",
            user: {
                ...user._doc,
               
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// verify account

export const verifyAccount = async (req, res) => {
    const { code } = req.body;

    try {
        // Check if code is provided
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Verification code is required"
            });
        }

        // Find the user with the matching verification token
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpiredAt: { $gt: Date.now() } // Check token expiration
        });

        // If no user is found or token has expired, return an error
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            });
        }

        // Update user status to verified
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token
        user.verificationTokenExpiredAt = undefined; // Clear the expiration
        await user.save();
        await sendSuccessfulVerificationEmail(user.email);
        // Return success response
        res.status(200).json({
            success: true,
            message: "Account verified successfully"
        });

    } catch (error) {

        console.error("Verification Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        user.lastLogin = Date.now();
        await user.save();
        await generateTokenAndSetCookies(res, user._id);

        res.status(200).json({
            success: true,
            message: "User successfully logged in",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// logout
export const logout = (req, res) => {
    // Clear the cookie that stores the token
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Match the cookie settings
        sameSite: "strict",
    });

    res.status(200).json({
        success: true,
        message: "Successfully logged out"
    });
};

// forgot password

export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // If no user is found, return a message
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate reset password token
        const resetToken = crypto.randomBytes(20).toString("hex");
        
        // Set the expiration date for the token (1 hour from now)
        const resetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000;

        // Save the reset token and expiration time to the user
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiredAt = resetTokenExpiredAt;

        await user.save();

        // Send email with the password reset link (Include your client URL here)
        await forgotPasswordResetEmail(user.email, `${process.env.USER_URL}/reset-password/${resetToken}`);

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });

    } catch (error) {
        // Handle any errors
        console.error("Error during password reset:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//reset password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;  

    try {
        // Find the user with the matching reset token and ensure the token hasn't expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiredAt: { $gt: Date.now() } // Token should not be expired
        });

        // If user is not found or token is expired
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token or Expired Token"
            });
        }

        // Hash the new password
        const hashPassword = await bcryptjs.hash(password, 10);

        // Update user password and clear the reset token fields
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiredAt = undefined;

        // Save the updated user information
        await user.save();

        // Optionally, send a password reset success email
        await passwordSuccessfulEmail(user.email);

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "Your password has been successfully reset."
        });

    } catch (error) {
        console.error("Error during password reset:", error);

        // Handle server-side errors
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// check authorization
export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                password: undefined  // Ensure password is not returned
            }
        });
    } catch (error) {
        console.error("Error during user authentication:", error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
