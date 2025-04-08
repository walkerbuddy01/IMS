import express from "express";
import { Supplier } from "../models/supplier.model";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.json(suppliers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create new supplier
router.post("/", async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    const savedSupplier = await supplier.save();
    res.status(201).json(savedSupplier);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
