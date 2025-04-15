import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
import { Warehouse } from "../models/warehouse.model";

// Create a new warehouse
export const createWarehouse = async (
  req: Request,
  res: Response
): Promise<void> => {
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
};
