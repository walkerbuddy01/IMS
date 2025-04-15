import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
import FreightOption from "../models/frieght.model";

// Create a new freight option
export const createFreightOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { method, cost, leadTimeDays } = req.body;

  // Basic validation
  if (!method || cost == null || leadTimeDays == null) {
    res.status(HttpStatusCode.BAD_REQUEST).json(
      new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "All fields (method, cost, leadTimeDays) are required"
      )
    );
    return;
  }

  // Validate method value
  const validMethods = ['SEA', 'AIR', 'LCL', 'Truck'];
  if (!validMethods.includes(method)) {
    res.status(HttpStatusCode.BAD_REQUEST).json(
      new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Invalid method. Must be one of: ${validMethods.join(", ")}`
      )
    );
    return;
  }

  try {
    const newFreightOption = await FreightOption.create({
      method,
      cost,
      leadTimeDays,
    });

    res.status(HttpStatusCode.CREATED).json(
      new ApiResponse(
        HttpStatusCode.CREATED,
        newFreightOption,
        "Freight option created successfully"
      )
    );
  } catch (error) {
    res.status(HttpStatusCode.SERVER_ERROR).json(
      new ApiError(
        HttpStatusCode.SERVER_ERROR,
        (error as Error).message
      )
    );
  }
};
