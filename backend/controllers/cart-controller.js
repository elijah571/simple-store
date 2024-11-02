import { Product } from "../models/products.model.js";

// Initialize the cart array
let cart = [];

// Add to cart
export const addToCart = async (req, res) => {
   try {
        // Get the product ID from the URL parameters and find the product
        const product = await Product.findById(req.params.id);

        // If the product is not found, return an error response
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }
        
        // Add the product to the cart
        cart.push(product);
        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            cart: cart
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// Get cart
export const getCart = (req, res) => {
    res.status(200).json({
        success: true,
        cart: cart
    });
}

// Remove all items from cart (checkout)
export const checkOut = (req, res) => {
    cart = []; // Clear the cart array
   
    res.status(200).json({
        success: true,
        message: "Checkout successful, cart is now empty"
    });
}
