import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
import { Warehouse } from "../models/warehouse.model";
import { asyncHandler } from "../lib/AsyncHandler";

// Create a new warehouse
export const createWarehouse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const warehouseDetails = req.body;

    if (!warehouseDetails) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          new ApiError(
            HttpStatusCode.NOT_FOUND,
            "Give all the required details to create warehouse"
          )
        );
    }

    try {
      const newWarehouse = await Warehouse.create({
        name: warehouseDetails.name,
        code: warehouseDetails.code,
        address: warehouseDetails.address,
        country: warehouseDetails.country,
        contactPerson: warehouseDetails.contactPerson,
        email: warehouseDetails.email,
        phone: warehouseDetails.phone,
        capacity: warehouseDetails.capacity,
        status: warehouseDetails.status,
      });
      res
        .status(HttpStatusCode.CREATED)
        .json(
          new ApiResponse(
            HttpStatusCode.CREATED,
            newWarehouse,
            "Warehouse created successfully"
          )
        );
    } catch (error) {
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Update an existing warehouse
export const updateWarehouse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const warehouseId = req.params.id;
    const updates = req.body;

    if (!warehouseId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Warehouse ID is required")
        );
      return;
    }

    try {
      const updatedWarehouse = await Warehouse.findByIdAndUpdate(
        warehouseId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!updatedWarehouse) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new ApiError(HttpStatusCode.NOT_FOUND, "Warehouse not found"));
        return;
      }

      res
        .status(HttpStatusCode.UPDATED)
        .json(
          new ApiResponse(
            HttpStatusCode.UPDATED,
            updatedWarehouse,
            "Warehouse updated successfully"
          )
        );
    } catch (error) {
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Delete an existing warehouse
export const deleteWarehouse = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const warehouseId = req.params.id;

    if (!warehouseId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Warehouse ID is required")
        );
      return;
    }

    try {
      const deletedWarehouse = await Warehouse.findByIdAndDelete(warehouseId);

      if (!deletedWarehouse) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(
            new ApiError(HttpStatusCode.NOT_FOUND, "Warehouse not found")
          );
        return;
      }

      res
        .status(HttpStatusCode.DELETED)
        .json(
          new ApiResponse(
            HttpStatusCode.DELETED,
            deletedWarehouse,
            "Warehouse deleted successfully"
          )
        );
    } catch (error) {
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Get all warehouses
export const getAllWarehouses = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const warehouses = await Warehouse.find();

      res
        .status(HttpStatusCode.OK)
        .json(
          new ApiResponse(
            HttpStatusCode.OK,
            warehouses,
            "Warehouses fetched successfully"
          )
        );
    } catch (error) {
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Get Warehouse by ID
export const getWarehouseById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const warehouseId = req.params.id;

    if (!warehouseId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Warehouse ID is required")
        );
      return;
    }

    try {
      const warehouse = await Warehouse.findById(warehouseId);

      if (!warehouse) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(
            new ApiError(HttpStatusCode.NOT_FOUND, "Warehouse not found")
          );
        return;
      }

      res
        .status(HttpStatusCode.OK)
        .json(
          new ApiResponse(
            HttpStatusCode.OK,
            warehouse,
            "Warehouse fetched successfully"
          )
        );
    } catch (error) {
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);



