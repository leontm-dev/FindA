// Datei-Einstellungen

const express = require("express");
const dotJson = require("dot-json");
const env = require("dotenv").config();
const router = express.Router();
const fetch = require("@replit/node-fetch");

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

router.get("/password/:pass", (req, res) => {
  if (process.env["FINDA_KEY"] === req.params.pass) {
    res.status(200).json(Success);
  } else {
    res.status(401).json(Unauthorized);
  }
});

// Exports

module.exports = router;
