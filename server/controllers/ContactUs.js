const mailSender=require('../configurations/mailSender');
const { contactUsEmail } =require('../templates/contactFormRes');

exports.ContactUs=async(req,res)=>{
    const {firstname,lastname,email,countrycode,phoneno,message}=req.body;
    try {
        const EmailResponse=mailSender(email,
            "Message sent successfully",
            contactUsEmail(email,
                firstname,
                lastname,
                message,
                phoneno,
                countrycode)
            );
        console.log("Email response: ",EmailResponse);
        return res.json({
            success:true,
            message:"Email send successfully"
        })
    } catch (error) {
        console.log("error: ",error);
        console.log(error.message);
        return res.json({
            success:false,
            message:"Error in sending message"
        })
    }
}