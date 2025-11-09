import express from "express";
import {
  deleteApiRent,
  getApiRent,
  getApiRentById,
  postApiRent,
  putApiRent,
} from "../controllers/ApiControllers.js";

const router = express.Router();

router.get("/", getApiRent);
router.get("/:id", getApiRentById);
router.post("/", postApiRent);
router.put("/:id", putApiRent);
router.delete("/:id", deleteApiRent);

export default router;
