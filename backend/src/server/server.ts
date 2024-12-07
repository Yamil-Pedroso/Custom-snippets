// src/index.ts
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import componentRoutes from "../routes/componentRoutes";
import connectDB from '../config/db';

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env")
});

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1/components", componentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);
