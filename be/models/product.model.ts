import mongoose, { Document, Schema } from "mongoose";
export interface Product {
  _id?: string;
  sku: string;
  name: string;
  productType: string;
  tags: string[];
  weight: number;
  declaredValue: number;
  costOfGoodsValue: number;
  countryOfManufacturer: string;
  quantity: number;
  status: "Active" | "Draft";
  title?: string;
  barcode?: string;
  hsCode?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  supplier?: string;
  warehouse?: string[];
  emergencyStockLevel?: number;
  moq?: number;
  productionLeadTime?: number;
  coo?: string;
  retailPrice?: number;
  paymentTerms?: string;
  freightOptions?: string[];
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String },
    category: { type: String },

    price: { type: Number }, // duplicate of pricing.retail (optional redundancy)
    stock: { type: Number }, // duplicate of inventory.quantity (optional redundancy)
    description: { type: String },
    status: { type: String, enum: ["active", "draft"], default: "draft" },

    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      weight: { type: Number }, // included inside dimensions as per frontend
    },

    shipping: {
      carton: {
        weight: { type: Number },
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
      },
      countryOrigin: { type: String },
      hsCode: { type: String },
      customsDescription: { type: String },
      freight: { type: [String] }, // e.g., ["AIR", "SEA"]
    },

    inventory: {
      warehouses: { type: [String] },
      emergencyStockLevel: { type: Number },
      moq: { type: Number },
      leadTime: { type: Number },
    },

    pricing: {
      cogs: { type: Number },
      retail: { type: Number },
    },

    supplier: { type: String },
    paymentTerms: { type: String },

    customFields: [
      {
        name: { type: String },
        value: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
