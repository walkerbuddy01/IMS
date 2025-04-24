import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
import { Supplier } from "../models/supplier.model";
import { asyncHandler } from "../lib/AsyncHandler";

// Create a new supplier
export const createSupplier = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const supplierDetails = req.body;

    const line1 = supplierDetails.line1;
    const line2 = supplierDetails.line2;
    const Suburb = supplierDetails.Suburb;
    const state = supplierDetails.state;

    if (!line1 && !line2 && !Suburb && !state) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          new ApiError(
            HttpStatusCode.NOT_FOUND,
            "line1, line2, subrub, state all this are required for complete address"
          )
        );
      return;
    }

    const address = [line1, line2, Suburb, state].join(", ");

    // Basic check for presence
    if (!supplierDetails || !supplierDetails.supplierName) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Supplier name is required")
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
        .json(new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid email format"));
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
        name: supplierDetails.supplierName,
        contactPerson: supplierDetails.contactPerson,
        email: supplierDetails.email,
        phone: supplierDetails.phone,
        address,
        country: supplierDetails.country,
        paymentTerms: supplierDetails.paymentTerms,
        leadTime: supplierDetails.leadTime,
        percentage: supplierDetails.percentage,
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
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Update an existing supplier
export const updateSupplier = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const supplierId = req.params.id;
    const updates = req.body;

    if (!supplierId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Supplier ID is required")
        );
      return;
    }

    if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid email format"));
      return;
    }

    try {
      const updatedSupplier = await Supplier.findByIdAndUpdate(
        supplierId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!updatedSupplier) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new ApiError(HttpStatusCode.NOT_FOUND, "Supplier not found"));
        return;
      }

      res
        .status(HttpStatusCode.UPDATED)
        .json(
          new ApiResponse(
            HttpStatusCode.UPDATED,
            updatedSupplier,
            "Supplier updated successfully"
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

// Delete a supplier
export const deleteSupplier = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const supplierId = req.params.id;

    if (!supplierId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Supplier ID is required")
        );
      return;
    }

    try {
      const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);

      if (!deletedSupplier) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new ApiError(HttpStatusCode.NOT_FOUND, "Supplier not found"));
        return;
      }

      res
        .status(HttpStatusCode.DELETED)
        .json(
          new ApiResponse(
            HttpStatusCode.DELETED,
            deletedSupplier,
            "Supplier deleted successfully"
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

// Get all suppliers
export const getAllSuppliers = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const suppliers = await Supplier.find();

      res
        .status(HttpStatusCode.OK)
        .json(
          new ApiResponse(
            HttpStatusCode.OK,
            suppliers,
            "Suppliers fetched successfully"
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

// Get a single supplier by ID
export const getSupplierById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const supplierId = req.params.id;

    if (!supplierId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Supplier ID is required")
        );
      return;
    }

    try {
      const supplier = await Supplier.findById(supplierId);

      if (!supplier) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(new ApiError(HttpStatusCode.NOT_FOUND, "Supplier not found"));
        return;
      }

      res
        .status(HttpStatusCode.OK)
        .json(
          new ApiResponse(
            HttpStatusCode.OK,
            supplier,
            "Supplier fetched successfully"
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
