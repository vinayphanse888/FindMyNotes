import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./Routes/auth.js";
import noteRoutes from "./Routes/notes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6969;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Server Is Running");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files"));

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});