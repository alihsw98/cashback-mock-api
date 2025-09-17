const express = require("express");
const router = express.Router();

router.get("/governorates", (req, res) => {
  res.json([{ id: 1, name: req.lang === "ar" ? "بغداد" : "Baghdad" }]);
});

router.get("/governorates/:id/regions", (req, res) => {
  res.json([{ id: 1, name: req.lang === "ar" ? "الرصافة" : "Rusafa" }]);
});

router.get("/interests", (req, res) => {
  res.json([{ id: 1, name: req.lang === "ar" ? "إلكترونيات" : "Electronics" }]);
});

module.exports = router;
