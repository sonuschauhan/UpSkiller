 import mongoose,{Schema} from "mongoose";
import { Course } from "./course.model.js";
 

 const userSchema= new Schema({
    username :{
        type:String,
        unique:true,
        required:true
    },
    email :{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
    token:String,
    profileImage:{
        type:String,
    },
    bio:String,
    experience:Number,
    createdAt:Date,
    role: { type: String, enum: ['student', 'instructor'], default: 'student' },
    specialization: {
    type: String, 
  },
    purchasedCourses: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }
],
 });

 const User=mongoose.model("User",userSchema);

 export  {User};