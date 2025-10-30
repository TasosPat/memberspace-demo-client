import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

export default app;
