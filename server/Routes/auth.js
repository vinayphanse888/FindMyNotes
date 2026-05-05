import express from "express";
const router = express.Router();
import authController from "../Controllers/AuthController.js";
import multer from "multer";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./images";
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

var upload = multer({
    storage: storage
});

// Signup
router.post("/signup", upload.single("profileImage"), authController.signup);

// Login
router.post("/login", authController.login);

export default router;