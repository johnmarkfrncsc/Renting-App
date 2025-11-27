import express from "express";
import ApiController from "../controllers/ApiControllers.js";
import ValidateRent from "../middleware/validations/RentValidation.js";
import RoleValidation from "../middleware/validations/RoleValidation.js";
import AuthValidation from "../middleware/validations/AuthValidation.js";

const router = express.Router();

router.get("/", ApiController.getApiRent);
router.get("/:id", ApiController.getApiRentById);
router.post(
  "/",
  AuthValidation,
  ValidateRent,
  RoleValidation(["admin"]),
  ApiController.postApiRent
);

router.put(
  "/:id",
  AuthValidation,
  ValidateRent,
  RoleValidation(["admin"]),
  ApiController.putApiRent
);

router.delete(
  "/:id",
  AuthValidation,
  RoleValidation(["admin"]),
  ApiController.deleteApiRent
);

export default router;
