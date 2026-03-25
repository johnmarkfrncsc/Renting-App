import express from "express";
import signupController from "../controllers/AuthControllers/signupController.js";
import loginController from "../controllers/AuthControllers/loginController.js";
import googleLoginController from "../controllers/AuthControllers/googleLoginController.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/google", googleLoginController);

export default router;
