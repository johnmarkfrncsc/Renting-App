import express from "express";
import getAllUsersController from "../controllers/UserControllers/getAllUsers.js";
import postUsersController from "../controllers/UserControllers/postUsers.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getAllUsersController);
router.post("/", postUsersController);

export default router;
