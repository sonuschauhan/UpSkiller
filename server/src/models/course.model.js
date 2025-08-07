 import mongoose,{Schema} from "mongoose";

 const courseSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    thumbnail:String,
    instructor:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    price:Number,
    review:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    averageRating:String,
    tags:[String],
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rating:Number,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    category: {
    type: String,
    enum: [
      'Development',
      'Design',
      'Business',
      'Marketing',
      'Finance',
      'Photography',
      'Music',
      'Health & Fitness',
      'Lifestyle',
      'Teaching & Academics'
    ],
    required: true
  },
 });

 const Course=mongoose.model("Course",courseSchema);

 export {Course};