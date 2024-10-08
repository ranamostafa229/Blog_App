import express from "express";
import mongoose from "mongoose";

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

app.listen(3000, () => console.log("server running on port 3000"));
