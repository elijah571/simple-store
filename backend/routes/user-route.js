import express from "express";
import { signup, verifyAccount, login, logout, forgetPassword, resetPassword, checkAuth } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verify-token..js";

export const userRoute = express.Router();

userRoute.get("/check-authorization", verifyToken, checkAuth)
userRoute.post("/signup", signup);
userRoute.post("/verify-account", verifyAccount);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.post("/forgotpassword", forgetPassword);
userRoute.post("/reset-password/:token", resetPassword);
