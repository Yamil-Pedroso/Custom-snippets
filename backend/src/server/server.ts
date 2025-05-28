import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import componentRoutes from "../routes/componentRoutes";
import multer from "multer";
import userRoutes from "../routes/userRoutes";
import connectDB from "../config/db";

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env"),
});

const PORT = process.env.PORT || 8080;
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle cookies
app.use(cookieParser());
const cookieTime = process.env.COOKIE_TIME as any;
const cookieSecret = process.env.COOKIE_SECRET as any;
app.use(
  cookieSession({
    name: "session",
    maxAge: cookieTime * 24 * 60 * 60 * 1000,
    keys: [cookieSecret],
    secure: true, // Only send over HTTPS
    sameSite: "none", // Allow cross-origin requests
    httpOnly: true, // Makes the cookie accessible only on the server-side
  })
);

const allowedOrigins = ["https://custom-snippets.netlify.app/"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to handle errors when uploading files
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // An unknown error occurred when uploading
    return res.status(400).json({ message: err.message });
  }
  next();
});

app.use(express.json());
app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
