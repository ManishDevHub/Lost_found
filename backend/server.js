// server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

// static for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/items", itemRoutes);

// Health
app.get("/", (_req, res) => res.send("API is running"));

// Global error fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Server error" });
});


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});



import Item from "./models/itemModel.js"; 

app.post("/api/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    io.emit("newItem", item); // 🔔 notify all clients
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on :${PORT}`));
