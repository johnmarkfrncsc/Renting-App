import express from "express";
import AuthController from "../controllers/AuthControllers.js";
import AuthValidation from "../middleware/validations/AuthValidation.js";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;

// admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjRiODZmM2U2ZjFiMDUzMDc0YWI5MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDI3MTgzNywiZXhwIjoxNzY0ODc2NjM3fQ.pieO1qHZh_1uDOoBh5Kt7nt3A9t_fdOwtkEOZXtoL-U
// user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjRiNDQxYTNhMjJjN2MwOGE5Y2QyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0Mjc1MTI2LCJleHAiOjE3NjQ4Nzk5MjZ9.cJvHoA7FyQA6PGjhDXav48Ejt5bck38ahok_AHDkcZA
