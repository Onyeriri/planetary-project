const { rejects } = require("assert");
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("../models/planets.mongoose");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, rejects) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        rejects(err);
      })
      .on("end", async () => {
        const planetCount = (await getAllPlanets()).length;
        console.log(`${planetCount} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({});
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save planet due to ${error}`);
  }
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
