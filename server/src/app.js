import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import instructorRoute from "./routes/instroctor.routes.js";
const app = express();

const allowedOrigins = [
  "https://upskiller-client.onrender.com",
  "http://localhost:5173"  // keep for local testing
];

app.use(cors({
  origin: "https://upskiller-client.onrender.com", // ✅ frontend domain
   // ✅ required if you're using cookies or sessions
}));

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }));



app.use("/api/v1/users",userRoutes);
app.use("/api/v1/courses",courseRoute);
app.use("/api/v1/instructor",instructorRoute);



app.get("/",(req,res)=>{
    res.json({"msg":"it's home Page"});
})

const start = async () => {
    try {
        const connectionDb = await mongoose.connect(process.env.ATLASDB_URL);
        console.log(`Mongo Connected DB Host: ${connectionDb.connection.host}`);
    } catch (e) {
        console.log(e);
    }

    app.listen(8000, () => {
        console.log(`Listening on Port ${8000}`);
    });
}
start();