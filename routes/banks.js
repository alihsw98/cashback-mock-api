const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: req.lang === "ar" ? "مصرف الرافدين" : "Rafidain Bank" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: 1, name: req.lang === "ar" ? "مصرف الرافدين" : "Rafidain Bank" });
});

module.exports = router;
