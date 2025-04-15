import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
import { Supplier } from "../models/supplier.model";

// Create a new supplier
export const createSupplier = async (
  req: Request,
  res: Response
): Promise<void> => {
  const supplierDetails = req.body;

  // Basic check for presence
  if (!supplierDetails || !supplierDetails.name) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(
        new ApiError(
          HttpStatusCode.BAD_REQUEST,
          "Supplier name is required"
        )
      );
    return;
  }

  // Optional: basic email format check
  if (
    supplierDetails.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplierDetails.email)
  ) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(
        new ApiError(
          HttpStatusCode.BAD_REQUEST,
          "Invalid email format"
        )
      );
    return;
  }

  try {
    // Check for duplicate supplier (by name)
    const existingSupplier = await Supplier.findOne({
      name: supplierDetails.name,
    });

    if (existingSupplier) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          new ApiError(
            HttpStatusCode.UNAUTHORIZED,
            "Supplier with the same name already exists"
          )
        );
      return;
    }

    // Create new supplier
    const newSupplier = await Supplier.create({
      name: supplierDetails.name,
      contactPerson: supplierDetails.contactPerson,
      email: supplierDetails.email,
      phone: supplierDetails.phone,
      address: supplierDetails.address,
      country: supplierDetails.country,
      paymentTerms: supplierDetails.paymentTerms,
      leadTime: supplierDetails.leadTime,
    });

    res
      .status(HttpStatusCode.CREATED)
      .json(
        new ApiResponse(
          HttpStatusCode.CREATED,
          newSupplier,
          "Supplier created successfully"
        )
      );
  } catch (error) {
    res
      .status(HttpStatusCode.SERVER_ERROR)
      .json(
        new ApiError(
          HttpStatusCode.SERVER_ERROR,
          (error as Error).message
        )
      );
  }
};
