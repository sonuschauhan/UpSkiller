import { Router } from "express";
import { becomeInstructor, getMyCourses, getUserData, login, purchaseCourse, register } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";
import multer from "multer";
import { imageStorage } from "../utils/cloudinary.js";

const router= Router();
let upload=multer({storage:imageStorage});

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/my-courses").get(authenticate,getMyCourses);
router.route("/purchase/:courseId").post(authenticate,purchaseCourse);
router.route("/become-instructor").put(authenticate,upload.single("image"),becomeInstructor);
router.route("/me").get(authenticate,getUserData);

export default router;