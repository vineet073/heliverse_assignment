const { default: mongoose } = require('mongoose');
const CourseProgress=require('../models/CourseProgress');
const SubSection=require('../models/SubSection');


exports.updateCourseProgress=async(req,res)=>{
    const{courseID,subSectionID}=req.body;
    const userID=req.user.id;

    try {
        const subSection=await SubSection.findById({_id:subSectionID});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Invalid Sub-Section"
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseID:courseID,
            userID:userID
        });

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress doesn't exist"
            })
        }else{
            if(courseProgress.completedVideos?.includes(subSectionID)){
                return res.status(400).json({ error: "Subsection already completed" })
            }else{
                courseProgress.completedVideos.push(subSectionID);
            }

        }

        await courseProgress.save();
        return res.status(200).json({ message: "Course progress updated" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal server error" })
    }
}