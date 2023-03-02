const express = require("express");
const { httpGetAllPlanets } = require("./planet.controller");

const planetRouter = express.Router();

planetRouter.get("/planets", httpGetAllPlanets);

module.exports = planetRouter;
