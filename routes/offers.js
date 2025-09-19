const express = require("express");
const router = express.Router();
const offers = require("../data/offers.json");

// GET all offers with pagination + search + category filter
router.get("/", (req, res) => {
  let { page = 1, limit = 10, categoryId } = req.query;
  const lang = req.query.lang || "en";
  const search = req.query.search ? String(req.query.search).toLowerCase() : "";

  page = Number(page);
  limit = Number(limit);

  let filtered = offers.filter((o) => {
    const titleEn = o.title.en.toLowerCase();
    const titleAr = o.title.ar.toLowerCase();
    const descEn = o.description.en.toLowerCase();
    const descAr = o.description.ar.toLowerCase();
    const storeNameEn = o.store.storeName.en.toLowerCase();
    const storeNameAr = o.store.storeName.ar.toLowerCase();

    const matchesSearch =
      !search ||
      titleEn.includes(search) ||
      titleAr.includes(search) ||
      descEn.includes(search) ||
      descAr.includes(search) ||
      storeNameEn.includes(search) ||
      storeNameAr.includes(search);

    const matchesCategory = categoryId
      ? Number(o.categoryId) === Number(categoryId)
      : true;

    return matchesSearch && matchesCategory;
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
    categoryId: o.categoryId,
    store: {
      id: o.store.id,
      name: o.store.storeName[lang] || o.store.storeName.en,
      logo: o.store.storeLogo,
    },
  }));

  res.json({
    page,
    limit,
    total: filtered.length,
    offers: data,
  });
});

// ✅ GET single offer by ID
router.get("/:id", (req, res) => {
  const lang = req.query.lang || "en";
  const offer = offers.find((o) => o.id === Number(req.params.id));

  if (!offer) {
    return res.status(404).json({ error: "Offer not found" });
  }

  res.json({
    id: offer.id,
    title: offer.title[lang] || offer.title.en,
    description: offer.description[lang] || offer.description.en,
    cashbackPercentage: offer.cashbackPercentage,
    endDate: offer.endDate,
    isActive: offer.isActive,
    categoryId: offer.categoryId,
    store: {
      id: offer.store.id,
      name: offer.store.storeName[lang] || offer.store.storeName.en,
      logo: offer.store.storeLogo,
    },
  });
});

module.exports = router;
