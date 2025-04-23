
import mongoose, { Document, Schema, Types } from "mongoose";


export interface IProduct extends Document {
  title: string;
  sku: string;
  barcode: string;
  ProductImageUrl: string;
  supplierId: Types.ObjectId;

  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };

  status: "active" | "draft";

  shipping: {
    carton: {
      weight: number;
      length: number;
      width: number;
      height: number;
    };
    countryOrigin: string;
    hsCode: string;
    customsDescription: string;
  };

  inventory: {
    warehouseId: Types.ObjectId;
    quantity: number;
    emergencyStockLevel: number;
    moq: number;
    productleadTime: number;
  };

  pricing: {
    originalPrice: number;
    cogs: number;
    retail: number;
  };

  paymentTerms: string;
  freight: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}



const productSchema = new Schema<IProduct>(
  {
    // Product Details Tab ---------------------------------------------------------------
    title: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, required: true , unique: true},
    ProductImageUrl: { type: String, required: true }, //ImageKit Url,
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    // userId:{
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },   //TODO : Adding after authentication done
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
      customsDescription: { type: String },

    },

    // Inventory Tab ---------------------------------------------------------------
    inventory: {
      warehouseId: {
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