import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getPostComments,
  likeComment,
} from "../controllers/commentController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post("/create", verfiyToken, createComment);
router.get("/get/:postId", getPostComments);
router.get("/all-comments", verfiyToken, getAllComments);
router.delete("/delete/:commentId", verfiyToken, deleteComment);
router.put("/edit/:commentId", verfiyToken, editComment);
router.put("/like/:commentId", verfiyToken, likeComment);

export default router;
