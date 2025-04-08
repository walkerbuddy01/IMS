import type { Request, Response } from "express";
import { Product } from "../models/product.model";
import ApiError from "../lib/ApiError";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product = req.body;
  
  
  if (!product) {
    res.status(400).json(new ApiError(400, "Product not created"));
  }
  
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
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
