const Category=require('../models/Category');

exports.createCategory=async(req,res)=>{
    try {
        const {title,description}=req.body;
        if(!title||!description){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        const CategoryDetails=await Category.create({
            title:title,
            description:description
        });
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        });
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Something went wrong, please try again"
        });
    }
}


exports.getAllCategorys=async(req,res)=>{
    try {
        const allCategorys=await Category.find({},{title:true,description:true,course:true}).populate({
            path: "course"
        });
        return res.status(200).json({
            success:true,
            message:"All Categorys returned successfully",
            allCategorys
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


exports.categoryPageDetails=async(req,res)=>{
    try {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }          

        const {categoryID}=req.body;

        const selectedCategory=await Category.findById(categoryID)
        .populate({
            path:"course",
            match:{status:"Published"},
            populate:"ratingAndReviews"
        }).exec();
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Courses not found"
            })
        };

        if(selectedCategory.course.length===0){
            return res.status(404).json({
                success:false,
                message:"Courses not found for selected category"
            })
        }

        
        const nonSelectedCategory=await Category.find({
            _id:{$ne:categoryID}
        });
        const index=getRandomInt(nonSelectedCategory.length);

        let differentCategory=await Category.findById(
            nonSelectedCategory[index]?._id
        ).populate({
            path:"course",
            match:{status:"Published"},
            populate:"ratingAndReviews"
        }).exec();


        const allCategories=await Category.find().populate({
            path:"course",
            match:{status:"Published"},
            populate:"ratingAndReviews",
            populate:"instructor"
        }).exec();
        const allCourses=allCategories.flatMap((category)=>category.course);
        const mostSellingCourses=allCourses
            .sort((a,b)=>b?.studentEnrolled?.length() - a?.studentEnrolled?.length())
            .slice(0,10);
        
        return res.status(200).json({
            success:true,
            data:{
            selectedCategory,
            differentCategory: differentCategory ? differentCategory : null,
            mostSellingCourses : mostSellingCourses ? mostSellingCourses : null
            }
        });

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}