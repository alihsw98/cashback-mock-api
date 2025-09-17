const express = require("express");
const router = express.Router();

router.get("/top-selling", (req, res) => {
  res.json([{ id: 1, name: "Ali Electronics", sales: 500 }]);
});

router.get("/top-cashback", (req, res) => {
  res.json([{ id: 2, name: "Baghdad Fashion", cashback: 20 }]);
});

router.get("/low-performance", (req, res) => {
  res.json([{ id: 3, name: "XYZ Store", sales: 2 }]);
});

module.exports = router;
