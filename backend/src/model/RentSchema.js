import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    rentTitle: { type: String },
    rentDescription: { type: String },
    rentPrice: { type: Number },
  },
  { timestamps: true }
);

const Rent = new mongoose.model("Rent", rentSchema);

export default Rent;
