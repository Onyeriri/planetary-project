const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer ISI",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

let initialFlightNumber = 100;

function addNewLaunch(launch) {
  initialFlightNumber++;
  launches.set(
    initialFlightNumber,
    Object.assign(launch, {
      initialFlightNumber,
      upcoming: true,
      success: true,
      customer: ["ZTM", "NASA"],
    })
  );
}

module.exports = { getAllLaunches, addNewLaunch };
