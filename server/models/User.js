const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    token: {
        type: String,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    resetPasswordExpires: {
        type: Date,
    },
    accountType:{
        type:String,
        enum:["Admin","Instructor","Student"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    image:{
        type:String,
        required:true,
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    resume:{
        type:String,
    },    
    isVerified:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);