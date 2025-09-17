const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: req.lang === "ar" ? "إلكترونيات" : "Electronics" },
    { id: 2, name: req.lang === "ar" ? "ملابس" : "Clothing" },
  ]);
});

router.get("/:id", (req, res) => {
  res.json({ id: 1, name: req.lang === "ar" ? "إلكترونيات" : "Electronics" });
});

module.exports = router;
