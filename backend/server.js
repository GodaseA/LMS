import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.js";
import BookRout from "./Routes/bookRouts.js";
import borrowRoute from "./Routes/BorrowRoute.js";
// import borrowRoute from "./Routes/borrowRoute.js";

const app = express();
const port = 5000;

// ✅ Enable CORS (with credentials)
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Connect MongoDB
await mongoose.connect("mongodb://localhost:27017/library");
console.log("MongoDB connected successfully");

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/books", BookRout);
app.use("/borrowRequests", borrowRoute);

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
