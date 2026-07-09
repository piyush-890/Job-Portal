import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import connectDB from "./utils/db.js";

// Routes
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";

// Load environment variables
dotenv.config();

// Optional: Change DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// ==================== Middleware ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ==================== Routes ====================
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Portal Backend is Running ",
  });
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();