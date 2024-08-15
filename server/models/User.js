const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        required: true,
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: function() {
            return this.accountType === "Instructor" || this.accountType === "Student";
        }
    },
    assignedTeacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function() {
            return this.accountType === "Student";
        }
    }],
    image: {
        type: String,
    },
    timetable: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
