import express from "express";
import { addPost } from "../controllers/postController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post("/add", verfiyToken, addPost);

export default router;
