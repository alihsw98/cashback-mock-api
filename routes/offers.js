const express = require("express");
const router = express.Router();
const offers = require("../data/offers.json");

router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const lang = req.lang;

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const data = offers.map((o) => ({
    id: o.id,
    title: lang === "ar" ? o.title.ar : o.title.en,
    description: lang === "ar" ? o.description.ar : o.description.en,
    cashbackPercentage: o.cashbackPercentage,
  }));

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: data.length,
    offers: data.slice(start, end),
  });
});

router.get("/:id", (req, res) => {
  const offer = offers.find((o) => o.id === Number(req.params.id));
  if (!offer) return res.status(404).json({ error: "Not found" });

  res.json({
    id: offer.id,
    title: req.lang === "ar" ? offer.title.ar : offer.title.en,
    description: req.lang === "ar" ? offer.description.ar : offer.description.en,
    cashbackPercentage: offer.cashbackPercentage,
  });
});

module.exports = router;
