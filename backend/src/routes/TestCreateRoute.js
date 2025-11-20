import express from "express";
import { getTestUser, postTestCreate } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getTestUser);
router.post("/", postTestCreate);

export default router;
