import express from "express";
import AuthControllers from "../controllers/AuthControllers.js";

const router = express.Router();

router.get("/", AuthControllers.getAllUsers);
router.post("/", AuthControllers.postUsers);

export default router;
