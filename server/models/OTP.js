const mongoose=require('mongoose');
const otpTemplate = require('../templates/emailVerificationTemplate');

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    otp:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires:5*60,
    }

});

const mailSender=require('../configurations/mailSender');

async function sendVerificationMail(email,otp){
    try {
        const emailResponse = await mailSender(
            email,
          "Password for your account has been updated",
          otpTemplate(
            otp
          )
        )
        console.log("Email sent successfully:", emailResponse)
      } catch (error) {
        console.error("Error occurred while sending email:", error)
        throw error;
      }
}

otpSchema.pre("save",async function(next){
    if(this.isNew){
        await sendVerificationMail(this.email,this.otp);
    }
    next();
})

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;