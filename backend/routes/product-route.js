import express from 'express';
import { getProduct, getProducts } from '../controllers/products-controller.js';

export const productRoute = express.Router();

// Route to get all products
productRoute.get("/products", getProducts);

// Route to get a product by ID
productRoute.get("/product/:id", getProduct);
