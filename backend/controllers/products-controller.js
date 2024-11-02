import { Product } from "../models/products.model.js";
// get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        if (!products) {
            return res.status(400).json({
                success: false,
                message: "Failed to get products"
            });
        }
        
        res.status(200).json(products);
        
    } catch (error) {

        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
// get a single product  product
export const getProduct = async (req, res) => {
    try {
        // Get the product ID from the URL parameters
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }
        
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};