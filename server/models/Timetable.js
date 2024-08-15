const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: true,
    },

	subject: {
		type: String,
		required: true,
	},
	startTime: {
		type: String, // Storing time as a string for simplicity
		required: true,
	},
	endTime: {
		type: String, // Storing time as a string for simplicity
		required: true,
	},
	day: [{
		type: String, 
		enum:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],// Day of the week
		required: true,
	}],

}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);
