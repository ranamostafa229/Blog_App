import express from "express";
import { createComment } from "../controllers/commentController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post("/create", verfiyToken, createComment);

export default router;
