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

// Get all freight options
export const getAllFreightOptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const freightOptions = await FreightOption.find();
    res.status(HttpStatusCode.OK).json(
      new ApiResponse(
        HttpStatusCode.OK,
        freightOptions,
        "Freight options fetched successfully"
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

// Get a single freight option by ID
export const getFreightOptionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const option = await FreightOption.findById(id);
    if (!option) {
      res.status(HttpStatusCode.NOT_FOUND).json(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          "Freight option not found"
        )
      );
      return;
    }

    res.status(HttpStatusCode.OK).json(
      new ApiResponse(
        HttpStatusCode.OK,
        option,
        "Freight option fetched successfully"
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

// Update a freight option
export const updateFreightOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { method, cost, leadTimeDays } = req.body;

  const validMethods = ['SEA', 'AIR', 'LCL', 'Truck'];
  if (method && !validMethods.includes(method)) {
    res.status(HttpStatusCode.BAD_REQUEST).json(
      new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Invalid method. Must be one of: ${validMethods.join(", ")}`
      )
    );
    return;
  }

  try {
    const updated = await FreightOption.findByIdAndUpdate(
      id,
      { $set: { method, cost, leadTimeDays } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(HttpStatusCode.NOT_FOUND).json(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          "Freight option not found"
        )
      );
      return;
    }

    res.status(HttpStatusCode.UPDATED).json(
      new ApiResponse(
        HttpStatusCode.UPDATED,
        updated,
        "Freight option updated successfully"
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

// Delete a freight option
export const deleteFreightOption = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deleted = await FreightOption.findByIdAndDelete(id);

    if (!deleted) {
      res.status(HttpStatusCode.NOT_FOUND).json(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          "Freight option not found"
        )
      );
      return;
    }

    res.status(HttpStatusCode.OK).json(
      new ApiResponse(
        HttpStatusCode.OK,
        deleted,
        "Freight option deleted successfully"
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



