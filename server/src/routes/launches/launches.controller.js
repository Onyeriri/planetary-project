const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      Error: "Missing a required launch field",
    });
  }

  // if (isNaN(launch.launchDate)) {
  //   return res.status(400).json({
  //     Error: "Please enter a valid launch date",
  //   });
  // }

  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
