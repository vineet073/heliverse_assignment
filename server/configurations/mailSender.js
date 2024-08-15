const nodemailer=require('nodemailer');
require('dotenv').config();

const mailSender=async (email,title,body)=>{

    try {
        const transporter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let response=await transporter.sendMail({
            from:"EduArea -- Vineet Kumar",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
    } catch (error) {
        throw new Error(error.message);
    }
   
}
module.exports = mailSender;