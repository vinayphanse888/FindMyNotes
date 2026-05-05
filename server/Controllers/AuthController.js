import dotenv from "dotenv";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

dotenv.config();

// ✅ Cloudinary config (IMPORTANT)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= SIGNUP =================
const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword,
        } = req.body;

        console.log("📥 Request Body:", req.body);

        // ✅ Validation
        if (!userEmail || !userPassword || !userName) {
            return res.status(400).json({
                error: "Required fields missing",
            });
        }

        // ✅ Check existing user
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }

        // 🔐 Hash password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);

        // ✅ Image upload (optional)
        let imageUrl = "";

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                console.log("☁️ Cloudinary URL:", imageUrl);
            } catch (err) {
                console.log("❌ Cloudinary Error:", err);
            }
        }

        // ✅ Create user
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: imageUrl,
        });

        await newUser.save();

        console.log("✅ User Saved:", newUser);

        return res.status(200).json({
            message: "User Registered Successfully",
            user: newUser,
        });

    } catch (error) {
        console.log("❌ Signup Error:", error);

        // ✅ Duplicate key fix
        if (error.code === 11000) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({
                error: "Email and Password required",
            });
        }

        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(
            userPassword,
            user.userPassword
        );

        if (!passwordMatch) {
            return res.status(400).json({
                error: "Invalid password",
            });
        }

        return res.status(200).json({
            message: "Login Successful",
            user,
        });

    } catch (error) {
        console.log("❌ Login Error:", error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

export default { signup, login };