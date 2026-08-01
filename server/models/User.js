import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required,"],
      unique: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "superAdmin"], default: "user" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
