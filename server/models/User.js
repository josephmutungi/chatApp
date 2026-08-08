import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "superAdmin"], default: "user" },
    lastMessage: { type: String, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
