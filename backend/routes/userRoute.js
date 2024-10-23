import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  signout,
  updateUser,
} from "../controllers/userController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.patch("/update/:userId", verfiyToken, updateUser);
router.delete("/delete/:userId", verfiyToken, deleteUser);
router.get("/all-users", verfiyToken, getAllUsers);
router.get("/:userId", getUser);
router.post("/signout", signout);

export default router;
