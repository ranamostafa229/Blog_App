import express from "express";
import {
  addPost,
  getCategories,
  getCategoryPosts,
  getPost,
  getPosts,
} from "../controllers/postController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post("/add", verfiyToken, addPost);
router.get("/categories", getCategories);
router.get("/categories/:category", getCategoryPosts);
router.get("/all-posts", getPosts);
router.get("/:slug", getPost);

export default router;
