import { Course } from "../src/models/course.model.js"
import { User } from "../src/models/user.model.js"
import mongoose from "mongoose";
import { Video } from "../src/models/video.model.js";

const start = async () => {
    try {
        const connectionDb = await mongoose.connect("mongodb+srv://sonusingha37fw:xlhcLMEX5CVtvhJK@cluster0.zf4sghj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`Mongo Connected DB Host: ${connectionDb.connection.host}`);
    } catch (e) {
        console.log(e);
    }
}
start();

const initData=async()=>{
       await Course.deleteMany({});
       await Video.deleteMany({});
       await User.deleteMany({});
       console.log("deleted");
}
initData();