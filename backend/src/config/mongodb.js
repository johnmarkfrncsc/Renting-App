import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected to MONGODB");
  } catch (error) {
    console.log("Error connecting to the MONGODB", error);
  }
};

export default connectDB;
