const Profile=require('../models/Profile');
const User=require('../models/User');
const Course=require('../models/Course');
const {cloudinaryUploader}=require('../configurations/cloudinaryUploader');
const { default: mongoose } = require('mongoose');
const { convertSecondsToDuration }=require('../configurations/convertSecondsToDuration');
const CourseProgress=require('../models/CourseProgress');
const mailSender = require('../configurations/mailSender');
const accountApprovalTemplate = require('../templates/accountApprovalRes');


exports.updateProfile=async(req,res)=>{
    try {
        const{dateOfBirth="",about="",contactNumber="",gender=""}=req.body;
        const id=req.user.id;

        const userDetails=await User.findById(id);
        const updatedUser=await Profile.findById(userDetails.additionalDetails);

        updatedUser.gender=gender;
        updatedUser.dateOfBirth=dateOfBirth;
        updatedUser.about=about;
        updatedUser.contactNumber=contactNumber;
        await updatedUser.save();

        const updatedUserDetails=await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails
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
        const id=req.user.id;
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Couldn't delete account, please try again later"
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
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

exports.getAllUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetails=await User.findById(id)
        .populate("additionalDetails").exec();

        res.status(200).json({
            success:true,
            message:"User Data fetched successfully",
            data:userDetails,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try {
        const{displayPicture}=req.files;
        const id=req.user.id;
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find the user"
            })
        }

        const imageUpload=await cloudinaryUploader(displayPicture,process.env.FOLDER_NAME);
        const updatedProfile=await User.findByIdAndUpdate(
            {_id:id},{image:imageUpload.secure_url},{new:true}
        ).populate("additionalDetails").exec();
        return res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Profile image can't be updated"            
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userID = req.user.id;
      let userDetails = await User.findById({
        _id: userID,
      }).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        });

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }

      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
  
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds);
            
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }

        let courseProgress = await CourseProgress.findOne(
          { courseID: userDetails.courses[i]._id,
            userID: userID,}
        );
          
        let courseProgressCount = courseProgress?.completedVideos?.length;
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
      
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard=async(req,res)=>{
  try {
    const userID=req?.user?.id;
    
    const courseDetails=await Course.find({instructor:userID});
    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled=course.studentsEnrolled.length;
      const totalAmountGenerated=totalStudentsEnrolled * course.price;

      const courseDataWithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseDataWithStats;
    });

    return res.status(200).json({
      courses:courseData
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getAllApprovedInstructorDetails=async(req,res)=>{
  try {
      const userDetails=await User.find({accountType:"Instructor", isVerified:true})
      .populate({
        path:"courses",
        populate:{
          path:"category",
        }
      }).exec();

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
    const userDetails=await User.find({accountType:"Instructor", isVerified:false})

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

exports.approveInstructors=async(req,res)=>{
  try {
    const {checkedInstructors}=req.body;
    const response=await User.updateMany({_id:{$in:checkedInstructors}},{isVerified:true},{new:true});
    
    if(!response){
      return res.status(400).json({
        success:false,
        message:"Could not approve the instructors"
      })
    }

    const approvedInstructors = await User.find({_id: {$in: checkedInstructors}});

    for (let instructor of approvedInstructors) {
      const email = instructor.email;

      const mailResponse = await mailSender(email,
        "Account Approved Successfully",
        accountApprovalTemplate({
          firstName: instructor.firstName,
          lastName: instructor.lastName,
          email: instructor.email,
        })
      );
    }  

    return res.status(200).json({
      success:true,
      message:"Instructors approved successfully"
    })

  } catch (error) {
      return res.status(500).json({
          success:false,
          message:error.message
      })
  }
}