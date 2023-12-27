const SubSection=require('../models/SubSection');
const Section=require('../models/Section');
const {cloudinaryUploader}=require('../configurations/cloudinaryUploader');


exports.createSubSection=async(req,res)=>{
    try {
        const{sectionID,title,description}=req.body;
        const {video}=req.files;
    
        if(!sectionID||!title||!description){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }

        const videoUpload=await cloudinaryUploader(video,process.env.FOLDER_NAME);
        const subSectionDetails=await SubSection.create({
            title:title,
            description:description,
            video:videoUpload.secure_url,
            timeDuration:`${videoUpload.duration}`
        });

        const updateSection=await Section.findByIdAndUpdate({_id:sectionID},
            {$push:{
                subSection:subSectionDetails._id
            }},{new:true}).populate("subSection").exec();

        const updatedSection=await Section.findById(sectionID).populate("subSection").exec();
        console.log(updatedSection);

        return res.status(200).json({
            success:true,
            message:"Sub-Section created successfully",
            updatedSection
        })

    } catch (error) {
        console.error("Error creating new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
    
}


exports.updateSubSection=async(req,res)=>{
    try {
        const {title,description,subSectionID,sectionID}=req.body;
        

        const subSection=await SubSection.findById(subSectionID);
        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            console.log(title);
            subSection.title = title;
        }
      
        if (description !== undefined) {
            console.log(description);
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined){
            const video=req.files.video;
            var VideoUpload=await cloudinaryUploader(video,process.env.FOLDER_NAME);
            subSection.video = VideoUpload.secure_url;
            subSection.timeDuration=VideoUpload.duration;
        };

        await subSection.save();
        const updatedSection=await Section.findById(sectionID).populate("subSection");
        console.log(updatedSection);
        res.status(200).json({
            success:true,
            updatedSection
        });

    } catch (error) {
        console.error("Error while updating sub-section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.deleteSubSection=async(req,res)=>{
    try {
        const {subSectionID,sectionID}=req.body;
        const subSection=await SubSection.findByIdAndDelete(subSectionID);
        const updatedSection=await Section.findById(sectionID).populate("subSection");
        console.log(updatedSection)
        res.status(200).json({
            success:true,
            message:"Sub-Section deleted",
            updatedSection
        });

    } catch (error) {
        console.error("Error while deleting sub-section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}