import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;  // Correct variable name
    
    if (!token) {  // Check if token is not present
        return res.status(401).json({
            success: false,
            message: "Invalid or Unauthorized token"  // Fixed typo in message
        });
    }

    try {
        // Verify the token using jwt.verify
        const decoded = jwt.verify(token, process.env.JWT);
        
        // If token is invalid, this block will execute
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid or Unauthorized token"
            });
        }

        // If token is valid, attach the userId to the request object and proceed to the next middleware
        req.userId = decoded.userId;
        next();  // Move to the next middleware or route handler

    } catch (error) {
        console.error("Error during token verification:", error);  // Corrected the error message
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
