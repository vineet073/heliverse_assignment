const Classroom = require('../models/Classroom');

exports.createClassroom=async(req,res)=>{
    try {
        const {title,days,startTime,endTime}=req.body;
        console.log("data",req.body);
        if(!title||!days||!startTime||!endTime){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (!Array.isArray(days) || days.some(day => !validDays.includes(day))) {
            return res.status(400).json({
                success: false,
                message: "Invalid days provided. Please ensure days are valid and in the format ['Monday', 'Tuesday']."
            });
        }
        console.log("fasfda");
        
        const classroomDetails=await Classroom.create({
            title:title,
            days:days,
            startTime:startTime,
            endTime:endTime
        });
        console.log("classroomDetails",classroomDetails);   

        return res.status(200).json({
            success:true,
            message:"Classroom created successfully",
            classroomDetails
        });
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Something went wrong, please try again"
        });
    }
}

exports.getAllClassrooms=async(req,res)=>{
    try {
        const allCategorys=await Classroom.find({});
        
        return res.status(200).json({
            success:true,
            message:"All Classroom details returned successfully",
            allCategorys
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.getTimeTable=async(req,res)=>{
    const {classroom}=req.body;
    
    try {
        const classroomDetails=await Classroom.findById(classroom);
        
        return res.status(200).json({
            success:true,
            message:"Classroom details returned successfully",
            classroomDetails
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


