import { Course } from "../models/course.model.js";


const getInstructorDashboard = async (req, res) => {
  try{
    const courses = await Course.find({ instructor: req.user._id })
    .populate("studentsEnrolled", "username")
    .populate("videos");

  res.json({
    courses,
    totalCourses: courses.length,
    courseStats: courses.map((course) => ({
      title: course.title,
      studentsCount: course.studentsEnrolled.length,
      totalVideos: course.videos.length,
      thumbnail:course.thumbnail,
      _id:course.id,
      averageRating:course.averageRating,
      review:course.review
    })),
  });
  }catch(e){
        res.status(500).json({ message: e.message });
  }
  
};

export {getInstructorDashboard};