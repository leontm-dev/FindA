//Permanete Variablen

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");

//App Einstellungen

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "https://official.finda-app.repl.co/*",
    allowedHeaders: ["finda_key"],
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));
app.listen(2000, () => {
  console.log("2000");
});

// Router

const PAGES = require(path.join(__dirname, "Routen/Seiten/pages"));
app.use("/", PAGES);

// API

const NEWS = require(path.join(__dirname, "Routen/API/news.js"));
app.use("/api/news", NEWS);
const DEV = require(path.join(__dirname, "Routen/API/dev.js"));
app.use("/api/dev", DEV);
