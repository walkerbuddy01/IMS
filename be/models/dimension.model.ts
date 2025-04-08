import mongoose from "mongoose";

export const dimensionSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["cm"],
    default: "cm",
  },
});



export const Dimension = mongoose.model("Dimension", dimensionSchema);