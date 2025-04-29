import mongoose, { mongo } from "mongoose";

// product id - to store the whole product easily
// warehouse id - to store the whole warehouse to track the area and stock easily
// country - in which country sale
// state - in which state
// quantity - how quantity for the particular date
// date - particular date to store the sale
// price - pricing on which it was sold
// sale - its can be the array to store the sales of the particular day

const salesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
  },

  date: Date,

  sales: [
    {
      quantity: {
        type: Number,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      finalPrice: {
        type: Number,
        require: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      channel: { type: String, enum: ["online", "retail", "wholesale"] },
      location: {
        country: String,
        state: String,
      },
    },
  ],
});

export const Sale = mongoose.model("Sale", salesSchema);
