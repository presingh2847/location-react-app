const express = require("express");
const cors = require("cors");
const app = express();
const Reader = require("@maxmind/geoip2-node").Reader;
app.use(cors());
app.get("/geoData", (req, res) => {
  try {
    const userIp = req.query.ip;
    if (userIp) {
      Reader.open("database/GeoLite2-City.mmdb").then((reader) => {
        try {
          const cityData = reader.city(userIp);
          if (cityData) {
            res.json(cityData);
          }
        } catch (e) {
          console.log("in catch");
          res.status(404).json({ error: "Address not found" });
        }
      });
    } else {
      res.status(400).json({ error: "no input provided" });
    }
  } catch (e) {
    console.log("in catch");
    next(e);
    res.status(500).json({ error: "Address not found" });
  }
});
app.listen("3001", () => {});
