//Datei-Einstellungen

const express = require("express");
const env = require("dotenv").config();
const router = express.Router();
const path = require("path");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static(path.join(__dirname, "Public")));

//Routen

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/news", (req, res) => {
  res.render("news");
});
router.get("/dev", (req, res) => {
  res.render("dev");
});

//Exports

module.exports = router;
