import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const connectMongoDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return; 
  }

  try {
    await mongoose.connect(uri!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    //throw new Error("MongoDB connection error");
  }
};

export default connectMongoDb;
