import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookies = async (res, userId) => {
    // Generate JWT token with the user ID
    const token = jwt.sign({ userId }, process.env.JWT, {
        expiresIn: "1d", // Token expires in 1 day
    });

    // Set the cookie with the token
    res.cookie("token", token, {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict", // Prevents cross-site request forgery
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return token; // Return the generated token (optional)
};
