import { Router } from "express";
import {
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
} from "../controllers/warehouse.controller";
 
const router = Router();
 
// POST - Create new warehouse
router.post("/", createWarehouse);
 
// GET - Get all warehouses
router.get("/", getAllWarehouses);
 
// GET - Get warehouse by ID
router.get("/:id", getWarehouseById);
 
// PUT - Update warehouse by ID
router.put("/:id", updateWarehouse);
 
// DELETE - Delete warehouse by ID
router.delete("/:id", deleteWarehouse);
 
export default router;
 
 