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

const Success = {
  message: "Success",
  code: 200,
};

// Routen

router.get("/current", (req, res) => {
  res.status(200).json(NEWS.get("NEWS"));
});
router.post("/new/:content", (req, res) => {
  let news = JSON.parse(req.params.content);
  let id = new Utils("de-DE").generateId(true, false, false, 10);
  news.id = id;
  NEWS.set(`NEWS.${id}`, news);
  NEWS.save();
  res.status(200).json(Success);
});
router.post("/edit/:id/:content", (req, res) => {
  if (NEWS.get(`NEWS.${req.params.id}`) != null) {
    NEWS.set(`NEWS.${req.params.id}`, JSON.parse(req.params.content));
    NEWS.save();
    res.status(200);
  }
});
router.delete("/delete/:id", (req, res) => {
  NEWS.set(`OLD.${req.params.id}`, NEWS.get(`NEWS.${req.params.id}`));
  NEWS.delete(`NEWS.${req.params.id}`);
});
// Exports

module.exports = router;
