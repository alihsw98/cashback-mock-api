const express = require("express");
const router = express.Router();

// Mock login/register
router.post("/register/verify-phone", (req, res) => {
  res.json({ success: true, message: "Phone verified" });
});

router.post("/register/verify-otp", (req, res) => {
  res.json({ success: true, message: "OTP verified" });
});

router.post("/register/complete", (req, res) => {
  res.status(201).json({
    accessToken: "mock-access",
    refreshToken: "mock-refresh",
    user: { id: 1, name: "Ahmed" },
  });
});

router.post("/login", (req, res) => {
  res.status(201).json({
    accessToken: "mock-access",
    refreshToken: "mock-refresh",
    user: { id: 1, phone: "+9647501234567", userType: "user" },
  });
});

router.post("/refresh", (req, res) => {
  res.json({ accessToken: "mock-access-2", refreshToken: "mock-refresh-2" });
});

router.get("/profile", (req, res) => {
  res.json({ id: 1, firstName: "Ahmed", lastName: "Mohammed" });
});

router.post("/logout", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
