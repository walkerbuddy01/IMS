import express from "express";
import { createSupplier } from "../controllers/supplier.controller";

const router = express.Router();

// Create new supplier
router.post("/", createSupplier);

export default router;
