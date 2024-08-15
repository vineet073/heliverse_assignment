const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Classroom = require('../models/Classroom');
require('dotenv').config();


exports.signUP=async(req,res)=>{
    try {
        const{userName,
        email,
        password,
        confirmPassword,
        accountType,
        classroom}=req.body;
        
        if(!userName||!email||!password||!confirmPassword||!accountType||!classroom){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        if(confirmPassword !== password){
            return res.status(400).json({
                success:false,
                message:"Password doesn't match"
            })
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }

        var hashedPassword=await bcrypt.hash(password,10);
        let teachers = [];

        if (accountType === 'Student') {
            const classroomDetails = await Classroom.findById(classroom);
            if (classroomDetails) {
                teachers = classroomDetails.teacher;
            }
        }

        const user=await User.create({
            userName,
            email,
            password:hashedPassword,
            accountType,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${userName}}`,
            classroom:classroom,
            assignedTeacher:teachers
        })

        let updatedClassroom;
        if(accountType==="Instructor"){
             updatedClassroom=await Classroom.findByIdAndUpdate({_id:classroom},{$push:{teacher:user._id}},{new:true});
        }else{
             updatedClassroom=await Classroom.findByIdAndUpdate({_id:classroom},{$push:{students:user._id}},{new:true});
        }

        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user,
        })


    } catch (error) {
        console.error(error);
        console.log(error.message);
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:"Please fields all the details"
            })
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered"
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;

            const options={
                expires:new Date(Date.now()+3*24*60*60),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                user,
                token,
                message:"LoggedIn successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Passwords doesn't match"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        })
    }
}
