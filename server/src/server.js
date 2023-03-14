const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");
require("dotenv").config({
  path: "C:/Users/ZBook/Desktop/app/planetary-project/.env",
});

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!!!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(process.env.MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}...`);
  });
}

startServer();
