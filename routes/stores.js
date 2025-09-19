const express = require("express");
const router = express.Router();
const stores = require("../data/stores.json");

// GET all stores with pagination + search
// GET all stores with pagination + search + category filter
router.get("/", (req, res) => {
  let { page = 1, limit = 10, categoryId } = req.query;
  const lang = req.query.lang || "en";
  const search = req.query.search ? String(req.query.search).toLowerCase() : "";

  page = Number(page);
  limit = Number(limit);

  // filter by search across en + ar
  let filtered = stores.filter((s) => {
    const nameEn = s.storeName.en.toLowerCase();
    const nameAr = s.storeName.ar.toLowerCase();
    const descEn = s.description.en.toLowerCase();
    const descAr = s.description.ar.toLowerCase();

    const matchesSearch =
      !search ||
      nameEn.includes(search) ||
      nameAr.includes(search) ||
      descEn.includes(search) ||
      descAr.includes(search);

    const matchesCategory = categoryId
      ? Number(s.categoryId) === Number(categoryId)
      : true;

    return matchesSearch && matchesCategory;
  });

  // pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  const data = paginated.map((s) => ({
    id: s.id,
    categoryId: s.categoryId,
    name: s.storeName[lang] || s.storeName.en,
    description: s.description[lang] || s.description.en,
    logo: s.storeLogo,
    images: s.storeImages,
    mainBranchAddress: s.mainBranchAddress[lang] || s.mainBranchAddress.en,
    facebook: s.facebook,
    instagram: s.instagram,
    linkedin: s.linkedin,
    youtube: s.youtube,
  }));

  res.json({
    page,
    limit,
    total: filtered.length,
    stores: data,
  });
});


// GET single store by ID
router.get("/:id", (req, res) => {
  const lang = req.query.lang || "en";
  const store = stores.find((s) => s.id === Number(req.params.id));
  if (!store) return res.status(404).json({ error: "Not found" });

  res.json({
    id: store.id,
    categoryId: store.categoryId, // ✅ include category
    name: store.storeName[lang] || store.storeName.en,
    description: store.description[lang] || store.description.en,
    logo: store.storeLogo,
    images: store.storeImages,
    mainBranchAddress: store.mainBranchAddress[lang] || store.mainBranchAddress.en,
    facebook: store.facebook,
    instagram: store.instagram,
    linkedin: store.linkedin,
    youtube: store.youtube,
  });
});

module.exports = router;
