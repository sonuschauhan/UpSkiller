import {Router} from "express";
import { createCourse, createReview, destroyReview, getAllCourses, getCourseById, getCourseContent, uploadCourse, uploadVideo } from "../controllers/course.controller.js";
import { authenticate } from "../middleware/auth.js";
import { isInstructor } from "../middleware/rolecheck.js";
import multer from "multer";
import { imageStorage, videoStorage } from "../utils/cloudinary.js";

const videoUpload=multer({storage:videoStorage});
const imageUpload=multer({storage:imageStorage});


const router = Router();

router.route("/").get(getAllCourses);
router.route("/:id").get(getCourseById);
router.route("/:id/content").get(authenticate,getCourseContent)
router.route("/:id/upload-video").post(authenticate,isInstructor,videoUpload.single("video"),uploadVideo);
router.route("/create").post( authenticate, isInstructor,imageUpload.single("thumbnail") ,createCourse);

router.route("/:courseId/review/create").post(authenticate,createReview);
router.route("/:courseId/review/:reviewId/delete").delete(authenticate,destroyReview);

export default router;