const { cloudinaryUploader } = require("../configurations/cloudinaryUploader");
const Classroom = require("../models/Classroom");
const User = require("../models/User");

exports.uploadFile=async(req,res)=>{
    try {
        const timetable=req.files.timetable
        const {id,classroom}=req.body;

        const uploaded=await cloudinaryUploader(timetable,process.env.FOLDER_NAME);

        const updateInstructor=await User.findByIdAndUpdate(id,
            {timetable:uploaded.secure_url},{new:true});

        const updatedClassroom=await Classroom.findByIdAndUpdate(classroom,
            {timetable:uploaded.secure_url},{new:true});
        
        return res.status(200).json({
            success:true,
            message:"File Uploaded Successfully",
            data:uploaded.secure_url
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to upload file',
            error: error.message,
        })
    }
}
