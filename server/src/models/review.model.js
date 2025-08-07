 import mongoose,{Schema} from "mongoose";

 const reviewSchema = new Schema({
  rating: { type: Number,min:1,max:5, required: true },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  username:{type:String}
}, {
  timestamps: true
});


 const Review=mongoose.model("Review",reviewSchema);

 export {Review};

