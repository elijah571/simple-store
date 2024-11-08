// Importing Node.js dependencies
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
// Importing custom files
import { connectDB } from "./dataBase/connectDb.js";
import { productRoute } from "./routes/product-route.js";
import { cartRoute } from "./routes/cart-route.js";
import { userRoute } from "./routes/user-route.js";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));
app.use(cookieParser());

// Connect to the database
connectDB();

// Define routes
app.use("/api/store", userRoute); // Corrected route path
app.use("/api/store", productRoute);
app.use("/api/store", cartRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
