import express from "express";
import { updateUser } from "../controllers/userController.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.put("/update/:userId", verfiyToken, updateUser);

export default router;
