const express = require("express");
const path = require("path");
const morgan = require("morgan");
const planetRouter = require("./routes/planets/planet.router");
const cors = require("cors");
const launchesRouter = require("./routes/launches/launches.router");

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
app.use(launchesRouter);

// console.log(__dirname);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public ", "index.html"));
});

module.exports = app;
