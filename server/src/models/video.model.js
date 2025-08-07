 import mongoose,{Schema} from "mongoose";

 const videoSchema= new Schema(
    {
  title: String,
  url: String, // Cloudinary or similar
  duration: Number, // in seconds or minutes
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  order: Number,
  isPreview: Boolean,
  public_id:String,
}

 );

 const Video=mongoose.model("Video",videoSchema);

 export {Video};