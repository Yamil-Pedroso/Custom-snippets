import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import dotenv from "dotenv";
import componentRoutes from "../routes/componentRoutes";
import userRoutes from "../routes/userRoutes";
import connectDB from '../config/db';

dotenv.config({
  path: path.resolve(__dirname, "..", "config", "config.env")
});

const PORT = process.env.PORT || 8080;
connectDB();

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
      name: 'session',
      maxAge: cookieTime * 24 * 60 * 60 * 1000,
      keys: [cookieSecret],
      secure: true, // Only send over HTTPS
      sameSite: 'none', // Allow cross-origin requests
      httpOnly: true, // Makes the cookie accessible only on the server-side
    }),
  )

  app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json());
app.use("/api/v1/components", componentRoutes);
app.use("/api/v1/auth", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);
