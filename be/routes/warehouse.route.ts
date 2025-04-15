import express from "express";
import { createWarehouse } from "../controllers/warehouse.controller";

const router = express.Router();

// Create new supplier
router.post("/", createWarehouse);

export default router;
