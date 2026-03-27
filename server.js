import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./db.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Fix __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger (optional but useful)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Lumo Industries Backend Running");
});

app.get("/test", (req, res) => {
  res.send("Backend API working");
});

app.get("/api/test-direct", (req, res) => {
  res.json({ message: "Direct API route is reachable!" });
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`--- 404 Not Found: ${req.method} ${req.url} ---`);
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
});

// ✅ IMPORTANT: Render needs this
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional (for Vercel/serverless)
export default app;