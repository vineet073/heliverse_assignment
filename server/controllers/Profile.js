const User=require('../models/User');
const bcrypt=require('bcryptjs');


exports.updateProfile=async(req,res)=>{
    try {
      const{userName,email,password,confirmPassword,id}=req.body;

      if(confirmPassword !== password){
        return res.status(400).json({
            success:false,
            message:"Password doesn't match"
        })
      }

      var hashedPassword=await bcrypt.hash(password,10);

        const userDetails=await User.findByIdAndUpdate({_id:id},{
            userName,
            email,
            password:hashedPassword
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            userDetails
        });

    } catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
    }
}

exports.deleteAccount=async(req,res)=>{
    try {
        const {id}=req.body;
        console.log(id);
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Couldn't delete account, please try again later"
            })
        }

        await User.findByIdAndDelete({_id:id});
        
        return res.status(200).json({
            success:true,
            message:"Your account is successfully deleted"
        })

    } catch (error) {
		return res.status(500).json(
        { 
            success: false, 
            message: "Something went wrong while deleting the account." 
        }
        );
    }
}

exports.getStudentByClassroom=async(req,res)=>{
    const {classroom}=req.body;
    console.log("classroom",classroom)  
    try {
        const userDetails=await User.find({accountType:"Student",classroom:classroom}).populate("classroom").exec()

        res.status(200).json({
            success:true,
            message:"Students Data fetched successfully",
            data:userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try {
        const userDetails=await User.find({accountType:"Instructor"})

        res.status(200).json({
            success:true,
            message:"Instructor Data fetched successfully",
            data:userDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllApprovedInstructorDetails=async(req,res)=>{
  try {
      const userDetails=await User.find({accountType:"Instructor"}).populate("classroom").exec()

      res.status(200).json({
          success:true,
          message:"Instructors Details fetched successfully",
          data:userDetails,
      })

  } catch (error) {
      return res.status(500).json({
          success:false,
          message:error.message
      })
  }
}

exports.getAllUnApprovedInstructorDetails=async(req,res)=>{
  try {
    const userDetails=await User.find({accountType:"Student"}).populate("classroom").exec()

    res.status(200).json({
        success:true,
        message:"Students Details fetched successfully",
        data:userDetails,
    })

} catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

exports.approveInstructors=async(req,res)=>{
  try {
    const {id}=req.body;
    const instructorDetails=await User.findById(id).populate("classroom").exec();
    if(!instructorDetails){
      return res.status(404).json({
        success:false,
        message:"Instructor not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Instructors Details fetched successfully",
      instructorDetails
    })

  } catch (error) {
      return res.status(500).json({
          success:false,
          message:error.message
      })
  }
}