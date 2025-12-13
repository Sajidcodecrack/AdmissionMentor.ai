// src/controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// POST /api/v1/auth/register
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // 2. Only allow Gmail (original Gmail address)
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    throw new ApiError(400, "Only Gmail addresses are allowed");
  }

  // 3. Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "User already registered with this email");
  }

  // 4. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 5. Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  // 6. Prepare safe user data
  const userData = {
    _id: user._id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully"));
});

module.exports = {
  registerUser,
};
