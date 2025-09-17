const express = require("express");
const router = express.Router();
const transactions = require("../data/transactions.json");

router.get("/", (req, res) => {
  res.json(transactions);
});

router.get("/:id", (req, res) => {
  const t = transactions.find((x) => x.id === Number(req.params.id));
  if (!t) return res.status(404).json({ error: "Not found" });
  res.json(t);
});

router.post("/", (req, res) => {
  res.status(201).json({ id: 99, ...req.body, status: "mock-created" });
});

module.exports = router;
