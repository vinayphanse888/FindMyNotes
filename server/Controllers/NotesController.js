import express from "express";
import dotenv from "dotenv";
import Notes from "../Models/Notes.js";

dotenv.config();

// ================= UPLOAD NOTE =================
const uploadNote = async (req, res) => {
    try {
        const fileName = req.body.title;
        const fileDescription = req.body.description;
        const tags = req.body.tags;

        // ✅ FIX: check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // ✅ FIX: correct file usage (diskStorage → filename)
        const file = req.file.filename;

        const uploadedBy = req.body.userId;
        console.log(uploadedBy);

        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            tags: tags,
            files: file,
            uploadedBy: uploadedBy
        });

        await newFile.save();

        console.log("✅ Note saved:", newFile);

        res.send({ status: "Ok" });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

// ================= GET NOTES =================
const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        const query = {};

        if (title) {
            query.fileName = {
                $regex: title,
                $options: "i"
            };
        }

        // ✅ FIX: tag → tags
        if (tag) {
            query.tags = {
                $regex: tag,
                $options: "i"
            };
        }

        const data = await Notes.find(query);
        res.send({ data: data });

    } catch (error) {
        console.log(error);
    }
};

// ================= GET NOTES BY USER =================
const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        const data = await Notes.find({
            uploadedBy: userId
        });

        res.send({ data: data });

    } catch (error) {
        console.log(error);
    }
};

export default { uploadNote, getNote, getNoteByID };