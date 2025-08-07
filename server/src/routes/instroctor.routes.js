import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { isInstructor } from "../middleware/rolecheck.js";
import { getInstructorDashboard } from "../controllers/instructor.controller.js";

const router=Router();

router.route("/dashboard").get(authenticate,isInstructor,getInstructorDashboard);

export default router;