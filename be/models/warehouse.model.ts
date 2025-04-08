import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: String },
    capacity: { type: Number }, // in cubic meters
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);
