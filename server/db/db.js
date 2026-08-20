import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection error: ", err));
};
