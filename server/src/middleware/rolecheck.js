import httpStatus from "http-status";
export const isInstructor=(req,res,next)=>{

    if(req.user.role!=="instructor"){
        return res.status(httpStatus.FORBIDDEN).json({message:"Access Denied! Not An Instructor"});
    }
    next();
}