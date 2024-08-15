const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startTime: {
        type: String, // Storing time as a string for simplicity (e.g., "12:00 PM")
        required: true,
    },
    endTime: {
        type: String, // Storing time as a string for simplicity (e.g., "6:00 PM")
        required: true,
    },
    days: {
        type: [String], // Array of days (e.g., ["Monday", "Wednesday", "Friday"])
        required: true,
    },
    teacher:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the Teacher
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the Students
    }],
    timetable: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Classroom", classroomSchema);
