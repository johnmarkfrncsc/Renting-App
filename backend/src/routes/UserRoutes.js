import express from "express";
import UserControllers from "../controllers/UserControllers.js";

const router = express.Router();

router.get("/", UserControllers.getAllUsers);
router.post("/", UserControllers.postUsers);

export default router;
