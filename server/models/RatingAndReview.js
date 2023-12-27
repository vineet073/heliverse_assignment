const mongoose=require('mongoose');

const RatingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,//why we need indexing??
	},

});

module.exports=mongoose.model("RatingAndReview",RatingAndReviewSchema);