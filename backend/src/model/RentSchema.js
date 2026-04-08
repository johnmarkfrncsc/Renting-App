import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    rentTitle: {
      type: String,
      required: true,
      trim: true,
    },
    rentDescription: {
      type: String,
      required: true,
    },
    rentImages: [
      {
        type: String,
      },
    ],

    rentCategory: {
      type: String,
      enum: ["condo", "house", "apartment", "dorm"],
      required: true,
    },
    rentType: {
      type: String,
      enum: ["studio", "1BR", "2BR", "3BR", "loft", "mezzanine"],
      required: true,
    },

    rentDetails: {
      bedrooms: { type: Number, required: true },
      bathrooms: { type: Number, required: true },
      floorArea: { type: Number },
      floorLevel: { type: Number },
      furnished: { type: Boolean, default: false },
    },

    rentAmenities: [
      {
        type: String,
        enum: ["parking", "pool", "gym", "petsAllowed", "wifi", "security"],
      },
    ],

    rentLocation: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String },
    },

    rentPrice: {
      type: Number,
      required: true,
    },
    rentStatus: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },

    rentTenant: {
      type: String,
      default: "No Tenant",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;
