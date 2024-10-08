import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log("db error", err.message);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("server running on port 3000"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
