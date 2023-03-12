const launches = require("./launches.mongo");

// const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer ISI",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

saveLaunch(launch);

function existWithLaunchId(launch) {
  return launches.has(launch);
}

async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

let initialFlightNumber = 100;

function addNewLaunch(launch) {
  let flightNumber = initialFlightNumber++;
  launches.set(
    flightNumber,
    Object.assign(launch, {
      flightNumber,
      upcoming: true,
      success: true,
      customers: ["ZTM", "NASA"],
    })
  );
}

async function saveLaunch(launch) {
  await launches.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

function abortLaunchWithId(launchId) {
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existWithLaunchId,
  abortLaunchWithId,
};
