const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const langMiddleware = require("./middleware/language");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(langMiddleware);

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/stores", require("./routes/stores"));
app.use("/offers", require("./routes/offers"));
app.use("/transactions", require("./routes/transactions"));
app.use("/merchant", require("./routes/merchants"));
app.use("/location", require("./routes/location"));
app.use("/banks", require("./routes/banks"));
app.use("/categories", require("./routes/categories"));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Mock API running at http://localhost:${PORT}`));
