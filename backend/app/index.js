require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 3001);

const qpayRoute = require("./api/qpay");
const accountsRoute = require("./api/accounts");
const newsRoute = require("./api/news");
const newPartRoute = require("./api/newPart");
const academyRoute = require("./api/academy");
const publicityRoute = require("./api/publicity");
const introBannerRoute = require("./api/introBanner");

const packagesRoute = require("./api/packages");
const partnerRoute = require("./api/partner");
const partnerCrossRoadRoute = require("./api/partnerCrossRoad");
const partnerRateRoute = require("./api/partnerRate");
const transportRoute = require("./api/transport");
const invoiceRoute = require("./api/invoice");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
// Uploaded / public files only (not the old CRA build — frontend is Next on PORT 3000).
app.use("/static", express.static(path.join(__dirname, "../assets")));

app.get("/", (req, res) => {
  res.type("json").send({
    ok: true,
    service: "ardiin-achaa-backend",
    hint: "REST API is under /backend/* (e.g. /backend/accounts).",
  });
});

app.use("/backend/pay", qpayRoute);
app.use("/backend/accounts", accountsRoute);
app.use("/backend/news", newsRoute);
app.use("/backend/newPart", newPartRoute);
app.use("/backend/academy", academyRoute);
app.use("/backend/publicity", publicityRoute);
app.use("/backend/introBanner", introBannerRoute);

app.use("/backend/packages", packagesRoute);
app.use("/backend/partner", partnerRoute);
app.use("/backend/partnerCrossRoad", partnerCrossRoadRoute);
app.use("/backend/partnerRate", partnerRateRoute);
app.use("/backend/transport", transportRoute);
app.use("/backend/invoice", invoiceRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
