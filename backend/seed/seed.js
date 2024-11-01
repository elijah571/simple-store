import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/products.model.js";
// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
       
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        process.exit(1);
    }
};

connectDB();


const seedProduct = async () => {
    const products = [
        {
            name: 'Digital Camera',
            price: 210,
            image: "../images/digital-camera.jpg",
            description: "Capture life's moments in stunning detail with the UltraZoom Pro Digital Camera. Designed for both amateur photographers and seasoned professionals, this camera combines advanced technology with user-friendly features, making it an essential tool for any photography enthusiast.",
            stock: 10
        },
        {
            name: "Head Set",
            price: 100,
            image: "../images/head-set.jpg",
            description: "Whether you’re looking to enhance your music experience, elevate your gaming, or improve your productivity during work calls, the SonicWave Wireless Headset is your ultimate audio companion.",
            stock: 30
        },
        {
            name: "iPhone 15 Pro Max",
            price: 5000,
            image: "../images/iphone.jpg",
            description: "Enjoy the latest features and enhancements with iOS 17, providing a seamless user experience, enhanced privacy options, and powerful new apps that help you stay productive and connected.",
            stock: 15
        },
        {
            name: "Camera",
            price: 120,
            image: "../images/camera.jpg",
            description: "Share your photos instantly with built-in Wi-Fi and Bluetooth connectivity. Easily transfer images to your smartphone or tablet for quick editing and sharing on social media.",
            stock: 10
        },
        {
            name: "ProPlay Game Pad",
            price: 75,
            image: "../images/game-pads.jpg",
            description: "ProPlay Game Pad is compatible with a wide range of devices, including PC, PlayStation, Xbox, and Nintendo Switch.",
            stock: 14
        },
        {
            name: "AeroBook X15 Laptop",
            price: 1200,
            image: "../images/laptop.jpg",
            description: "Power through your day with the AeroBook X15 Laptop, crafted for productivity, creativity, and entertainment.",
            stock: 5
        },
        {
            name: "Mouse",
            price: 100,
            image: "../images/mouse.jpg",
            description: "The PrecisionPro Wireless Mouse combines versatility, comfort, and advanced technology to enhance your digital experience.",
            stock: 50
        },
        {
            name: "TitanForce Game Pad",
            price: 70,
            image: "../images/pad.jpg",
            description: "The TitanForce Game Pad offers a perfect balance of comfort, precision, and versatility, making it an excellent choice for both casual and competitive gamers.",
            stock: 70
        },
        {
            name: "ChronoMaster Elite Wrist Watch",
            price: 550,
            image: "../images/wrist-watch.jpg",
            description: "Timeless elegance meets cutting-edge precision with the ChronoMaster Elite Wrist Watch, a perfect blend of style and functionality.",
            stock: 10
        },
        {
            name: "Samsung Galaxy Ultra",
            price: 3000,
            image: "../images/samsung-galaxy.png",
            description: "The Samsung Galaxy Ultra is designed for those who want the best in innovation, style, and performance.",
            stock: 5
        },
        {
            name: "VisionX VR Headset",
            price: 1200,
            image: "../images/vitual.jpeg",
            description: "The VisionX VR Headset is a gateway to new realities, designed for those who crave immersion, exploration, and innovation.",
            stock: 15
        },
        {
            name: "Samsung",
            price: 2500,
            image: "../images/samsung.jpg",
            description: "An excellent smartphone with cutting-edge technology.",
            stock: 8
        }
    ];

    try {
        await Product.deleteMany();
        await Product.insertMany(products); 
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
}

const runSeeder = async () => {
    await connectDB();
    await seedProduct();
    mongoose.disconnect();
}

runSeeder();
