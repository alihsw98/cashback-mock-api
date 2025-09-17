const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.json({ id: 1, firstName: "Ahmed", lastName: "Mohammed" });
});

router.put("/profile", (req, res) => {
  res.json({ success: true, message: "Profile updated" });
});

module.exports = router;
