import { connectDB } from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.NEXT_BASE_URL,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("ChatApp is running");
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
