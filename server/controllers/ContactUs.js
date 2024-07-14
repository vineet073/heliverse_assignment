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
        return res.json({
            success:true,
            message:"Email send successfully"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in sending message"
        })
    }
}