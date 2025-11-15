import express from "express";
import ApiController from "../controllers/ApiControllers.js";

const router = express.Router();

router.get("/", ApiController.getApiRent);
router.get("/:id", ApiController.getApiRentById);
router.post("/", ApiController.postApiRent);
router.put("/:id", ApiController.putApiRent);
router.delete("/:id", ApiController.deleteApiRent);

export default router;
