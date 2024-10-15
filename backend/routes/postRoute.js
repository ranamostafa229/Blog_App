import express from "express";
import { addPost, getCategories } from "../controllers/postController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post("/add", verfiyToken, addPost);
router.get("/categories", getCategories);

export default router;
