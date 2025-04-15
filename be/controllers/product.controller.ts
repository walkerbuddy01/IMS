import type { Request, Response } from "express";
import { Product } from "../models/product.model";
import ApiError from "../lib/ApiError";
import { HttpStatusCode } from "../lib/const";
import { Supplier } from "../models/supplier.model";
import { Warehouse } from "../models/warehouse.model";
import ApiResponse from "../lib/ApiResponse";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productDetails = req.body;
  const supplierId = productDetails.supplierId;
  const warehouseId = productDetails.warehouseId;

  console.log(productDetails);

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
          .status(HttpStatusCode.BAD_REQUEST)
          .json(
            new ApiError(
              HttpStatusCode.BAD_REQUEST,
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
          .status(HttpStatusCode.BAD_REQUEST)
          .json(
            new ApiError(
              HttpStatusCode.BAD_REQUEST,
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
        warehouse: warehouseId,
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
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a single product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a product by ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete a product by ID
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
