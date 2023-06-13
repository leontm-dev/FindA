// Datei-Einstellungen

const express = require("express");
const dotJson = require("dot-json");
const env = require("dotenv").config();
const router = express.Router();
const fetch = require("@replit/node-fetch");
const Utils = require("ltm-utilities");

// Datenbank

const NEWS = new dotJson("Daten/news.json");

// Res

const Unauthorized = {
  message: "Unauthorized",
  code: 401,
};
const Success = {
  message: "Success",
  code: 200,
};

// Routen

router.get("/current", (req, res) => {
  if (req.headers["finda_key"] === process.env["FINDA_KEY"]) {
    res.status(200).json(NEWS.get("NEWS"));
  } else {
    res.status(401).json(Unauthorized);
  }
});
router.post("/new/:content", (req, res) => {
  if (req.headers["finda_key"] === process.env["FINDA_KEY"]) {
    let news = JSON.parse(req.params.content);
    let id = new Utils("de-DE").generateId(true, false, false, 10);
    news.id = id;
    NEWS.set(`NEWS.${id}`, news);
    NEWS.save();
    res.status(200).json(Success);
  } else {
    res.status(401).json(Unauthorized);
  }
});
router.post("/edit/:id/:content", (req, res) => {
  if (req.headers["finda_key"] === process.env["FINDA_KEY"]) {
    if (NEWS.get(`NEWS.${req.params.id}`) != null) {
      NEWS.set(`NEWS.${req.params.id}`, JSON.parse(req.params.content));
      NEWS.save();
      res.status(200);
    } else {
      res.status(404);
    }
  }
});
router.delete("/delete/:id", (req, res) => {
  NEWS.delete(`NEWS.${req.params.id}`);
});
// Exports

module.exports = router;
