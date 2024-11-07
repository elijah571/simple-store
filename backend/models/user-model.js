import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    verificationToken: String,
    verificationTokenExpired: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiredAt: Date
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
