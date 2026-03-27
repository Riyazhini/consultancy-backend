import mongoose from "mongoose";

let cached = null;

const connectDB = async () => {
  if (cached) return cached;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
    cached = mongoose.connection;
    return cached;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;