const express = require("express");
const router = express.Router();
const categories = require("../data/categories.json");

// GET all categories
router.get("/", (req, res) => {
  const lang = req.query.lang || "en"; // pass lang in query ?lang=ar or ?lang=en

  const result = categories.map((c) => ({
    id: c.id,
    name: c.name[lang] || c.name.en,
    icon: c.icon,
  }));

  res.json(result);
});

// GET category by id
router.get("/:id", (req, res) => {
  const lang = req.query.lang || "en";
  const id = parseInt(req.params.id, 10);

  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({
    id: category.id,
    name: category.name[lang] || category.name.en,
    icon: category.icon,
  });
});

module.exports = router;
