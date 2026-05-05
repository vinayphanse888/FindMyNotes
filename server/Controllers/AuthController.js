import dotenv from "dotenv";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

dotenv.config();

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

        console.log("Request Body:", req.body);

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(401).json({
                message: "User already exists with this email",
            });
        }

        // ✅ Check file
        if (!req.file) {
            return res.status(400).json({
                error: "No Profile Image Provided",
            });
        }

        // ✅ Upload to Cloudinary (CORRECT for diskStorage)
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("Cloudinary Upload:", result.secure_url);

        // 🔐 Hash password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(userPassword, salt);

        // ✅ Create user
        const newUser = new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: encryptedPassword,
            profileImage: result.secure_url,
        });

        // ✅ SAVE TO DATABASE
        await newUser.save();

        console.log("✅ User saved in DB:", newUser);

        return res.status(200).json({
            message: "User Registered Successfully",
            user: newUser,
        });

    } catch (error) {
        console.log("❌ Signup Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// ================= LOGIN =================
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.json({
                status: "Error",
                message: "User not found",
            });
        }

        const passwordMatch = await bcrypt.compare(
            userPassword,
            user.userPassword
        );

        if (!passwordMatch) {
            return res.json({
                status: "Error",
                message: "Invalid password",
            });
        }

        return res.status(200).json({
            status: "Success",
            user,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { signup, login };