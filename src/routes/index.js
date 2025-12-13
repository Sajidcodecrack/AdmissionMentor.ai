// src/routes/index.js
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
// later: router.use("/auth", require("./auth.routes"));

router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "AdmissionMentor.ai backend running" });
});
router.use("/auth", authRoutes);

module.exports = router;
