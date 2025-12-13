// src/routes/auth.routes.js
const express = require("express");
const { registerUser } = require("../controllers/auth.controller");

const router = express.Router();

// Registration route
router.post("/register", registerUser);

module.exports = router;
