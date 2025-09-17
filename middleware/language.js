module.exports = (req, res, next) => {
  const lang = req.query.lang || "en"; // default to English
  req.lang = lang.toLowerCase();
  next();
};