const launches = new Map();

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

launches.set(launch.flightNumber, launch);

function existWithLaunchId(launch) {
  return launches.has(launch);
}

function getAllLaunches() {
  return Array.from(launches.values());
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
