import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js"
import invoiceRoutes from "./routes/invoiceRoutes.js";

// Load env FIRST
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // your Next.js app
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/items", itemRoutes);
app.use("/api/invoices", invoiceRoutes);

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));