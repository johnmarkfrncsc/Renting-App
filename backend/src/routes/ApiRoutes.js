import express from "express";
import ApiController from "../controllers/ApiControllers.js";
import ValidateRent from "../middleware/validations/RentValidation.js";

const router = express.Router();

router.get("/", ApiController.getApiRent);
router.get("/:id", ApiController.getApiRentById);
router.post("/", ValidateRent, ApiController.postApiRent);
router.put("/:id", ApiController.putApiRent);
router.delete("/:id", ApiController.deleteApiRent);

export default router;
