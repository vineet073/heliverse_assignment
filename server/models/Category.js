const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    title:{
        type:String,
    },    
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }],
    description:{
        type:String
    }
});

module.exports=mongoose.model("Category",categorySchema);