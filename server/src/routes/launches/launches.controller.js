const {
  getAllLaunches,
  addNewLaunch,
  existWithLaunchId,
  abortLaunchWithId,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
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

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  // if launch id does not exists
  if (!existWithLaunchId(launchId)) {
    return res.status(404).json({
      error: "Mission doesn't exist",
    });
  }

  // if launch exist
  const aborted = abortLaunchWithId(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
