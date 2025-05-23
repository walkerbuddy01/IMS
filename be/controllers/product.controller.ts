import type { Request, Response } from "express";
import { Product } from "../models/product.model";
import ApiError from "../lib/ApiError";
import { HttpStatusCode } from "../lib/const";
import { Supplier } from "../models/supplier.model";
import { Warehouse } from "../models/warehouse.model";
import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/AsyncHandler";

// Create a new product
export const createProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const productDetails = req.body;
    console.log("productDetails-------------->", productDetails);
    // const userId = req.cookies;
    const supplierId = productDetails.supplierId;
    const warehouseId = productDetails.warehouseId;

    if (!productDetails) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(
            HttpStatusCode.BAD_REQUEST,
            "Please send the required fields"
          )
        );
      return;
    }

    try {
      // SKU REGEX CHECK
      if (!/^[A-Z0-9\-]+$/.test(productDetails.sku)) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid SKU format"));
        return;
      }

      const existingProduct = await Product.findOne({
        $or: [{ sku: productDetails.sku }, { barcode: productDetails.barcode }],
      });

      if (existingProduct) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(
            new ApiError(
              HttpStatusCode.BAD_REQUEST,
              "Product with this SKU or Barcode already exists"
            )
          );
        return;
      }

      if (supplierId) {
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          res
            .status(HttpStatusCode.NOT_FOUND)
            .json(
              new ApiError(
                HttpStatusCode.NOT_FOUND,
                "Supplier with this ID does not exist"
              )
            );
          return;
        }
      }

      if (warehouseId) {
        const warehouse = await Warehouse.find({ _id: { $in: warehouseId } });
        if (!warehouse) {
          res
            .status(HttpStatusCode.NOT_FOUND)
            .json(
              new ApiError(
                HttpStatusCode.NOT_FOUND,
                "Warehouse with this ID does not exist"
              )
            );
          return;
        }
      }

      const newProduct = await Product.create({
        title: productDetails.title?.trim(),
        sku: productDetails.sku?.trim(),
        barcode: productDetails.barcode?.trim(),
        pricing: {
          originalPrice: productDetails.originalPrice,
          cogs: productDetails.cogs,
          retail: productDetails.retail,
        },
        supplierId,
        inventory: {
          warehouseId,
          emergencyStockLevel: productDetails.emergencyStockLevel,
          moq: productDetails.moq,
          productleadTime: productDetails.productionLeadTime,
        },
        freight: productDetails.freightId,
        paymentTerms: productDetails.paymentTerms,
        ProductImageUrl: productDetails.ProductImageUrl.trim(),
        status: productDetails.status,
        shipping: {
          carton: {
            weight: productDetails.cartonWeight,
            length: productDetails.cartonLength,
            width: productDetails.cartonWidth,
            height: productDetails.cartonHeight,
          },
          countryOrigin: productDetails.countryOrigin,
          hsCode: productDetails.hsCode,
          customsDescription: productDetails.customsDescription,
        },
        dimensions: {
          length: productDetails.productLength,
          width: productDetails.productWidth,
          height: productDetails.productHeight,
          weight: productDetails.productWeight,
        },
      });

      if (newProduct) {
        res
          .status(HttpStatusCode.CREATED)
          .json(
            new ApiResponse(
              HttpStatusCode.CREATED,
              newProduct,
              "Product created successfully"
            )
          );
        return;
      }
    } catch (error) {
      console.error("Create product error:", error);
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Get a single product by ID
export const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    if (!productId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Product ID not provided")
        );
      return;
    }

    try {
      const product = await Product.findById(productId)
        .populate("supplierId")
        .populate("inventory.warehouseId");

      if (!product) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(
            new ApiError(
              HttpStatusCode.NOT_FOUND,
              "Product with the given ID does not exist"
            )
          );
        return;
      }

      res
        .status(HttpStatusCode.CREATED)
        .json(
          new ApiResponse(
            HttpStatusCode.CREATED,
            product,
            "Product fetched successfully"
          )
        );
    } catch (error) {
      console.error("Get product by ID error:", error);
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Update a product by ID
export const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;
    const updates = req.body;

    // TODO: Add User Validation

    if (!productId) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCode.BAD_REQUEST, "Product ID not provided")
        );
      return;
    }

    try {
      // Optional SKU format validation if it's being updated
      if (updates.sku && !/^[A-Z0-9\-]+$/.test(updates.sku)) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid SKU format"));
        return;
      }

      // Check if SKU or barcode already exists (excluding the current product)

      const orConditions = [];
      if (updates.sku) orConditions.push({ sku: updates.sku });
      if (updates.barcode) orConditions.push({ barcode: updates.barcode });

      if (orConditions.length > 0) {
        const conflictProduct = await Product.findOne({
          _id: { $ne: productId },
          $or: orConditions,
        });

        if (conflictProduct) {
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .json(
              new ApiError(
                HttpStatusCode.BAD_REQUEST,
                "Another product with this SKU or Barcode already exists"
              )
            );
          return;
        }
      }

      // Optional: validate supplierId if being updated
      if (updates.supplierId) {
        const supplier = await Supplier.findById(updates.supplierId);
        if (!supplier) {
          res
            .status(HttpStatusCode.NOT_FOUND)
            .json(
              new ApiError(
                HttpStatusCode.NOT_FOUND,
                "Supplier with this ID does not exist"
              )
            );
          return;
        }
      }

      // Optional: validate warehouseId if being updated
      if (updates.warehouseId) {
        const warehouse = await Warehouse.find({
          _id: { $in: updates.warehouseId },
        });
        if (!warehouse || warehouse.length === 0) {
          res
            .status(HttpStatusCode.NOT_FOUND)
            .json(
              new ApiError(
                HttpStatusCode.NOT_FOUND,
                "Warehouse with this ID does not exist"
              )
            );
          return;
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("supplierId")
        .populate("inventory.warehouseId")
        .populate("freight");

      if (!updatedProduct) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new ApiError(HttpStatusCode.BAD_REQUEST, "Product not found"));
        return;
      }

      res
        .status(HttpStatusCode.UPDATED)
        .json(
          new ApiResponse(
            HttpStatusCode.UPDATED,
            updatedProduct,
            "Product updated successfully"
          )
        );
    } catch (error) {
      console.error("Update product error:", error);
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// Delete a product by ID
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    if (!productId) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(new ApiError(HttpStatusCode.NOT_FOUND, "Product ID is required"));
      return;
    }

    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json(
            new ApiError(
              HttpStatusCode.NOT_FOUND,
              "Product with the given ID not found"
            )
          );
        return;
      }

      res
        .status(HttpStatusCode.DELETED)
        .json(
          new ApiResponse(
            HttpStatusCode.DELETED,
            deletedProduct,
            "Product deleted successfully"
          )
        );
    } catch (error) {
      console.error("Delete product error:", error);
      res
        .status(HttpStatusCode.SERVER_ERROR)
        .json(
          new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
        );
    }
  }
);

// TODO : After Authentication controllers

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.find()
      .populate("supplierId")
      .populate("inventory.warehouseId");

    if (!product) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          new ApiError(
            HttpStatusCode.NOT_FOUND,
            "Product with the given ID does not exist"
          )
        );
      return;
    }

    res
      .status(HttpStatusCode.CREATED)
      .json(
        new ApiResponse(
          HttpStatusCode.CREATED,
          product,
          "Products fetched successfully"
        )
      );
  } catch (error) {
        console.error("Server Error", error);
    res
      .status(HttpStatusCode.SERVER_ERROR)
      .json(
        new ApiError(HttpStatusCode.SERVER_ERROR, (error as Error).message)
      );
  }
};

// Extra Controllers like Bulk(Delete,Update)
