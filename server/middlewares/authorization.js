const jwt=require('jsonwebtoken');



exports.isAuthorized=async(req,res,next)=>{
    try {
        const token=req.body.token||req.cookies.token
        ||req.header("Authorization").replace("Bearer ","")
        if(!token){
        
        return res.status(404).json({
            success:false,
            message:"Token is missing"
        })
        }

        try {

            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Failed to verify the authenticity of the user"
            })
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }

}


exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"Your are not authorized for student portal"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"Your are not a instructor"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"Only Admins are authorized"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}