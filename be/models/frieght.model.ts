
import mongoose from "mongoose";

export const freightOptionSchema = new mongoose.Schema({
    method: {
      type: String,
      enum: ['SEA', 'AIR', 'LCL', 'Truck'],
      required: true
    },
    cost: { type: Number, min: 0 },
    leadTimeDays: { type: Number, min: 0 }
  });

  const FreightOption = mongoose.model("FreightOption", freightOptionSchema);
  export default FreightOption
   

