const express = require("express");
const path = require("path");
const morgan = require("morgan");
const planetRouter = require("./routes/planets/planet.router");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public ")));
app.use(planetRouter);

// console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public ", "index.html"));
});

module.exports = app;
