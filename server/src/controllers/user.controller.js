import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Course } from "../models/course.model.js";

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        let token = await crypto.randomBytes(20).toString("hex");
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            token:token
        });


        let user=await newUser.save();
        res.status(httpStatus.CREATED).json({ message: "User registered successfully",token,user:{
            _id:user.id, 
            username:user.username,
            email:user.email,
            role:user.role,
        } });
    }
    catch (e) {
        res.status(500).json({ message: e.message });

    }

}


const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).json({ message: "Please Provide" });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        let isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {
            let token = await crypto.randomBytes(20).toString("hex");
            user.token = token;
            let userInfo=await user.save();
            return res.status(httpStatus.OK).json({ message:"user login successfully",token,user:{
            _id:userInfo.id,    
            username:userInfo.username,
            email:userInfo.email,
            role:userInfo.role,
        } });
        }
        else {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or Password" });
        }

    } catch (e) {
        res.status(500).json({ message: e.message });

    }



}

const getMyCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("purchasedCourses");
        return res.status(httpStatus.OK).json({courses:user.purchasedCourses,instructor:user.username});
    } catch (e) {
        res.status(500).json({ message: e.message });

    }

}

const purchaseCourse = async (req, res) => {
    let courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        const user = await User.findById(req.user._id);

        if (!course || !user) {
            return res.status(404).json({ message: "Course or User not found" });
        }
        if (user.purchasedCourses.includes(course._id)) {
            return res.status(400).json({ message: "Course already purchased" });
        }
        course.studentsEnrolled.push(user._id);
        user.purchasedCourses.push(course._id);
        await course.save();
        await user.save();
        return res.status(httpStatus.OK).json({ message: "Course purchased successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

}

const becomeInstructor = async (req, res) => {
    try {
        const { bio,experience,specialization } = req.body;
        let user = await User.findById(req.user._id);
        user.bio = bio;
        user.experience=experience;
        user.specialization=specialization;
        user.profileImage = req.file.path;
        user.role = "instructor";

        await user.save();
        console.log(user);

        return res.status(httpStatus.OK).json({ message: "role is changed" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

}

const getUserData=async(req,res)=>{
    try{
        const { _id, username, email, role } = req.user;
        res.json({
            user: { _id, username, email, role }, // Send minimal user data
        });
    }catch(e){
        res.status(500).json({ message: e.message });
    }
}

export { login, register, getMyCourses, purchaseCourse, becomeInstructor,getUserData };