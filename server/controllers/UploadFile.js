const { cloudinaryUploader } = require("../configurations/cloudinaryUploader");

exports.uploadFile=async(req,res)=>{
    try {
        const resume=req.files.resume
        const resumeUploaded=await cloudinaryUploader(resume,process.env.FOLDER_NAME);

        return res.status(200).json({
            success:true,
            message:"Resume Uploaded Successfully",
            data:resumeUploaded.secure_url
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Failed to upload file',
            error: error.message,
        })
    }
}
