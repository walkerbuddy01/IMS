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
router.post("/freight-options", createFreightOption);
router.get("/freight-options", getAllFreightOptions);
router.get("/freight-options/:id", getFreightOptionById);
router.put("/freight-options/:id", updateFreightOption);
router.delete("/freight-options/:id", deleteFreightOption);

export default router;
