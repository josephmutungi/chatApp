import { connectDB } from "./db/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import socketHandler from "./utils/socketHandler.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dotenv.config();
const app = express();
const server = createServer(app);

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_BASE_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.NEXT_BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.get("/", (req, res) => {
  res.send("ChatApp is running");
});

//initialize socket routes
socketHandler(io);

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/users", usersRoutes);

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
