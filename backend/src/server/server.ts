import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";

import componentRoutes from "../routes/componentRoutes";
import userRoutes from "../routes/userRoutes";
import connectDB from "../config/db";

/* ===================== ENV ===================== */
dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 8080;

/* ===================== DB ===================== */
connectDB();

/* ===================== CLOUDINARY ===================== */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* ===================== APP ===================== */
const app = express();

/* ===================== TRUST PROXY ===================== */
app.set("trust proxy", 1);

/* ===================== CORS (SIMPLE & SAFE) ===================== */
const allowedOrigins = [
  "https://custom-snippets-app.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins, // ✅ NO callback
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

/* ===================== PREFLIGHT ===================== */
app.options("*", cors());

/* ===================== BODY ===================== */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* ===================== COOKIES ===================== */
app.use(
  cookieSession({
    name: "session",
    maxAge: Number(process.env.COOKIE_TIME || 7) * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET as string],
    secure: true, // Render is HTTPS
    sameSite: "none",
    httpOnly: true,
  }),
);

/* ===================== ROUTES ===================== */
app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/auth", userRoutes);

/* ===================== MULTER ERRORS ===================== */
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

/* ===================== START ===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
