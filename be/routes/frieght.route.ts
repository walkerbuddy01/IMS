import express from "express";
import { createFreightOption } from "../controllers/frieght.controller";

const router = express.Router();

// Create new supplier
router.post("/", createFreightOption);

export default router;
