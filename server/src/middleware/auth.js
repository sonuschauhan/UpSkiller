import httpStatus from "http-status"
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Token missing" });

    const user = await User.findOne({token:token});

    if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token" });

    req.user = user; // Attach full user to request
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error in auth", error: err.message });
  }
};