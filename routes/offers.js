const express = require("express");
const router = express.Router();
const offers = require("../data/offers.json");

// GET all offers with pagination + search
router.get("/", (req, res) => {
  let { page = 1, limit = 10, search = "" } = req.query;
  const lang = req.query.lang || "en";

  page = Number(page);
  limit = Number(limit);

  // filter by search
  let filtered = offers.filter((o) => {
    const title = o.title[lang] || o.title.en;
    const desc = o.description[lang] || o.description.en;
    const storeName = o.store.storeName[lang] || o.store.storeName.en;
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      storeName.toLowerCase().includes(search.toLowerCase())
    );
  });

  // pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  const data = paginated.map((o) => ({
    id: o.id,
    title: o.title[lang] || o.title.en,
    description: o.description[lang] || o.description.en,
    cashbackPercentage: o.cashbackPercentage,
    endDate: o.endDate,
    isActive: o.isActive,
    store: {
      id: o.store.id,
      name: o.store.storeName[lang] || o.store.storeName.en,
      logo: o.store.storeLogo
    }
  }));

  res.json({
    page,
    limit,
    total: filtered.length,
    offers: data
  });
});

// GET single offer by ID
router.get("/:id", (req, res) => {
  const lang = req.query.lang || "en";
  const offer = offers.find((o) => o.id === Number(req.params.id));
  if (!offer) return res.status(404).json({ error: "Not found" });

  res.json({
    id: offer.id,
    title: offer.title[lang] || offer.title.en,
    description: offer.description[lang] || offer.description.en,
    cashbackPercentage: offer.cashbackPercentage,
    endDate: offer.endDate,
    isActive: offer.isActive,
    store: {
      id: offer.store.id,
      name: offer.store.storeName[lang] || offer.store.storeName.en,
      logo: offer.store.storeLogo
    }
  });
});

module.exports = router;
