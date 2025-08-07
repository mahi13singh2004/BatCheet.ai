import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import docRoutes from "./routes/doc.route.js";
import chatRoutes from "./routes/chat.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://batcheet-ai.onrender.com",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/docs", docRoutes);
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Is Running On Port ${PORT}`);
});
