const Course=require('../models/Course');
const Category=require('../models/Category');
const User=require('../models/User');
const {cloudinaryUploader}=require('../configurations/cloudinaryUploader');
const Section=require('../models/Section')
const SubSection=require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const {convertSecondsToDuration}=require('../configurations/convertSecondsToDuration');


exports.createCourse=async(req,res)=>{
    try {
        const userId = req.user.id

        const{courseName,courseDescription,price,tag: _tag,whatYouWillLearn,category
        ,instructions: _instructions,status}=req.body;
        const thumbnail=req.files.thumbnailImage;

        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!category||!tag.length ||
            !thumbnail ||
            !instructions.length){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const CategoryDetails=await Category.findById(category);
        if(!CategoryDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid Category"
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
        }

        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
          })
      
        if (!instructorDetails) {
        return res.status(404).json({
            success: false,
            message: "Instructor Details Not Found",
        })
        }

        const thumbnailImage=await cloudinaryUploader(thumbnail,process.env.FOLDER_NAME);
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            thumbnail:thumbnailImage.secure_url,
            instructor:req.user.id,
            category:CategoryDetails._id,
            tag,
            instructions
        });

        await User.findByIdAndUpdate({_id:req.user.id},
            {
                $push:{
                    courses:newCourse._id
                }
            },{new:true})

        await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    course:newCourse._id
                }
            },{new:true});

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

exports.editCourse=async(req,res)=>{
    try {
        const {courseID}=req.body;
        const updates=req.body;
        const course=await Course.findById(courseID);
        
        if(!course){
            return res.status(404).json({error:"Course not found"});
        }

        if(req.files){
            const thumbnail=req.files.thumbnailImage;
            const thumbnailImage=await cloudinaryUploader(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail=thumbnailImage.secure_url;
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key==='tag'||key==='instructions'){
                    course[key]=JSON.parse(updates[key]);
                }
                else{
                    course[key]=updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse=await Course.findById(courseID)
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();

        res.status(200).json({
            success:true,
            message:"Course edited successfully",
            updatedCourse
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })  
    }
}

exports.showAllCourses = async (req, res) => {
    try {
            const allCourses = await Course.find({});

            return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourses,
            })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}

exports.getCourseDetails=async(req,res)=>{
    try {
        const {courseID}=req.body;

        const courseDetails=await Course.findOne({_id:courseID})
        .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()

        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:`Could not find the course with the ${courseID}`
            })
        }


        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            courseDetails,
            totalDuration
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.fetchFullCourseDetails=async(req,res)=>{
    try {
        const {courseID}=req.body;
        const userID = req.user.id;
        const courseDetails=await Course.findOne({_id:courseID})
        .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()

        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:`Could not find the course with the ${courseID}`
            })
        }


        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        var courseProgressCount = await CourseProgress.find({ 
            courseID: courseID,
            userID: userID
        })
        
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            courseDetails,
            totalDuration,
            completedVideos:courseProgressCount[0].completedVideos?
            courseProgressCount[0].completedVideos:[]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.getInstructorCourses = async (req, res) => {
    try {
      const instructorID = req.user.id;

      const instructorCourses = await Course.find({instructor: instructorID})
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

      instructorCourses.forEach((course) => {
        let totalDurationInSeconds = 0
        course?.courseContent.forEach((content) => {
            content?.subSection.forEach((subSection) => {
              const timeDurationInSeconds = parseInt(subSection?.timeDuration)
              totalDurationInSeconds += timeDurationInSeconds
            })
        })

        console.log("totalDurationInSeconds", totalDurationInSeconds);
        course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);
      });    
      
      console.log("instructorCourses", instructorCourses);

      res.status(200).json({
        success: true,
        instructorCourses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}

exports.deleteCourse=async (req,res)=>{
    try {
        const {courseID}=req.body;
        
        const course=await Course.findById(courseID);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }

        const studentsEnrolled=course.studentsEnrolled;
        for(const studentID of studentsEnrolled){
            await User.findByIdAndUpdate(studentID,{
                $pull:{courses:courseID}
            })
        }

        const courseSections=course.courseContent;
        for(const sectionID of courseSections){
            const section=await Section.findById(sectionID)
            if(section){
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            await Section.findByIdAndDelete(sectionID);
        }

        await Course.findByIdAndDelete(courseID)

        return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
}
