// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// API routes
app.use("/api/v1", routes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
