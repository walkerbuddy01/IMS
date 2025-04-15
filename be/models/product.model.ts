
import mongoose, { Schema } from "mongoose";
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
    // Product Details Tab ---------------------------------------------------------------
    title: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, required: true , unique: true},
    ProductImageUrl: { type: String, required: true }, //ImageKit Url,
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },

    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      weight: { type: Number, required: true }, // included inside dimensions as per frontend
    },
    status: { type: String, enum: ["active", "draft"], default: "draft",  },

    // Shipping Tab ---------------------------------------------------------------
    shipping: {
      carton: {
        weight: { type: Number, required: true },
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
       
      },
      countryOrigin: { type: String, required: true },
      hsCode: { type: String, required: true },
      customsDescription: { type: String, required: true },

    },

    // Inventory Tab ---------------------------------------------------------------
    inventory: {
      warehouse: {
        type: Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
      },
      quantity: { 
        type: Number,
        default: 0,
       },
      emergencyStockLevel: { type: Number, required: true },
      moq: { type: Number, required: true },
      productleadTime: { type: Number, required: true },
     
    },

    pricing: {
      originalPrice: { type: Number, required: true },
      cogs: { type: Number, required: true },
      retail: { type: Number, required: true },
    },
    paymentTerms: { type: String, required: true },
    freight: {
      type: Schema.Types.ObjectId,
      ref: "FreightOption",
      required: true, // e.g., ["AIR", "SEA"]
    },

    }, 
  
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);