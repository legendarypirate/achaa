require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const express = require("express");
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { URL } = require("./url");

const app = express();
const PORT = Number(process.env.PORT || 3001);
const HTTPS_PORT = Number(process.env.HTTPS_PORT || 5443);
const IS_DEV = process.env.NODE_ENV === "development";

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

app.use(function (request, response, next) {
  const host = request.headers.host || "";
  const isLocalHost =
    host.startsWith("localhost:") ||
    host.startsWith("127.0.0.1:") ||
    host.startsWith("0.0.0.0:");

  if (!IS_DEV && !isLocalHost && !request.secure) {
    return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.use("/static", express.static(path.join(__dirname, "../assets")));

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

/*~~~ Бүх route-ын доор бх ёстой ~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});

if (!IS_DEV) {
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, "../ssl/privkey.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem")),
    ca: fs.readFileSync(path.join(__dirname, "../ssl/chain.pem")),
  };

  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`LISTENING ON PORT ${HTTPS_PORT}`);
  });
}
