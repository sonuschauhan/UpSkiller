import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Udemy/Videos", // Cloudinary folder name
    resource_type: "video",      // Must specify this for videos
    allowed_formats: ["mp4", "webm", "mov"],
  },
});

export const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Udemy/Images",
    resource_type: "image", // This is the default
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }], // Optional resizing
  },
});

export default cloudinary;