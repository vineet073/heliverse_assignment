const Course=require("../models/Course");
const RatingAndReview = require('../models/RatingAndReview');
const mongoose=require("mongoose")

exports.createRatingandReview=async(req,res)=>{
    try {
        const userID = req.user.id
        const { rating, review, courseID } = req.body
    
        const courseDetails = await Course.findById({
          _id: courseID,
          studentsEnrolled: { $elemMatch: { $eq: userID } },
        })
    
        if (!courseDetails) {
          return res.status(404).json({
            success: false,
            message: "Student is not enrolled in this course",
          })
        }
    
        const alreadyReviewed = await RatingAndReview.findOne({
          user: userID,
          course: courseID,
        })
    
        if (alreadyReviewed) {
          return res.status(403).json({
            success: false,
            message: "Course already reviewed by user",
          })
        }
    
        const ratingReview = await RatingAndReview.create({
          rating,
          review,
          course: courseID,
          user: userID,
        })
    
        // Add the rating and review to the course
        await Course.findByIdAndUpdate(courseID, {
          $push: {
            ratingAndReviews: ratingReview,
          },
        })
        await courseDetails.save()
    
        return res.status(201).json({
          success: true,
          message: "Rating and review created successfully",
          ratingReview,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
}

exports.getAverageRating=async(req,res)=>{
    const courseID=req.body.courseID;
    try {
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"rating"}
                }
            }
        ]);
        if(result.length>0){
            return res.status(200).json({
                sucess:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            data:0,
            message:"Average rating is 0, no rating given till now"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
  

}

exports.getAllRatingAndReview = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}