import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/chatApp")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection error: ", err));
};
