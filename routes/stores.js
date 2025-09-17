const express = require("express");
const router = express.Router();
const stores = require("../data/stores.json");

// GET /stores?page=1&limit=10&lang=en
router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const lang = req.lang;

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const data = stores.map((s) => ({
    id: s.id,
    name: lang === "ar" ? s.name.ar : s.name.en,
    description: lang === "ar" ? s.description.ar : s.description.en,
    approved: s.approved,
  }));

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: data.length,
    stores: data.slice(start, end),
  });
});

router.get("/:id", (req, res) => {
  const store = stores.find((s) => s.id === Number(req.params.id));
  if (!store) return res.status(404).json({ error: "Not found" });

  res.json({
    id: store.id,
    name: req.lang === "ar" ? store.name.ar : store.name.en,
    description: req.lang === "ar" ? store.description.ar : store.description.en,
  });
});

module.exports = router;
