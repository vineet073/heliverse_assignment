const {instance}=require('../configurations/razorpay');
const Course=require('../models/Course');
const User=require('../models/User');
const mailSender=require('../configurations/mailSender');
const mongoose=require('mongoose');
const crypto = require("crypto");
const { paymentSuccessEmail } = require('../templates/paymentSuccessEmail');
const { courseEnrollmentEmail }=require('../templates/courseEnrollmentEmail')
const CourseProgress=require('../models/CourseProgress');


exports.capturePayment=async(req,res)=>{
    const {courses}=req.body;
    const userID=req.user.id;

    if(courses.length === 0){
        return res.json({
            success:false,
            message:"Please provide courses"
        })
    }

    let totalAmount=0;
    for(const course_id of courses){
        let course;
        try {
            course=await Course.findById({_id:course_id});
            if(!course){
                return res.status(404).json({
                    success:false,
                    message:"Could not find the Course"
                })
            }

            const uid=new mongoose.Types.ObjectId(userID);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled in the course"
                })
            }

            totalAmount+=course.price;
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const currency="INR";
    const options={
        amount:totalAmount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse=await instance.orders.create(options);
        res.status(200).json({
            success:true,
            message:paymentResponse
        })
    } catch (error) {
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }


}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses=req.body.courses;
    const userID=req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userID) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body=razorpay_order_id+ '|' +razorpay_payment_id;
    const expectedSignature=crypto
        .createHmac("sha256",process.env.RAZORPAY_SCERET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses, userID, res);

        return res.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }

    return res.status(200).json({
        success:"False",
        message:"Payment Failed"
    })
}

const enrollStudents=async(courses, userID, res)=>{
    if(!courses || !userID){
        return res.status(404).json({
            success:false,
            message:"Please provide all courses and userID"
        })
    }

    for(const course_id of courses){
        try {
            const enrolledCourse=await Course.findByIdAndUpdate(
                {_id:course_id},
                {$push:{studentsEnrolled:userID}},
                {new:true}
            )

            if(!enrolledCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            const courseProgress=await CourseProgress.create({
                courseID:course_id,
                userID:userID,
                completedVideos:[]
            });

            const enrolledStudent = await User.findByIdAndUpdate(userID,
                {$push:{
                    courses: course_id,
                    courseProgress:courseProgress._id
                }},{new:true})
            
            const emailResponse=await mailSender( enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`));
            
        } catch (error) {
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessfulMail=async(req,res)=>{
    const{orderID,paymentID,amount}=req.body;
    const userID=req.user.id;

    if(!orderID || !paymentID || !amount ||!userID){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }

    try {
        const enrolledStudent=await User.findById(userID);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100,orderID, paymentID)
        )
    } catch(error) {
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
