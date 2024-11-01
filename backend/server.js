// Importing Node.js dependencies
import express from "express";
import dotenv from "dotenv";
// Importing custom files
import { connectDB } from "./dataBase/connectDb.js";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewar
app.use(express.json());
app.use(express.static('images')); // Serve images folder statically

// Connect to the database
connectDB();

// Define routes
app.get("/", (req, res) => {
    res.send("Hello, Node.js!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
