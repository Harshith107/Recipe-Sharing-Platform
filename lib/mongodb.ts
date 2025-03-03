import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  console.log("🚨 Connecting to MongoDB...");

  if (isConnected) {
    console.log("🔥 MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "recipesDB",
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("💀 MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
