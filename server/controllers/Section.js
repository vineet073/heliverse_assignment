const Section=require('../models/Section');
const Course=require('../models/Course');

exports.createSection=async(req,res)=>{
    try {
        const {sectionName,courseID}=req.body;

        if(!sectionName||!courseID){
            return res.status(404).json({
                success:false,
                message:"Missing required properties"
            })
        }

        const newSection=await Section.create({sectionName});

        const updatedCourse=await Course.findByIdAndUpdate(courseID,
            {
                $push:{
                    courseContent:newSection._id
                }
            },{new:true}).populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection"
                                }
            });
        res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});

    } catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
    
}


exports.updatedSection=async(req,res)=>{
    try {
        const {sectionName,sectionID,courseID}=req.body;
        const section=await Section.findByIdAndUpdate(
            sectionID,
            {sectionName},
            {new:true});

        const updatedCourse=await Course.findById(courseID)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }            
        );

        res.status(200).json({
            success:true,
            message:"Section edited successfully",
            updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.deleteSection=async(req,res)=>{
    try {
        const {sectionID,courseID}=req.body;
        const section=await Section.findByIdAndDelete(sectionID);
        const updatedCourse=await Course.findById(courseID)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        });
        res.status(200).json({
            success:true,
            message:"Section deleted",
            updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}