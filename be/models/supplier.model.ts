import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    country: { type: String },
    paymentTerms: { type: String },
    leadTime: { type: Number }, // in days
    percentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Supplier = mongoose.model("Supplier", supplierSchema);
