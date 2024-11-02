import express from "express";
import { addToCart, getCart, checkOut } from "../controllers/cart-controller.js";

export const cartRoute = express.Router();

// Route to add a product to the cart
cartRoute.post('/add-cart/:id', addToCart);


// Route to get the contents of the cart
cartRoute.get("/get-cart", getCart);

// Route to check out (clear the cart)
cartRoute.post("/checkout", checkOut);
