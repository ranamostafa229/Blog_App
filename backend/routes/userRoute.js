import express from "express";
import { updateUser } from "../controllers/userController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.patch("/update/:userId", verfiyToken, updateUser);

export default router;
