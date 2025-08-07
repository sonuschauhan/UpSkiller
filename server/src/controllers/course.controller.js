import { Course } from "../models/course.model.js"
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import httpStatus from "http-status"

const getAllCourses = async (req, res) => {
  try {
    let courses = await Course.find({}).populate("instructor", "username profileImage").populate("review");
    let instructors = await User.find({ role: "instructor" });
    res.status(200).json({ courses, instructors });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

}

const getCourseById = async (req, res) => {
  try {
    let courseId = req.params.id;
    const isEnrolled=false;
    console.log(courseId);
    let course = await Course.findById(courseId).populate("videos").populate("instructor").populate("review");
    
    if (!course) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "course not found" });
    }
    return res.status(httpStatus.OK).json({course});
  } catch (e) {
    res.status(500).json({ message: e.message });

  }


}

export const createCourse = async (req, res) => {
  let {
    title, description, price, tags, level, category, thumbnail
  } = req.body;
  tags = JSON.parse(tags);

  try {
    const course = await Course.create({
      title,
      description,
      price,
      tags,
      level,
      category,
      thumbnail:req.file.path,
      instructor: req.user._id,
    });

    return res.status(httpStatus.CREATED).json({ message: "new course created", course });
  } catch (e) {
    res.status(500).json({ message: e.message });

  }
}

export const uploadVideo=async (req,res)=>{
  const courseId=req.params.id;
  const {title}=req.body;
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  try{

    let course=await Course.findById(courseId);
    // console.log(course)
      const video=await Video.create({
        title:title,
        url:req.file.path,
        order:course.videos.length+1,
        course:course._id,
        public_id: req.file.filename,
      });
      console.log(req.file.filename);
    course.videos.push(video._id);
    await course.save();
    course=await Course.findById(courseId).populate("videos");
    console.log(course);
    res.json({message:"i'm working",course});
  }catch(e){
    res.status(500).json({ message: e.message });
  }
}

export const uploadCourse = async (req, res) => {
  const {
    title, description, price, tags, level, category, thumbnail, videos,
  } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      price,
      tags,
      level,
      category,
      thumbnail,
      instructor: req.user._id,
    });

   

    // const videoDocs = await Promise.all(
    //   videos.map((v, index) =>
    //     Video.create({
    //       ...v,
    //       course: course._id,
    //       order: index + 1,
    //     })
    //   )
    // );
    // console.log(videos);
    const videoDocs = [];
    for (let i = 0; i < videos.length; i++) {
      let video = await Video.create({
        ...videos[i],
        course: course._id,
        order: i + 1
      });
      videoDocs.push(video);
    }
    console.log(videoDocs);
    course.videos = videoDocs.map((v) => v._id);
    await course.save();
    // console.log(course);

    res.json({ message: "Course uploaded", course });
  } catch (e) {
    res.status(500).json({ message: e.message });


  }


};

const getCourseContent = async (req, res) => {
  const courseId = req.params.id;
  console.log(courseId);

  try {
    const course = await Course.findById(courseId).populate("videos");
    if (!course) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Course not exists" });
    }
    res.status(200).json(course.videos);
  } catch (e) {
    res.status(500).json({ message: e.message });

  }

}

const createReview=async (req,res)=>{
  const courseId=req.params.courseId;
  const {rating,comment}=req.body;

  try{
    const course=await Course.findById(courseId).populate("review");

    
    
   const totalRating=(course.review.reduce((sum,val)=>sum+Number(val.rating),0)+Number(rating))/(course.review.length+1);
   console.log(totalRating);
   const averageRating=(Math.round(totalRating*10)/10).toString();
   console.log(averageRating);
   
    const newReview=await Review.create({
      rating:rating,
      comment:comment,
      user:req.user._id,
      course:course._id,
      username:req.user.username,
    });
    course.review.push(newReview._id);
    course.averageRating=averageRating;

    await course.save();
    // console.log(course);
    // console.log(newReview);

    res.status(httpStatus.CREATED).json({message:"Review Created"});
  }catch(e){
    res.status(500).json({ message: e.message });
  }
}

const destroyReview=async (req,res)=>{
  const {courseId,reviewId}=req.params;
  try{
    const course=await Course.findById(courseId);
    const newReview=course.review.filter((id)=>id!=reviewId);
    course.review=newReview
    await course.save();
    const review=await Review.findByIdAndDelete(reviewId);
    res.status(httpStatus.OK).json({message:"Review deleted"});
  }catch(e){
    res.status(500).json({ message: e.message });
  }
}
export { getAllCourses, getCourseById, getCourseContent,createReview,destroyReview}
