import express from "express";
import ValidateRent from "../middleware/validations/RentValidation.js";
import RoleValidation from "../middleware/validations/RoleValidation.js";
import AuthValidation from "../middleware/validations/AuthValidation.js";

import getApiRentController from "../controllers/ApiControllers/getApiRent.js";
import getApiRentByIdController from "../controllers/ApiControllers/getApiRentById.js";
import postApiRentController from "../controllers/ApiControllers/postApiRent.js";
import putApiRentController from "../controllers/ApiControllers/putApiRent.js";
import deleteApiRentController from "../controllers/ApiControllers/deleteApiRent.js";

const router = express.Router();

router.get("/", getApiRentController);
router.get("/:id", getApiRentByIdController);
router.post(
  "/",
  AuthValidation,
  ValidateRent,
  RoleValidation(["admin"]),
  postApiRentController,
);

router.put(
  "/:id",
  AuthValidation,
  ValidateRent,
  RoleValidation(["admin"]),
  putApiRentController,
);

router.delete(
  "/:id",
  AuthValidation,
  RoleValidation(["admin"]),
  deleteApiRentController,
);

export default router;
