import mongoose from "mongoose";
import { User } from "./user-model.js";
import { Product } from "./products.model.js";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [cartItemSchema]
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
