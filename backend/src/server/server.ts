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

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 8080;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://custom-snippets-app.netlify.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/auth", userRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
