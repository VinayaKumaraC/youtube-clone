// main entry point

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./utils/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channels", channelRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});