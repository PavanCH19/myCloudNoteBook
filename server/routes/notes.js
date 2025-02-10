const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../modules/Notes");
const { body, validationResult } = require("express-validator");

const app = express(); // Initialize Express app

// =======================================
// Route: Create a New Note
// =======================================
app.post("/createNote", fetchUser, [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
    body("tag", "Tag must be at least 3 characters").isLength({ min: 3 }),
],
    async (req, res) => {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Create a new note
            const newNote = await Notes.create({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id,
            });

            res.status(201).json({ msg: "Note created successfully", note: newNote });
        } catch (error) {
            console.error("Error creating note:", error);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

// =======================================
// Route: Fetch All Notes for Logged-in User
// =======================================
app.get("/fetchNotes", fetchUser, async (req, res) => {
    try {
        // Fetch notes for the logged-in user
        const notes = await Notes.find({ user: req.user.id });
        res.status(200).json({ notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// =======================================
// Route: Update a Note by ID
// =======================================
app.put("/updateNote/:id", fetchUser, [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
    body("tag", "Tag must be at least 3 characters").isLength({ min: 3 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Find the note by ID
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        // Ensure the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { title, description, tag }, { new: true });

        res.status(200).json({ msg: "Note updated successfully", note });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// =======================================
// Route: Delete a Note by ID
// =======================================
app.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
        // Find the note by ID
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        // Ensure the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        // Delete the note
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = app; // Export the app
