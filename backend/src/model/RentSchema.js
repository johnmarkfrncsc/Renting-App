import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    rentTitle: { type: String },
    rentDescription: { type: String },
    rentAddress: { type: String },
    rentCategory: { type: String },
    rentStatus: { type: String },
    rentPrice: { type: Number },
    rentImageURL: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

const Rent = new mongoose.model("Rent", rentSchema);

export default Rent;
