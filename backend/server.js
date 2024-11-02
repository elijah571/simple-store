// Importing Node.js dependencies
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
// Importing custom files
import { connectDB } from "./dataBase/connectDb.js";
import { productRoute } from "./routes/product-route.js";
import { cartRoute } from "./routes/cart-route.js";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewars
app.use(express.json());
app.use(cors());
app.use(express.static('images')); // Serve images folder statically

// Connect to the databases
connectDB();

// Define routes
app.use("/api/store", productRoute);
app.use("/api/store", cartRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
