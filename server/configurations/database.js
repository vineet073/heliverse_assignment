const mongoose=require("mongoose");

require('dotenv').config();
exports.dbConnect=async (req,res)=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{})
    .catch((error)=>{
        throw new Error(error.message);
    })
}