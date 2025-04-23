import express from "express";
import {
  createFreightOption,
  deleteFreightOption,
  getAllFreightOptions,
  getFreightOptionById,
  updateFreightOption,
} from "../controllers/frieght.controller";

const router = express.Router();

// Create new supplier
router.post("/", createFreightOption);
router.get("/", getAllFreightOptions);
router.get("/:id", getFreightOptionById);
router.put("/:id", updateFreightOption);
router.delete("/:id", deleteFreightOption);

export default router;
